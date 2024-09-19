import "dotenv/config";

import Fastify from "fastify";
import { GoogleGenerativeAI } from "@google/generative-ai";

const fastify = Fastify({
  logger: true,
});
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

fastify.post("/prompt", async function handler(request) {
  const body = request.body;
  const prompt = body.prompt;

  const result = await model.generateContent(prompt);

  return { response: result.response.text() };
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
