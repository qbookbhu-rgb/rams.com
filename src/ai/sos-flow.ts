
'use server';

/**
 * @fileOverview An intelligent SOS flow that finds the nearest available ambulances.
 *
 * - intelligentSos - A function that takes a user's location and returns the top 3 nearest and online ambulances.
 * - IntelligentSosInput - The input type for the intelligentSos function.
 * - IntelligentSosOutput - The return type for the intelligentSos function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Ambulance } from '@/lib/types/ambulance';
import { getDistance } from '@/lib/haversine';

const IntelligentSosInputSchema = z.object({
  userLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});
export type IntelligentSosInput = z.infer<typeof IntelligentSosInputSchema>;

const IntelligentSosOutputSchema = z.object({
  ambulances: z.array(z.any()).describe("An array of the top 3 nearest and available ambulance objects."),
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
    })},
    output: { schema: IntelligentSosOutputSchema },
    tools: [getDistanceTool],
    prompt: `You are an emergency response dispatcher. Your task is to find the nearest available ambulances for a user in distress.

    You will be given the user's current location and a list of all ambulances.
    
    Follow these steps:
    1. Filter the list to include ONLY ambulances that are currently online (status is true).
    2. For each online ambulance, use the getDistance tool to calculate the distance from the user's location to the ambulance's location.
    3. Sort the online ambulances by distance, from nearest to farthest.
    4. Return the top 3 nearest online ambulances.
    
    User Location: Latitude: {{{userLocation.latitude}}}, Longitude: {{{userLocation.longitude}}}
    
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
  async ({ userLocation }) => {
    // 1. Fetch all ambulances from Firestore
    const querySnapshot = await getDocs(collection(db, "ambulances"));
    const allAmbulances = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Ambulance[];

    // 2. Call the prompt with the user's location and the list of ambulances
    const { output } = await prompt({
        userLocation,
        allAmbulances
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
