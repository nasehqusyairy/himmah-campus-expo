import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";
import presence from "@/routes/presence";
import { Participant } from "@/types";

type Props = {
    isUnDone: boolean
    isUndoing: boolean
    participant: Participant
    undoPresence: (id: number) => Promise<void>
    onDone?: () => void
}

export default function PresenceAlert({ isUndoing, isUnDone, participant, undoPresence, onDone }: Props) {
    return (
        <div className="flex flex-col justify-center items-center gap-6">
            <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Check />
            </div>

            <div className="text-center">
                <h1 className="text-base font-medium">
                    Kehadiran {isUnDone ? "Dibatalkan" : "Dikonfirmasi"}
                </h1>
                <p className="text-sm text-muted-foreground">
                    <span className="underline font-bold">{participant.name}</span> dari <span className="underline font-bold">{participant.invoice?.agency?.name}</span> dinyatakan {isUnDone ? "belum hadir" : "hadir"}
                </p>
            </div>
            <div className="grid gap-2 w-full">
                {!isUnDone && (
                    <Button variant={"destructive"} onClick={() => undoPresence(participant.id)} disabled={isUndoing}>
                        {isUndoing ? "Membatalkan..." : "Batalkan"}
                    </Button>
                )}
                {onDone !== undefined ? (
                    <Button onClick={onDone} disabled={isUndoing}>
                        Selesai
                    </Button>
                ) : (
                    <Button asChild disabled={isUndoing}>
                        <Link href={presence.index().url}>
                            Selesai
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}