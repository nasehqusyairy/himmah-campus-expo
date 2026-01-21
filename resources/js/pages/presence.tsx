import QrScanner from "@/components/qr-scanner";
import AppLayout from "@/layouts/app-layout";
import { index } from "@/routes/presence";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Presensi", href: index().url },
];

export default function PresencePage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Presensi" />
            <QrScanner />
        </AppLayout>
    );
}