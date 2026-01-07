type Props = {
    value: number
    title: string
    active?: boolean
}
export default function WizardIndicator({ active, title, value }: Props) {
    return (
        <div className="flex justify-center items-center gap-2">
            <div className={"size-8 flex justify-center items-center rounded-full " + (active ? "bg-primary text-primary-foreground" : "border")}>
                {value}
            </div>
            <span className="hidden lg:block">{title}</span>
        </div>
    )
}