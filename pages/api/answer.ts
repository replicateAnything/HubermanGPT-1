import { OpenAIStream } from "@/utils";
export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt, apiKey } = (await req.json()) as {
      prompt: string;
      apiKey: string;
    };
    const apiKe =  process.env.NEXT_PUBLIC_OPENAI_API_KEY!;

    console.log("API KEY",apiKe)
    // @ts-ignore
    const stream = await OpenAIStream(prompt, apiKe);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
