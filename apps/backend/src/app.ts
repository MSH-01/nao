import Fastify from 'fastify';
import dotenv from 'dotenv';
import { openai } from '@ai-sdk/openai';
import { streamText, tool, UIMessage, convertToModelMessages } from 'ai';
import { z } from 'zod';

dotenv.config();

const app = Fastify({ logger: true });

app.get('/api', async (request, reply) => {
	return { hello: 'world' };
});

app.post('/api/chat', async (request, reply) => {
	const { messages } = request.body as { messages: UIMessage[] };

	const result = streamText({
		model: openai.chat('gpt-4o'),
		messages: await convertToModelMessages(messages),
		tools: {
			getWeather: tool({
				description: 'Get the current weather for a specified city. Use this when the user asks about weather.',
				inputSchema: z.object({
					city: z.string().describe('The city to get the weather for'),
				}),
			}),
		},
	});

	const response = result.toUIMessageStreamResponse();
	return response;
});

export default app;
