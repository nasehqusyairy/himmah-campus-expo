import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export default function QrScanner() {
    // State untuk menyimpan isi input
    const [qrValue, setQrValue] = useState("");
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {

        // Inisialisasi Scanner
        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: {
                    height: 200,
                    width: 200
                },
                aspectRatio: 1.0
            },
      /* verbose= */ false
        );

        scannerRef.current.render(
            (decodedText) => {
                // Masukkan hasil scan ke state input
                setQrValue(decodedText);
            },
            (error) => {
                // Scan terus berjalan meskipun ada error pembacaan kecil
            }
        );

        // Cleanup saat komponen ditutup
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch((err) => console.error("Error clear scanner", err));
            }
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data yang dikirim:", qrValue);
        alert(`Data terkirim: ${qrValue}`);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">

            {/* Box Kamera */}
            <div className="w-full max-w-80 aspect-square overflow-hidden border rounded-md" id="reader" />

            {/* Form Manual */}
            <form onSubmit={handleSubmit} className="w-full max-w-80">
                <Input
                    id="qr-input"
                    type="text"
                    placeholder="Token presensi..."
                    value={qrValue}
                    onChange={(e) => setQrValue(e.target.value)}
                    className="mb-4"
                />
                <Button type="submit" className="w-full">Kirim </Button>
            </form>
        </div>
    );
}