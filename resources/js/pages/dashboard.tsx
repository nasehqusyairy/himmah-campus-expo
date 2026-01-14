import TaskItem, { Task } from '@/components/task-item';
import { ItemGroup } from '@/components/ui/item';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import participants from '@/routes/participants';
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
        description: "KERJA KERJA KERJA!!!",
        url: validating.index().url
    }
]

export default function Dashboard() {
    const { auth: { user } } = usePage<SharedData>().props
    const tasks = user.role_id === 2 ? memberTask : adminTasks
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <ItemGroup className="gap-4">
                {tasks.map((task, i) => (
                    <TaskItem key={i} task={task} />
                ))}
            </ItemGroup>
        </AppLayout>
    );
}
