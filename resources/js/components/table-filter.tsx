import { Form } from "@inertiajs/react";
import ColumnSelect from "./column-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Table } from "@tanstack/react-table";
import { Level } from "@/types";

type Props<T> = {
    table: Table<T>
    levels: Level[]
}

export default function TableFilter<T>({ levels, table }: Props<T>) {
    return (
        <div className="lg:flex grid lg:justify-between gap-2 mb-4">
            <ColumnSelect table={{ ...table }} />
            <Form className="lg:flex grid lg:items-center gap-2 mb-4 lg:m-0">
                <input type="hidden" name="page" value="1" />
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
    )
}