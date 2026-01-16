import { Plus, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useEffect, useState } from "react"
import { capitalizeWords } from "@/lib/utils"
import { useWizard } from "./context-provider/wizard"
import axios from "axios"
import { participantNames } from "@/routes/registration"
import { usePage } from "@inertiajs/react"
import { Invoice, SharedData } from "@/types"

type Props = {
    invoice?: Invoice
    participants: string[]
    setParticipants: (list: string[]) => void
}
export default function ParticipantIdentity({ participants, setParticipants, invoice }: Props) {
    const { auth } = usePage<SharedData>().props;

    const isAlumnus = invoice?.agency_id === 1

    const [name, setName] = useState(isAlumnus ? auth.user.name : "");

    const { setOnNext, setCurrentStep } = useWizard()

    const removeParticipant = (name: string) => {
        const filtered = participants.filter(el => el.toLowerCase() !== name.toLowerCase());
        setParticipants(filtered);
    }

    useEffect(() => {
        if (!participants.length) {
            setParticipants([auth.user.name])
        }
    }, []);

    useEffect(() => {
        const onnextfun = async () => {
            await axios.post(participantNames().url, { names: participants })
            setCurrentStep((isAlumnus || invoice?.agency?.level?.name.includes('Delegasi')) ? 3 : 2)
        }
        setOnNext((() => onnextfun) as any)
    }, [participants]);

    useEffect(() => {
        if (isAlumnus) {
            setParticipants([name])
        }
    }, [name]);

    if (isAlumnus) {
        return (
            <>
                <form className="mb-4" onSubmit={(evt) => { evt.preventDefault() }}>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" name="name" value={name} onChange={(evt) => setName(evt.target.value.toUpperCase())} />
                </form>
            </>
        )
    }

    return (
        <>
            <form className="mb-4" onSubmit={(evt) => {
                evt.preventDefault()
                if (name && !participants.filter(el => el.toLowerCase() === name.toLowerCase()).length) {
                    setParticipants([...participants, capitalizeWords(name)])
                    setName("")
                }
            }}>
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="flex gap-2">
                    <Input id="name" name="name" value={name} onChange={(evt) => setName(evt.target.value.toUpperCase())} />
                    <div>
                        <Button type="submit" size={"icon"}><Plus /></Button>
                    </div>
                </div>
            </form>

            <div className="">
                {participants.map(el => (
                    <div key={el} className="flex justify-between items-center py-2 border-b">
                        <span>{el}</span>
                        <Button variant={"destructive"} size={"icon"} onClick={() => removeParticipant(el)}><X /></Button>
                    </div>
                ))}
            </div>

        </>
    )
}