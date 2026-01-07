import AgencyCombobox from "./agency-combobox";
import { useEffect, useState } from "react";
import LevelSelect from "./level-select";
import WaField from "./wa-field";
import { Invoice, Option } from "@/types";
import agencyController from "@/routes/agencies";
import axios from "axios";
import { toast } from "sonner";
import { useWizard } from "./context-provider/wizard";
import { userIdentity } from "@/routes/registration";

type Props = {
    levels?: Option[]
    invoice: Invoice
    setInvoice: (invc: Invoice) => void
}

type UserIdentityRequestBody = {
    agency_id: number
    agency_level?: number
    agency_name?: string
    phone: string
}

export default function UserIdentityForm({ invoice, setInvoice, levels }: Props) {
    const [agencies, setAgencies] = useState<Option[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    const { setOnNext, setCurrentStep } = useWizard()

    useEffect(() => {
        const onnextfun = async () => {
            const body: UserIdentityRequestBody = {
                agency_id: invoice.agency_id!,
                phone: invoice.wa
            }

            if (invoice.agency_id === 0) {
                body.agency_name = invoice.agency?.name
                body.agency_level = invoice.agency?.level_id
            }

            const { data } = await axios.post(userIdentity.url(), body)
            setInvoice({ ...invoice, ...data.data.invoice })
            if (invoice.agency_id === 1) {
                setCurrentStep(3)
            }
        }
        setOnNext((() => onnextfun) as any)
    }, [invoice.agency?.name, invoice.agency_id, invoice.agency?.level_id, invoice.wa]);

    useEffect(() => {
        if (invoice.agency?.level_id) {
            setIsFetching(true)
            axios.get(agencyController.index().url + '?level_id=' + invoice.agency.level_id)
                .then(({ data }: { data: Option[] }) => setAgencies(data))
                .catch(() => toast('Gagal meminta daftar instansi dari server. Silakan hubungi admin'))
                .finally(() => setIsFetching(false))

            if (invoice.agency_id === 0) {
                // console.log('menghapus...');

                invoice.agency_id = undefined
                setInvoice({ ...invoice })
            }
        }
    }, [invoice.agency?.level_id]);

    const setWa = (value: string) => {
        invoice.wa = value
        setInvoice({ ...invoice })
    }

    const setLevelId = (value: number) => {
        invoice.agency!.level_id = value
        if (invoice.agency!.level_id === 4) {
            invoice.agency_id = 1
        }
        setInvoice({ ...invoice })
    }

    return (
        <form onSubmit={(evt) => evt.preventDefault()}>
            <WaField value={invoice.wa} onChange={setWa} />
            <LevelSelect onChange={setLevelId} value={invoice.agency?.level_id} options={levels} />
            <AgencyCombobox
                options={agencies}
                isFetching={isFetching}
                invoice={invoice}
                setInvoice={setInvoice}
            />
        </form>
    )
}

