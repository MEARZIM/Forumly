"use client";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

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

const TextToSpeechButton = ({ content }: Props) => {
    const [textToSpeak, setTextToSpeak] = useState<string>("");
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const utterance = React.useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        // Extract the text content from the JSON, excluding code and images
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

        setTextToSpeak(contentText);
    }, [content]);

    const handleSpeak = () => {
        if (textToSpeak && window.speechSynthesis) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            // Create a new SpeechSynthesisUtterance instance
            utterance.current = new SpeechSynthesisUtterance(textToSpeak);

            // Set event handlers
            utterance.current.onstart = () => {
                setIsSpeaking(true);
                setIsPaused(false);
            };

            utterance.current.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };

            // Speak the content
            window.speechSynthesis.speak(utterance.current);
        }
    };

    const handlePause = () => {
        if (window.speechSynthesis.speaking) {
            if (isPaused) {
                window.speechSynthesis.resume();
            } else {
                window.speechSynthesis.pause();
            }
            setIsPaused(!isPaused);
        }
    };

    return (
        <div>
            {!isSpeaking && (
                <Button variant={"outline"} onClick={handleSpeak}><Volume2 /></Button>
            )}
            {isSpeaking && (
                <Button variant={"outline"} onClick={handlePause} style={{ marginLeft: "10px" }}>
                    {isPaused ? <Play /> : <Pause />}
                </Button>
            )}
        </div>
    );
};

export default TextToSpeechButton;
