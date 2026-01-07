import { useWizard, WizardProvider } from "@/components/context-provider/wizard";
import { InvoiceCard } from "@/components/invoice-card";
import ParticipantIdentity from "@/components/participant-identity";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import UserIdentityForm from "@/components/user-identity-form";
import VerificatingCard from "@/components/verificating-card";
import AppLayout from "@/layouts/app-layout";
import registration from "@/routes/registration";
import { Agency, BreadcrumbItem, Invoice, Option, Participant } from "@/types";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { Info, TriangleAlert } from "lucide-react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        href: registration.index().url,
        title: 'Pendaftaran Peserta'
    }
]

type Props = {
    step?: number
    levels: Option[]
    invoice: Invoice
    price: number
    account: {
        bank: string
        number: string
        name: string
    }
}

export default function Registration({ levels = [], invoice: invc, step, price, account }: Props) {
    if (!invc.agency) {
        invc.agency = {} as Agency
    }

    const [invoice, setInvoice] = useState(invc);
    const [participants, setParticipants] = useState<string[]>(invc.participants.map(el => el.name));

    const steps = [
        {
            title: "Lengkapi Identitas",
            component: <UserIdentityForm {...{ invoice, setInvoice, levels }} />
        },
        {
            title: "Tambahkan Peserta",
            component: <ParticipantIdentity {...{ participants, setParticipants }} />
        },
        {
            title: "Selesaikan Pembayaran",
            component: <InvoiceCard {...{ price, account, quantity: participants.length, fileUrl: invoice.payment_file, setInvoice }} />
        },
        {
            title: "Verifikasi",
            component: <VerificatingCard />
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />
            <Alert className="mb-4">
                <TriangleAlert />
                <AlertTitle>Peringatan</AlertTitle>
                <AlertDescription>
                    Periksa kembali data yang dimasukkan. Data tidak bisa diubah setelah melakukan pembayaran
                </AlertDescription>
            </Alert>
            <WizardProvider steps={steps} initialStep={step || 0} />
        </AppLayout>
    );
}