import ColumnSelect from "@/components/column-select";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import QRDialog from "@/components/qr-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout"
import participants from "@/routes/participants";
import { BreadcrumbItem, Paginated, Participant } from "@/types";
import { Form } from "@inertiajs/react";
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Download, Medal, MoreVertical, QrCode, Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

function columnRefs(qr: string | undefined, setQr: Dispatch<SetStateAction<string | undefined>>) {
    return [
        {
            id: 'order',
            header: 'No.',
            cell: ({ row }) => row.index + 1
        },
        // {
        //     id: 'qr',
        //     header: 'QR',
        //     cell: ({ row }) => {
        //         return (
        //             <div className="cursor-pointer size-16 rounded-md border text-xs text-wrap text-muted-foreground flex items-center justify-center text-center" onClick={() => {
        //                 if (!row.original.presence_token) {
        //                     toast.error('QR masih dalam proses')
        //                 } else {
        //                     setQr(row.original.presence_token)
        //                 }
        //             }}>
        //                 {!row.original.presence_token ? (
        //                     <span>
        //                         Dalam Proses
        //                     </span>
        //                 ) : (
        //                     <QrCode />
        //                 )}
        //             </div>
        //         )
        //     }
        // },
        {
            id: 'name',
            header: 'Nama',
            cell: ({ row, }) => {
                return (
                    <div className="w-40 lg:w-full overflow-hidden text-wrap">
                        {row.original.name}
                    </div>
                )
            }
        },
        {
            id: 'agency',
            header: 'Instansi',
            accessorFn: (d) => d.invoice.agency!.name,
        },
        {
            id: 'level',
            header: 'Jenis',
            accessorFn: (d) => d.invoice.agency!.level.name
        }, {
            id: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const { present_at } = row.original
                let variant: "default" | "destructive" | "secondary" | "outline" | null | undefined, label;
                if (present_at) {
                    variant = 'default'
                    label = 'Hadir'
                } else {
                    variant = 'destructive'
                    label = 'Absen'
                }
                return (
                    <Badge variant={variant}>{label}</Badge>
                )
            }
        }, {
            id: 'action',
            header: 'Unduh',
            cell: ({ row }) => {
                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size={"icon"}>
                                    <Download />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => {
                                    if (!row.original.presence_token) {
                                        toast.error("QR belum tersedia", {
                                            description: "Menunggu pemrosesan data oleh admin"
                                        })
                                    } else {
                                        setQr(row.original.presence_token)
                                    }
                                }}>
                                    <QrCode /> Kode QR
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.error('Sertifikat belum tersedia')}>
                                    <Medal /> Sertifikat
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )
            }
        }
    ] as ColumnDef<Participant>[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peserta',
        href: participants.index().url,
    },
];

type Props = {
    participants: Paginated<Participant>
}

export default ({ participants }: Props) => {
    const [qr, setQr] = useState<string>();

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        agency: false,
        level: false
    })

    const columns = columnRefs(qr, setQr)

    const table = useReactTable({
        data: participants.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility
        }
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="lg:flex flex-row-reverse justify-between gap-2 mb-4">
                <Form className="flex items-center gap-2 mb-4 lg:m-0">
                    <Input name="search" defaultValue={(new URLSearchParams(window.location.search)).get('search') || ''} placeholder="Cari berdasarkan nama..." />
                    <div>
                        <Button size={"icon"}>
                            <Search />
                        </Button>
                    </div>
                </Form>
                <ColumnSelect table={{ ...table }} />
            </div>
            <DataTable columns={columns} table={{ ...table }} />
            <DataTablePagination pagination={participants} />
            <QRDialog qr={qr} setQr={setQr} />
        </AppLayout>
    )
}

