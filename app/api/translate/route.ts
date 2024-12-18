import { z } from "zod";
import { NextResponse } from "next/server";
import translate from "translate";

// Define a schema to validate the request body
const translatePostSchema = z.object({
    language: z.string(),
    content: z.any(),
});
interface Block {
    id: string;
    type: "header" | "list" | "paragraph" | "image";
    data: HeaderData | ListData | ParagraphData | ImageData;
}

interface HeaderData {
    text: string;
}

interface ListData {
    style: "unordered" | "ordered";
    items: string[];
}

interface ParagraphData {
    text: string;
}

interface ImageData {
    url: string;
    alt: string;
}

interface Props {
    content: any;
}
export async function POST(req: Request) {
    try {

        const body = await req.json();
        const {
            language,
            content,
        } = translatePostSchema.parse(body);

        let contentText = "";

        content.blocks.forEach((block: any) => {
            if (block.type === "header") {
                contentText += (block.data as HeaderData).text + ". ";
            } else if (block.type === "list") {
                (block.data as ListData).items.forEach((item) => {
                    contentText += item + ". ";
                });
            } else if (block.type === "paragraph") {
                const text = (block.data as ParagraphData).text;
                if (!text.includes("<code>") && !text.includes("<img>")) {
                    contentText += text + ". ";
                }
            }
        });
        const cleanText = contentText.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

        const translated_str = await translate(cleanText, { to: language });

        return NextResponse.json(translated_str, { status: 200 });

    } catch (error) {

        return new NextResponse(
            "Failed to save/unsave post. Please try again later...",
            { status: 500 }
        );
    }
}
