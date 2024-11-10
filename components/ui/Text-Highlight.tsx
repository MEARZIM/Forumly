"use client";


interface Props {
    text: string;
}

export const TextHighlighter = ({
    text
}: Props) => {
    return (
        <span className="px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500">
            {text}
        </span>
    )
}

