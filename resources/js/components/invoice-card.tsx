import { Dispatch, SetStateAction, useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { File, Info, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { toRupiah } from "@/lib/utils"
import { Invoice } from "@/types"
import { confirmPay, pay } from "@/routes/registration"
import { paymentFile } from "@/routes"
import { useWizard } from "./context-provider/wizard"
import { toast } from "sonner"

type Props = {
    price: number
    account: {
        bank: string
        number: string
        name: string
    }
    quantity: number
    invoice: Invoice
    setInvoice: Dispatch<SetStateAction<Invoice>>
}

export function InvoiceCard({
    account,
    price,
    quantity,
    invoice,
    setInvoice,
}: Props) {
    const [uploading, setUploading] = useState(false)
    const { setOnNext } = useWizard()

    useEffect(() => {
        setOnNext(() => async () => {
            await axios.post(confirmPay().url)
        })
    }, [invoice.payment_file]);

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)

        const formData = new FormData()
        formData.append("file", file)

        try {
            const { data: res } = await axios.post(
                pay().url,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            toast.success('Bukti pembayaran berhasil diunggah')

            // asumsi backend mengembalikan file_url
            setInvoice(prev => ({
                ...prev,
                ...res.data.invoice,
            }))
        } catch (err: any) {
            if (err instanceof AxiosError) {
                toast.error("Gagal mengunggah bukti pembayaran", {
                    description: err.response?.data.message
                })
            } else {
                toast.error("Gagal mengunggah bukti pembayaran")
            }
        } finally {
            setUploading(false)
            e.target.value = "" // reset input
        }
    }

    return (
        <div className="grid gap-2">
            <Alert className="mb-2">
                <Info />
                <AlertTitle>Info Pembayaran</AlertTitle>
                <AlertDescription>
                    Bank {account.bank}, {account.number} a/n {account.name}
                </AlertDescription>
            </Alert>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="font-medium">Harga Tiket</span>
                    <span>{toRupiah(price)}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                    <span>Jumlah</span>
                    <span>{quantity} orang</span>
                </div>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{toRupiah(price * quantity)}</span>
            </div>

            <Separator />

            {/* Upload */}
            <form onSubmit={(evt) => evt.preventDefault()} className="space-y-3">
                <Label htmlFor="file">Bukti Pembayaran:</Label>
                <Input
                    id="file"
                    type="file"
                    accept=".jpg,.jpeg"
                    disabled={uploading}
                    onChange={handleFileChange}
                />
            </form>

            {uploading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="animate-spin" size={16} />
                    Mengunggah bukti pembayaran...
                </div>
            )}

            {invoice.payment_file && !uploading && (
                <div className="flex justify-center">
                    <img src={paymentFile().url + `?path=${invoice.payment_file}`} className="w-full md:w-6/12 lg:4/12 rounded-md" alt="Bukti Pembayaran" />
                </div>
            )}
        </div>
    )
}
