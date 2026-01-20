import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";
import ConfirmPresenceDialog from "./confirm-presence-dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { extractToken } from "@/lib/utils";

export default function QrScanner() {
    // State untuk menyimpan isi input
    const [token, setToken] = useState<string>();
    const scannerRef = useRef<Html5Qrcode | null>(null);

    // State untuk daftar kamera
    const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
    const [selectedCameraId, setSelectedCameraId] = useState<string>("");

    // 1. Ambil daftar kamera saat pertama kali mount
    useEffect(() => {
        const initCameras = async () => {
            try {
                const devices = await Html5Qrcode.getCameras();
                console.log(devices);

                if (devices && devices.length > 0) {
                    setCameras(devices.map(d => ({ id: d.id, label: d.label })));
                    // Set kamera default (biasanya indeks 0)
                    setSelectedCameraId(devices[0].id);
                } else {
                    toast.error("Tidak ada kamera yang ditemukan.");
                }
            } catch (err) {
                toast.error("Izin kamera ditolak atau tidak ditemukan.");
            }
        };

        initCameras();
    }, []);

    // 2. Fungsi untuk Start/Restart Kamera
    const startScanning = async (cameraId: string) => {
        // Jika sedang scanning, stop dulu sebelum pindah kamera
        if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop();
        }

        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        try {
            await html5QrCode.start(
                cameraId,
                {
                    fps: 15,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                },
                (decodedText) => {
                    setToken(extractToken(decodedText));
                },
                () => { } // Ignore scan errors
            );
        } catch (err) {
            toast.error("Gagal memulai kamera yang dipilih.");
        }
    };

    // 3. Jalankan kamera saat cameraId terpilih
    useEffect(() => {
        if (selectedCameraId) {
            startScanning(selectedCameraId);
        }

        return () => {
            if (scannerRef.current?.isScanning) {
                scannerRef.current.stop().catch(console.error);
            }
        };
    }, [selectedCameraId]);

    return (
        <div className="flex flex-col items-center justify-center gap-4">

            {/* Box Kamera */}
            <div className="w-full max-w-80 aspect-square overflow-hidden border rounded-md" id="reader" />
            {/* Control: Ganti Kamera */}
            <div className="w-full max-w-[300px] space-y-4">
                <div className="space-y-2 text-left">
                    <Label className="flex items-center gap-2">
                        Pilih Kamera
                    </Label>
                    <Select
                        value={selectedCameraId}
                        onValueChange={(val) => setSelectedCameraId(val)}
                    >
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Pilih kamera..." />
                        </SelectTrigger>
                        <SelectContent>
                            {cameras.map((camera) => (
                                <SelectItem key={camera.id} value={camera.id}>
                                    {camera.label || `Kamera ${cameras.indexOf(camera) + 1}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <ConfirmPresenceDialog token={token} />
            </div>
        </div>
    );
}