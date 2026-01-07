import { Hourglass } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import HeadingSmall from "./heading-small";
import { useWizard } from "./context-provider/wizard";
import { useEffect } from "react";

export default function VerificatingCard() {
    const { setCanPrev } = useWizard()
    useEffect(() => {
        setCanPrev(false)
    }, []);
    return (
        <div className="flex justify-center">
            <Card className="max-w-md">
                <CardContent>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Hourglass />
                        </div>
                        <HeadingSmall className="text-center" title="Pendaftaran dalam proses verifikasi" description="Silakan tunggu maksimal 1x24 jam. Kami akan mengirimkan notifikasi melalui email setelah verifikasi selesai." />

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}