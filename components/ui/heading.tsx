import { Separator } from "./separator"


interface HeadingProps {
    title: string,
    description: string,
}

const Heading = ({
    title,
    description,
}: HeadingProps) => {
    return (
        <>
            <div>
                <h2 className="text-3xl font-bold tracking-tight">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground ml-1 mb-1">
                    {description}
                </p>
                <Separator />
            </div>

        </>
    )
}

export default Heading