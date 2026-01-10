import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import { toDataURL } from "qrcode";

type Props = {
    setQr: Dispatch<SetStateAction<string | undefined>>
    qr: string | undefined
    qrOwner: string
}

export default function QRDialog({ qr, setQr, qrOwner }: Props) {
    const [url, setUrl] = useState('');
    useEffect(() => {
        toDataURL([window.location.origin, 'presence', qr].join('/')).then(dataURL => {
            setUrl(dataURL)
        })
    }, [qr]);
    return (
        <Dialog open={typeof qr === 'string'} onOpenChange={() => setQr(undefined)}>
            <DialogContent>
                <DialogTitle>QR</DialogTitle>
                <div className="aspect-square rounded-md border">
                    <img src={url} className="w-full" alt={qr} />
                </div>
                <DialogFooter>
                    <Button asChild>
                        <a href={url} target="_blank" download={qrOwner}>Unduh</a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}