import HeadingSmall from "@/components/heading-small";
import PresenceAlert from "@/components/presence-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import presence, { undo } from "@/routes/presence";
import { Participant, SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import axios, { AxiosError } from "axios";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    participant: Participant
}

export default function ConfirmatingPresence({ participant }: Props) {
    const { url } = usePage<SharedData>()

    const [isUnDone, setIsUnDone] = useState(false);
    const [isUndoing, setIsUndoing] = useState(false);

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
        <AppLayout breadcrumbs={[{
            href: url,
            title: 'Konfirmasi Kehadiran'
        }]}>
            <div className="flex justify-center">
                <Card className="max-w-md">
                    <CardContent>
                        <PresenceAlert {...{ isUndoing, isUnDone, participant, undoPresence }} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}