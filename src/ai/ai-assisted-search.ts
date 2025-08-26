// 'use server'
'use server';

/**
 * @fileOverview Provides AI-assisted search for medical specialists based on user input.
 *
 * - aiSearchForSpecialists - A function that takes a search query and returns a list of relevant medical specialists.
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
  prompt: `You are a medical search assistant. The user will provide a query describing symptoms or conditions.  Return a list of relevant medical specialists that would be best suited to treat the patient.

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
