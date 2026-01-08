import { Check } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import HeadingSmall from "./heading-small";
import participants from "@/routes/participants";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

export default function VerifiedCard() {
    return (
        <>
            <div className="flex justify-center">
                <Card className="max-w-md">
                    <CardContent>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Check />
                            </div>
                            <HeadingSmall className="text-center" title="Pendaftaran Sukses" description="Pergi ke Daftar Peserta untuk mendapatkan kode QR. Kode QR diperlukan untuk melakukan presensi saat memasuki acara" />
                            <Button asChild>
                                <Link href={participants.index().url}>
                                    Daftar Peserta
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}