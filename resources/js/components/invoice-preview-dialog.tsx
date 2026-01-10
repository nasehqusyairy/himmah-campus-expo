import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { toDataURL } from "qrcode";
import { User } from "@/types";
import { paymentFile } from "@/routes";
import { Table, TableBody, TableCell, TableHead, TableRow } from "./ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import axios, { AxiosError } from "axios";
import { accept, reject } from "@/routes/validating";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

type Props = {
    setUsers: Dispatch<SetStateAction<User[]>>
    users: User[],
    userIndex: number | undefined
    setUserIndex: Dispatch<SetStateAction<number | undefined>>
}

export default function InvoicePreviewDialog({ users, setUsers, userIndex, setUserIndex }: Props) {
    const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
    const [isRejctDialogOpen, setIsRejctDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const user = typeof userIndex === "number" ? users[userIndex] : undefined

    return (
        <Dialog open={userIndex !== undefined} onOpenChange={() => setUserIndex(undefined)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detail</DialogTitle>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-auto">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableHead colSpan={2}>
                                    Identitas Pengguna
                                    : </TableHead>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Nama
                                </TableCell>
                                <TableCell className="flex items-center gap-1">
                                    <span>:</span>
                                    <span className="inline-block w-44 text-wrap">{user?.name}</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    No. Whatsapp
                                </TableCell>
                                <TableCell>: <a target="_blank" className="text-primary underline" href={"https://wa.me/+62" + user?.invoice?.wa}>{user?.invoice?.wa}</a></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Jenis Instansi
                                </TableCell>
                                <TableCell>: {user?.invoice?.agency?.level.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Nama Instansi
                                </TableCell>
                                <TableCell className="flex items-center gap-1">
                                    <span>:</span>
                                    <span className="inline-block w-44 text-wrap">{user?.invoice?.agency?.name}</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead colSpan={2}>Peserta yang Didaftarkan: </TableHead>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <ol className="list-decimal pl-12">
                                        {user?.invoice?.participants.map(el => (
                                            <li className="mb-2" key={el.id}>{el.name}</li>
                                        ))}
                                    </ol>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead colSpan={2}>Bukti Pembayaran: </TableHead>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    {user?.invoice?.payment_file ? (
                                        <img src={paymentFile().url + '?path=' + user?.invoice?.payment_file} alt="" />

                                    ) : (
                                        <div className="border-dashed border rounded-md aspect-video flex justify-center items-center">
                                            <span>Tidak ada bukti pembayaran</span>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                {(!user?.invoice?.verified_at && user?.step?.last === 3) && (
                    <DialogFooter>
                        <AlertDialog open={isRejctDialogOpen} onOpenChange={setIsRejctDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant={'destructive'}>
                                    Tolak
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Tolak Pendaftaran?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogDescription>
                                    Pengguna akan mengulang proses pendaftaran dari awal, tapi data akan tetap disimpan. Aksi ini tidak dapat dikembalikan. Apakah Anda yakin?
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <Button disabled={isLoading} onClick={() => {
                                        setIsLoading(true)
                                        axios.post(reject().url, {
                                            invoice_id: user.invoice?.id
                                        }).then(({ data: res }) => {
                                            toast.success(res.message)
                                            const newUsers = [...users]
                                            newUsers[userIndex!].step!.last = 0
                                            setUsers(newUsers)
                                            setUserIndex(undefined)
                                        }).catch(err => {
                                            let message
                                            if (err instanceof AxiosError) {
                                                message = err.response?.data.message
                                            }
                                            toast.error('Terjadi Kesalahan', {
                                                description: `${message}`
                                            })
                                        }).finally(() => {
                                            setIsLoading(false)
                                            setIsRejctDialogOpen(false)
                                        })
                                    }}>
                                        {isLoading ? (<>
                                            <Spinner /> Mengonfirmasi
                                        </>) : 'Konfirmasi'}
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button>
                                    Terima
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Terima Pendaftaran?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Peserta yang didaftarkan pengguna akan memperoleh QR dan berhak melakukan presensi. Aksi ini tidak dapat dikembalikan. Apakah Anda yakin?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
                                    <Button disabled={isLoading} onClick={() => {
                                        setIsLoading(true)
                                        axios.post(accept().url, {
                                            invoice_id: user.invoice?.id
                                        }).then(({ data: res }) => {
                                            toast.success(res.message)
                                            const newUsers = [...users]
                                            newUsers[userIndex!].invoice!.verified_at = res.data.verified_at
                                            setUsers(newUsers)
                                            setUserIndex(undefined)
                                        }).catch(err => {
                                            let message
                                            if (err instanceof AxiosError) {
                                                message = err.response?.data.message
                                            }
                                            toast.error('Terjadi Kesalahan', {
                                                description: `${message}`
                                            })
                                        }).finally(() => {
                                            setIsLoading(false)
                                            setIsAcceptDialogOpen(false)
                                        })
                                    }}>
                                        {isLoading ? (<>
                                            <Spinner /> Mengonfirmasi
                                        </>) : 'Konfirmasi'}
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}