import { Plus, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useEffect, useState } from "react"
import { capitalizeWords } from "@/lib/utils"
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item"
import { useWizard } from "./context-provider/wizard"
import axios from "axios"
import { participantNames } from "@/routes/registration"
import { usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

type Props = {
    participants: string[]
    setParticipants: (list: string[]) => void
}
export default function ParticipantIdentity({ participants, setParticipants }: Props) {
    const [name, setName] = useState("");

    const { auth } = usePage<SharedData>().props;

    const { setOnNext } = useWizard()

    const removeParticipant = (name: string) => {
        const filtered = participants.filter(el => el.toLowerCase() !== name.toLowerCase());
        setParticipants(filtered);
    }

    useEffect(() => {
        if (!participants.length) {
            setParticipants([...participants, auth.user.name])
        }
    }, []);

    useEffect(() => {
        console.log(participants);

        const onnextfun = () => {
            return axios.post(participantNames().url, {
                names: participants
            })
        }
        setOnNext((() => onnextfun) as any)
    }, [participants]);

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
                    <Input id="name" name="name" value={name} onChange={(evt) => setName(evt.target.value)} />
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