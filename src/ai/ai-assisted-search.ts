
'use server';

/**
 * @fileOverview Provides AI-assisted search for medical specialists based on user input.
 *
 * - aiSearchForSpecialists - A function that takes a search query and returns a list of relevant medical specialists along with a conversational response.
 * - AISearchForSpecialistsInput - The input type for the aiSearchForSpecialists function.
 * - AISearchForSpecialistsOutput - The return type for the aiSearchForSpecialists function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISearchForSpecialistsInputSchema = z.object({
  query: z.string().describe('The user query to search for specialists.'),
});

export type AISearchForSpecialisInput = z.infer<
  typeof AISearchForSpecialistsInputSchema
>;

const AISearchForSpecialistsOutputSchema = z.object({
  specialists: z
    .array(z.string())
    .describe('A list of relevant medical specialists.'),
  response: z.string().describe("A conversational response explaining the suggestions.")
});

export type AISearchForSpecialistsOutput = z.infer<
  typeof AISearchForSpecialistsOutputSchema
>;

export async function aiSearchForSpecialists(
  input: AISearchForSpecialisInput
): Promise<AISearchForSpecialistsOutput> {
  return aiSearchForSpecialistsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSearchForSpecialistsPrompt',
  input: {schema: AISearchForSpecialistsInputSchema},
  output: {schema: AISearchForSpecialistsOutputSchema},
  prompt: `You are Anand, a friendly and helpful AI medical search assistant for RAMS.com. The user will provide a query describing symptoms or conditions.

Your tasks are:
1.  Identify a list of the most relevant medical specialists best suited to treat the patient. The list should be as specific as possible.
2.  Generate a warm, conversational, and reassuring response to the user. In this response, explain why you are suggesting these particular specialists based on the symptoms provided. Do not just list them; explain the reasoning. For example, "For symptoms like chest pain, a Cardiologist is the right specialist to consult as they deal with heart-related issues."

Query: {{{query}}}`,
});

const aiSearchForSpecialistsFlow = ai.defineFlow(
  {
    name: 'aiSearchForSpecialistsFlow',
    inputSchema: AISearchForSpecialistsInputSchema,
    outputSchema: AISearchForSpecialistsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
