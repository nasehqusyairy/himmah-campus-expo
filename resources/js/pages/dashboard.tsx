import TaskItem, { Task } from '@/components/task-item';
import { ItemGroup } from '@/components/ui/item';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import participants from '@/routes/participants';
import presence from '@/routes/presence';
import registration from '@/routes/registration';
import validating from '@/routes/validating';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const memberTask: Task[] = [
    {
        title: "Selesaikan Pendaftaran",
        description: "Pergi ke Halaman Pendaftaran dan lengkapi formulir",
        url: registration.index().url
    },
    {
        title: "Unduh Kode QR dan Sertifikat",
        description: "Pergi ke Halaman Peserta",
        url: participants.index().url
    },
]

const adminTasks: Task[] = [
    {
        title: "Periksa Pendaftaran",
        description: "Buka Halaman Validasi Pendaftaran",
        url: validating.index().url
    },
    {
        title: "Lakukan Presensi",
        description: "Buka Halaman Presensi",
        url: presence.index().url
    },
]

type Props = {
    summary: {
        label: string;
        total: number;
    }[]
}

export default function Dashboard({ summary }: Props) {
    const { auth: { user } } = usePage<SharedData>().props
    const tasks = user.role_id === 2 ? memberTask : adminTasks
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <h1 className='mb-4'>Tugas</h1>
            <ItemGroup className="gap-4">
                {tasks.map((task, i) => (
                    <TaskItem key={i} task={task} />
                ))}
            </ItemGroup>
            {summary.length > 0 && (
                <div className="mt-4">
                    <h2 className="mb-4">Ringkasan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {summary.map((item, i) => (
                            <div key={i} className="p-4 rounded-md border flex flex-col-reverse">
                                <h2 className='text-muted-foreground'>{item.label}</h2>
                                <p>{item.total}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
