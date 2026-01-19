import ColumnSelect from "@/components/column-select";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import QRDialog from "@/components/qr-dialog";
import TableFilter from "@/components/table-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout"
import participants from "@/routes/participants";
import { BreadcrumbItem, Level, Paginated, Participant } from "@/types";
import { Form, Head } from "@inertiajs/react";
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Download, Medal, MoreVertical, QrCode, Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function columnRefs(
    qr: string | undefined,
    setQr: Dispatch<SetStateAction<string | undefined>>,
    setQrOwner: Dispatch<SetStateAction<string>>
) {
    return [
        {
            id: 'order',
            header: 'No.',
            cell: ({ row, table }) => {
                const pageIndex = table.getState().pagination.pageIndex
                const pageSize = table.getState().pagination.pageSize

                return row.index + 1 + (pageIndex * pageSize)
            }
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
            accessorFn: (d) => d.invoice?.agency?.name,
        },
        {
            id: 'level',
            header: 'Jenis',
            accessorFn: (d) => d.invoice?.agency?.level?.name
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
                                        setQrOwner(row.original.name)
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
        title: 'Daftar Peserta',
        href: participants.index().url,
    },
];

type Props = {
    participants: Paginated<Participant>
    levels: Level[]
}

export default ({ participants, levels }: Props) => {
    const [qr, setQr] = useState<string>();
    const [qrOwner, setQrOwner] = useState('');

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        agency: false,
        level: false
    })

    useEffect(() => {
        const columnVisibilityCache = localStorage.getItem('participantColumns')
        if (columnVisibilityCache) {
            setColumnVisibility(JSON.parse(columnVisibilityCache))
        }
    }, []);

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        localStorage.setItem(
            'participantColumns',
            JSON.stringify(columnVisibility)
        )
    }, [columnVisibility])


    const columns = columnRefs(qr, setQr, setQrOwner)

    const table = useReactTable({
        data: participants.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
            pagination: {
                pageIndex: participants.current_page - 1,
                pageSize: participants.per_page
            }
        }
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Peserta" />
            <TableFilter {...{ levels, table }} />
            <DataTable columns={columns} table={{ ...table }} />
            <DataTablePagination pagination={participants} />
            <QRDialog qr={qr} setQr={setQr} qrOwner={qrOwner} />
        </AppLayout>
    )
}

