import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "./ui/label"

type Props = {
    value?: number
    options?: {
        name: string
        id: number
    }[]
    onChange: (value: number) => void
}

export default function LevelSelect({ value, options = [], onChange }: Props) {
    return (
        <div className="mb-4">
            <Label htmlFor="level_id">Jenis Instansi</Label>
            <Select value={value?.toString()} onValueChange={(val) => onChange(Number(val))}>
                <SelectTrigger id="level_id" className="hover:bg-accent hover:text-accent-foreground!">
                    <SelectValue placeholder="Pilih jenis instansi..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map(opt => (
                            <SelectItem key={opt.id} value={opt.id.toString()}>{opt.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
