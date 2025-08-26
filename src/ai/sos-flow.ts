
'use server';

/**
 * @fileOverview An intelligent SOS flow that finds the nearest available ambulances, with optional emergency classification.
 *
 * - intelligentSos - A function that takes a user's location and an optional emergency description to return the top 3 nearest and most appropriate online ambulances.
 * - IntelligentSosInput - The input type for the intelligentSos function.
 * - IntelligentSosOutput - The return type for the intelligentSos function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Ambulance } from '@/lib/types/ambulance';
import { getDistance } from '@/lib/haversine';

const IntelligentSosInputSchema = z.object({
  userLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  emergencyDescription: z.string().optional().describe("An optional description of the medical emergency, e.g., 'chest pain' or 'road accident'."),
});
export type IntelligentSosInput = z.infer<typeof IntelligentSosInputSchema>;

const IntelligentSosOutputSchema = z.object({
  ambulances: z.array(z.any()).describe("An array of the top 3 nearest and available ambulance objects, prioritized by the emergency type if provided."),
});
export type IntelligentSosOutput = z.infer<typeof IntelligentSosOutputSchema>;


const getDistanceTool = ai.defineTool(
    {
      name: 'getDistance',
      description: 'Calculates the distance in kilometers between two geographical points (latitude and longitude).',
      inputSchema: z.object({
        point1: z.object({ latitude: z.number(), longitude: z.number() }),
        point2: z.object({ latitude: z.number(), longitude: z.number() }),
      }),
      outputSchema: z.number(),
    },
    async ({ point1, point2 }) => {
      return getDistance(point1, point2);
    }
);


const prompt = ai.definePrompt({
    name: 'intelligentSosPrompt',
    input: { schema: z.object({
        userLocation: z.object({
            latitude: z.number(),
            longitude: z.number(),
        }),
        allAmbulances: z.array(z.any()),
        emergencyDescription: z.string().optional(),
    })},
    output: { schema: IntelligentSosOutputSchema },
    tools: [getDistanceTool],
    prompt: `You are an AI-powered emergency response dispatcher for RAMS.com. Your critical task is to find the most suitable and nearest available ambulances for a user in distress.

    You will be given the user's current location, a list of all available ambulances, and an optional description of the emergency.

    Follow these steps meticulously:
    1.  Filter the list to include ONLY ambulances that are currently online (status is true).
    2.  If an 'emergencyDescription' is provided (e.g., 'severe chest pain', 'accident with bleeding'), analyze it to determine the required type of ambulance. Prioritize vehicle types like 'Cardiac', 'ICU Ambulance', or 'Advanced Life Support' for serious conditions. If no description is given or it's vague, treat all ambulance types as a lower priority factor.
    3.  For each online ambulance, use the getDistance tool to calculate its distance from the user's location.
    4.  Sort the ambulances based on two factors: first by suitability (if a specific type is needed) and then by distance (nearest to farthest).
    5.  Return the top 3 most appropriate and nearest online ambulances.

    User Location: Latitude: {{{userLocation.latitude}}}, Longitude: {{{userLocation.longitude}}}
    Emergency Description: {{#if emergencyDescription}}"{{{emergencyDescription}}}"{{else}}N/A{{/if}}

    List of All Ambulances:
    {{{json allAmbulances}}}
    `,
});


const intelligentSosFlow = ai.defineFlow(
  {
    name: 'intelligentSosFlow',
    inputSchema: IntelligentSosInputSchema,
    outputSchema: IntelligentSosOutputSchema,
  },
  async ({ userLocation, emergencyDescription }) => {
    // 1. Fetch all ambulances from Firestore
    const querySnapshot = await getDocs(collection(db, "ambulances"));
    const allAmbulances = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Ambulance[];

    // 2. Filter for online ambulances before sending to AI, to optimize.
    const onlineAmbulances = allAmbulances.filter(a => a.status === true);


    // 3. Call the prompt with the user's location and the list of online ambulances
    const { output } = await prompt({
        userLocation,
        allAmbulances: onlineAmbulances,
        emergencyDescription,
    });

    if (!output) {
      throw new Error('The AI model did not return any output.');
    }
    
    return output;
  }
);


export async function intelligentSos(
    input: IntelligentSosInput
  ): Promise<IntelligentSosOutput> {
    return intelligentSosFlow(input);
}
