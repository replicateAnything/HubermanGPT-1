import { OpenAIStream } from "@/utils";
import * as process from "process";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt, apiKey } = (await req.json()) as {
      prompt: string;
      apiKey: string;
    };
    let apiKeyr = process.env.OPENAI_API_KEY as string
    const stream = await OpenAIStream(prompt, apiKeyr);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
