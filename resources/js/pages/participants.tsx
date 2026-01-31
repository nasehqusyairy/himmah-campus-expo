import Certificate, { CertificateConfig } from "@/components/certificate";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import LevelSelect from "@/components/level-select";
import QRDialog from "@/components/qr-dialog";
import TableFilter from "@/components/table-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout"
import { capitalizeWords, toFourDigit } from "@/lib/utils";
import participantsRoute from "@/routes/participants";
import {
    BreadcrumbItem,
    Level,
    Paginated,
    Participant,
    SharedData
} from "@/types";
import { Form, Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import axios from "axios";
import { toPng } from "html-to-image";
import {
    Download,
    Medal,
    Plus,
    QrCode,
    X
} from "lucide-react";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState
} from "react";
import { toast } from "sonner";

function columnRefs(
    setQr: Dispatch<SetStateAction<string | undefined>>,
    setQrOwner: Dispatch<SetStateAction<string>>,
    setCertData: Dispatch<SetStateAction<{ number: string, name: string } | undefined>>,
    downloadCert: (name: string) => Promise<void>
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
                                <DropdownMenuItem onClick={() => {
                                    if (row.original.certificate && row.original.present_at) {
                                        setCertData({
                                            name: row.original.name,
                                            number: toFourDigit(row.original.certificate.id)
                                        })
                                    } else {
                                        toast.error('Sertifikat belum tersedia')
                                    }
                                }}>
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
        href: participantsRoute.index().url,
    },
];

type Props = {
    participants: Paginated<Participant>
    levels: Level[],
    certificateConfig: CertificateConfig
}

export default ({ participants, levels, certificateConfig }: Props) => {

    const [isCreating, setIsCreating] = useState(false);

    const { auth } = usePage<SharedData>().props

    const [qr, setQr] = useState<string>();
    const [qrOwner, setQrOwner] = useState('');

    const [lvl, setLvl] = useState<number>();
    const [name, setName] = useState('');
    const [names, setNames] = useState<string[]>([]);
    const [agency, setAgency] = useState('');
    const [wa, setWa] = useState('');

    const removeParticipant = (n: string) => {
        setNames(names.filter(el => el !== n))
    }

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [certData, setCertData] = useState<{
        number: string;
        name: string;
    }>();

    useEffect(() => {
        const columnVisibilityCache = localStorage.getItem('participantColumns')
        if (columnVisibilityCache) {
            setColumnVisibility(JSON.parse(columnVisibilityCache))
        } else {
            setColumnVisibility({
                agency: false,
                level: false
            })
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

    useEffect(() => {
        if (certData) {
            downloadCert(certData.name).then(() => {
                setCertData(undefined)
            }).catch((err) => {
                console.error('Download error:', err);
            })
        }
    }, [certData]);

    const certificateRef = useRef<HTMLDivElement>(null);

    const downloadCert = async (name: string) => {
        if (certificateRef.current === null || certData === undefined) return;

        // Berikan waktu ekstra bagi browser untuk memastikan font ter-load
        const dataUrl = await toPng(certificateRef.current, {
            cacheBust: true
        });

        const link = document.createElement('a');
        link.download = `SERTIFIKAT ${name.toUpperCase()}.png`;
        link.href = dataUrl;
        link.click();
    };

    const columns = columnRefs(setQr, setQrOwner, setCertData, downloadCert)

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
            <Certificate
                ref={certificateRef}
                backgroundUrl={certificateConfig.backgroundUrl}
                certificateNumber={{
                    ...certificateConfig.certificateNumber,
                    value: certData?.number || ''
                }}
                participantName={{
                    ...certificateConfig.participantName,
                    value: capitalizeWords(certData?.name?.toUpperCase() || '', true)
                }}
            />
            {auth.user.role_id === 1 && (
                <Dialog>
                    <DialogTrigger asChild className="mb-4 w-full lg:w-auto">
                        <Button>Tambahkan Peserta</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Tambahkan Peserta</DialogTitle>
                        <form>
                            <LevelSelect onChange={setLvl} value={lvl} options={levels} />
                            <div className="mb-4">
                                <Label htmlFor="agency">Nama Instansi</Label>
                                <Input name="agency" id="agency" value={agency} onChange={e => setAgency(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="wa">No. WhatsApp</Label>
                                <Input name="wa" type="number" id="wa" value={wa} onChange={e => setWa(e.target.value)} />
                            </div>
                        </form>
                        <form className="mb-4" onSubmit={(evt) => {
                            evt.preventDefault()
                            setNames([...names, name])
                            setName('')
                        }}>
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <div className="flex gap-2">
                                <Input id="name" name="name" value={name} onChange={(evt) => setName(evt.target.value.toUpperCase())} />
                                <div>
                                    <Button type="submit" size={"icon"}><Plus /></Button>
                                </div>
                            </div>
                        </form>

                        <div className="">
                            {names.map(el => (
                                <div key={el} className="flex justify-between items-center py-2 border-b">
                                    <span>{el}</span>
                                    <Button variant={"destructive"} size={"icon"} onClick={() => removeParticipant(el)}><X /></Button>
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button disabled={isCreating} onClick={() => {
                                if (lvl && agency && wa && names) {
                                    setIsCreating(true)
                                    axios.post(participantsRoute.store().url, { level_id: lvl, agency, wa, names }).then(e => {
                                        toast.success('Berhasil ditambahkan, mereload...')
                                        window.location.reload()
                                    }).catch(() => {
                                        toast.error('Terjadi kesalahan')
                                        setIsCreating(false)
                                    })
                                } else {
                                    toast.error('Data tidak lengkap')
                                }
                            }}>
                                {isCreating ? 'Menambahkan...' : 'Tambahkan'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
            <TableFilter levels={levels} table={{ ...table }} />
            <DataTable columns={columns} table={{ ...table }} />
            <DataTablePagination pagination={participants} />
            <QRDialog qr={qr} setQr={setQr} qrOwner={qrOwner} />
        </AppLayout>
    )
}

