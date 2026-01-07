import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
    value?: string
    onChange: (value: string) => void
}

export default function WaField({ value, onChange }: Props) {
    return (
        <div className="mb-4">
            <Label htmlFor="wa">Nomer WhatsApp</Label>
            <Input type="number" id="wa" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}