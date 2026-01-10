import ColumnSelect from "@/components/column-select";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import InvoicePreviewDialog from "@/components/invoice-preview-dialog";
import QRDialog from "@/components/qr-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout"
import participants from "@/routes/participants";
import validating from "@/routes/validating";
import { BreadcrumbItem, Paginated, Participant, User } from "@/types";
import { Form } from "@inertiajs/react";
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import axios from "axios";
import { MoreVertical, QrCode, Search, SquareArrowOutUpRight } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

function columnRefs(setPreview: Dispatch<SetStateAction<number | undefined>>) {
    return [
        {
            id: 'order',
            header: 'No.',
            cell: ({ row }) => row.index + 1
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
                    <>
                        <Button size={"icon"} onClick={() => setPreview(row.index)}>
                            <SquareArrowOutUpRight />
                        </Button>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size={"icon"} variant={"ghost"}>
                                    <MoreVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <SquareArrowOutUpRight /> Detail
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </>
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
}

export default ({ users: paginatedUsers }: Props) => {
    const [users, setUsers] = useState(paginatedUsers.data);
    const [preview, setPreview] = useState<number>();

    // console.log(users);


    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        agency: false,
        level: false
    })

    const columns = columnRefs(setPreview)

    const table = useReactTable({
        data: users,
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
            <DataTablePagination pagination={paginatedUsers} />
            <InvoicePreviewDialog users={users} setUsers={setUsers} setUserIndex={setPreview} userIndex={preview} />
        </AppLayout>
    )
}

