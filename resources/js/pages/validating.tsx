import ColumnSelect from "@/components/column-select";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import InvoicePreviewDialog from "@/components/invoice-preview-dialog";
import QRDialog from "@/components/qr-dialog";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import AppLayout from "@/layouts/app-layout"
import participants from "@/routes/participants";
import validating, { deleteUser } from "@/routes/validating";
import { BreadcrumbItem, Level, Paginated, Participant, User } from "@/types";
import { Form, Head } from "@inertiajs/react";
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import { MoreVertical, QrCode, Search, SquareArrowOutUpRight, UserX } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function columnRefs(
    setPreview: Dispatch<SetStateAction<number | undefined>>,
    setUserIdToDelete: Dispatch<SetStateAction<number | undefined>>
): ColumnDef<User>[] {
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
            accessorFn: (d) => d.invoice?.agency?.name || '-'
        },
        {
            id: 'level',
            header: 'Jenis',
            accessorFn: (d) => d.invoice?.agency?.level?.name || '-'
        },
        {
            id: 'wa',
            header: 'WhatsApp',
            cell: ({ row, }) => {
                if (!row.original.invoice?.wa) {
                    return '-'
                }
                return (
                    <a className="text-primary underline" href={"https://wa.me/+62" + row.original.invoice?.wa} target="_blank">
                        {row.original.invoice?.wa}
                    </a>
                )
            }
        },
        {
            id: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const verified_at = row.original.invoice?.verified_at
                const last = row.original.step?.last ?? 0
                let variant: "default" | "destructive" | "secondary" | "outline" | null | undefined, label;
                if (verified_at) {
                    variant = 'default'
                    label = 'Valid'
                } else {
                    if (last < 3) {
                        variant = 'secondary'
                        label = 'Mendaftar'
                    } else {
                        variant = 'destructive'
                        label = 'Validasi'
                    }
                }

                return (
                    <Badge variant={variant}>{label}</Badge>
                )
            }
        }, {
            id: 'action',
            header: 'Aksi',
            cell: ({ row }) => {
                return (
                    <div className="flex gap-1">
                        <Button size={"icon"} onClick={() => setPreview(row.index)}>
                            <SquareArrowOutUpRight />
                        </Button>
                        <Button size={"icon"} variant={"destructive"} onClick={() => setUserIdToDelete(row.original.id)}>
                            <UserX />
                        </Button>
                    </div>
                )
            }
        }
    ] as ColumnDef<User>[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Validasi Pendaftaran',
        href: validating.index().url,
    },
];

type Props = {
    users: Paginated<User>
    levels: Level[]
}

export default ({ users: paginatedUsers, levels }: Props) => {
    const [users, setUsers] = useState(paginatedUsers.data);
    const [preview, setPreview] = useState<number>();
    const [isdeletingUser, setIsdeletingUser] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number>();

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        agency: false,
        level: false
    })

    const isFirstRender = useRef(true)

    useEffect(() => {
        const columnVisibilityCache = localStorage.getItem('validatingColumns')
        if (columnVisibilityCache) {
            setColumnVisibility(JSON.parse(columnVisibilityCache))
        }
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        localStorage.setItem(
            'validatingColumns',
            JSON.stringify(columnVisibility)
        )
    }, [columnVisibility])


    const columns = columnRefs(setPreview, setUserIdToDelete)

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
            pagination: {
                pageIndex: paginatedUsers.current_page - 1,
                pageSize: paginatedUsers.per_page
            }
        }
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Validasi Pendaftaran" />
            <div className="lg:flex grid lg:justify-between gap-2 mb-4">
                <ColumnSelect table={{ ...table }} />
                <Form className="lg:flex grid lg:items-center gap-2 mb-4 lg:m-0">
                    <Select name="level" defaultValue={(new URLSearchParams(window.location.search)).get('level') || 'all'}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis instansi..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'all'}>Semua Jenis</SelectItem>
                            {levels.map(level => (
                                <SelectItem value={level.id.toString()} key={level.id}>{level.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input name="search" defaultValue={(new URLSearchParams(window.location.search)).get('search') || ''} placeholder="Cari nama..." />
                    <Button>
                        Cari
                    </Button>
                </Form>
            </div>
            <DataTable columns={columns} table={{ ...table }} />
            <DataTablePagination pagination={paginatedUsers} />
            <InvoicePreviewDialog users={users} setUsers={setUsers} setUserIndex={setPreview} userIndex={preview} />
            <AlertDialog open={userIdToDelete !== undefined} onOpenChange={() => setUserIdToDelete(undefined)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus User?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        Apakah Anda yakin?
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button disabled={isdeletingUser} onClick={() => {
                            setIsdeletingUser(true)
                            axios.delete(deleteUser().url, {
                                data: {
                                    user_id: userIdToDelete
                                }
                            }).then(({ data: res }) => {
                                toast.success(res.message)
                                setUsers(users.filter(user => user.id !== userIdToDelete))
                            }).catch(err => {
                                let message
                                if (err instanceof AxiosError) {
                                    message = err.response?.data.message
                                }
                                toast.error('Gagal menghapus user', {
                                    description: `${message}`
                                })
                            }).finally(() => {
                                setIsdeletingUser(false)
                                setUserIdToDelete(undefined)
                            })
                        }}>
                            {isdeletingUser ? (<>
                                <Spinner /> Mengonfirmasi
                            </>) : 'Konfirmasi'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    )
}

