import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"

import { capitalizeWords, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "./ui/label"
import { useEffect, useState } from "react"
import { Invoice, Option } from "@/types"
import { Spinner } from "./ui/spinner"

type Props = {
    isFetching: boolean
    options?: Option[]
    invoice: Invoice
    setInvoice: (value: Invoice) => void
}


export default function AgencyCombobox({ options = [], isFetching, invoice, setInvoice }: Props) {
    const [opts, setOpts] = useState(options);
    const [open, setOpen] = useState(false);

    const setCapitalizeTerm = (val: string) => {
        invoice.agency!.name = capitalizeWords(val)
        setInvoice({ ...invoice })
    }

    const onChange = (val: number) => {
        invoice.agency_id = val
        setInvoice({ ...invoice })
    }

    useEffect(() => {
        setOpts(options)
    }, [options]);

    const getAgencyLabel = () => {
        if (typeof invoice.agency_id === 'number') {
            const opt = opts.find(opt => opt.id === invoice.agency_id)
            if (opt) {
                return opt.name
            }
        }

        if (!invoice.agency?.level_id) {
            return "Pilih jenis instansi terlebih dahulu!"
        }

        if (isFetching) {
            return "Mengambil daftar instansi..."
        }

        return "Pilih instansi..."
    }


    return (
        <div className="mb-4">
            <Label onClick={() => setOpen(true)}>Nama Instansi</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between text-muted-foreground"
                        disabled={isFetching || invoice.agency?.level_id === undefined || invoice.agency.level_id === 4}
                    >
                        {getAgencyLabel()}
                        {invoice.agency?.level_id && (isFetching ? <Spinner className="opacity-50" /> : <ChevronDown className="opacity-50" />)}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Cari Instansi..." value={invoice.agency?.name} onValueChange={setCapitalizeTerm} className="h-9" />
                        <CommandList>
                            {invoice.agency?.name && <CommandEmpty className="p-1.5">
                                <div className="bg-secondary rounded px-2 py-1.5 text-sm cursor-pointer" onClick={() => {
                                    if (opts.at(-1)?.id === 0) {
                                        const newOpts = [...opts]
                                        newOpts[newOpts.length - 1].name = invoice.agency!.name
                                        setOpts(newOpts)
                                    } else {
                                        setOpts([...opts, { name: invoice.agency!.name, id: 0 }])
                                    }
                                    onChange(0)
                                    setOpen(false)
                                }}>
                                    {invoice.agency.name}
                                </div>
                            </CommandEmpty>}
                            <CommandGroup>
                                {opts.map((opt) => (
                                    <CommandItem
                                        className="cursor-pointer"
                                        key={opt.id}
                                        onSelect={() => {
                                            onChange(opt.id)
                                            setOpen(false)
                                        }}
                                    >
                                        {opt.name}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                invoice.agency_id === opt.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
