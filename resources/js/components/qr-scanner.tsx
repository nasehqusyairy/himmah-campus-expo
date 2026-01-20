import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ConfirmPresenceDialog from "./confirm-presence-dialog";
import { extractToken } from "@/lib/utils";

export default function QrScanner() {
    // State untuk menyimpan isi input
    const [token, setToken] = useState<string>();
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
        // Inisialisasi engine
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        // Fungsi untuk menjalankan kamera
        const startCamera = async () => {
            try {
                await html5QrCode.start(
                    { facingMode: "environment" }, // Kamera belakang
                    {
                        fps: 15,
                        qrbox: { width: 250, height: 250 },
                        // Tambahkan resolusi ideal agar gambar lebih tajam di laptop
                        videoConstraints: {
                            width: { min: 640, ideal: 1280 },
                            height: { min: 480, ideal: 720 },
                        },
                        aspectRatio: 1
                    },
                    (decodedText) => {
                        setToken(extractToken(decodedText));
                        console.log('ok');

                    },
                    (errorMessage) => {

                    }
                );
            } catch (err) {
                if (err instanceof Error) {
                    toast.error("Gagal akses kamera:", {
                        description: err.message
                    });
                }
                console.error(err);

            }
        };

        startCamera();

        // Cleanup saat unmount
        return () => {
            if (scannerRef.current?.isScanning) {
                scannerRef.current.stop().then(() => {
                    scannerRef.current?.clear();
                });
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4">

            {/* Box Kamera */}
            <div className="w-full max-w-80 aspect-square overflow-hidden border rounded-md" id="reader" />
            <ConfirmPresenceDialog token={token} />
        </div>
    );
}