import { Participant } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "./ui/dialog";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { confirm, undo } from "@/routes/presence";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import PresenceAlert from "./presence-alert";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";
import { Spinner } from "./ui/spinner";

type Props = {
    token?: string
    onClose: () => void
}

export default function ConfirmPresenceDialog({ token, onClose }: Props) {
    const [isUnDone, setIsUnDone] = useState(false);
    const [isUndoing, setIsUndoing] = useState(false);
    const [participant, setParticipant] = useState<Participant>();
    useEffect(() => {
        if (token) {
            axios.get(confirm(token).url).then(({ data: res }) => {
                setParticipant(res.data.participant)
            })
        }
    }, [token]);

    const undoPresence = async (id: number) => {
        setIsUndoing(true)
        try {
            const { data: res } = await axios.delete(undo(id).url)
            setIsUnDone(true)
            toast.success(res.message)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error('Gagal membatalkan kehadiran', {
                    description: error.response?.data.message
                })
            }
        } finally {
            setIsUndoing(false)
        }

    }

    return (
        <Dialog open={token !== undefined}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Konfirmasi Kehadiran</DialogTitle>
                    {participant ? (
                        <PresenceAlert {...{ isUndoing, isUnDone, participant, undoPresence, onDone: onClose }} />
                    ) : (
                        <Card>
                            <CardContent>
                                <div className="flex flex-col justify-center gap-4">
                                    <Spinner />
                                    <p>Memuat data peserta...</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}