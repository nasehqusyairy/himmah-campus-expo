import { router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import { Paginated } from "@/types"

type Props<T> = {
    pagination: Paginated<T>
}

export function DataTablePagination<T>({ pagination }: Props<T>) {
    const {
        current_page,
        last_page,
        links,
    } = pagination

    const canPreviousPage = current_page > 1
    const canNextPage = current_page < last_page

    const firstPageUrl = links.find(l => l.label === "&laquo; First")?.url
    const prevPageUrl = links.find(l => l.label === "&lsaquo;")?.url
    const nextPageUrl = links.find(l => l.label === "&rsaquo;")?.url
    const lastPageUrl = links.find(l => l.label === "Last &raquo;")?.url

    return (
        <div className="flex items-center justify-end space-x-6 lg:space-x-8">
            <div className="flex items-center justify-center text-sm font-medium">
                Halaman {current_page} dari {last_page}
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="hidden size-8 lg:flex"
                    onClick={() => firstPageUrl && router.get(firstPageUrl, {}, { preserveScroll: true })}
                    disabled={!canPreviousPage}
                >
                    <ChevronsLeft />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => prevPageUrl && router.get(prevPageUrl, {}, { preserveScroll: true })}
                    disabled={!canPreviousPage}
                >
                    <ChevronLeft />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => nextPageUrl && router.get(nextPageUrl, {}, { preserveScroll: true })}
                    disabled={!canNextPage}
                >
                    <ChevronRight />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="hidden size-8 lg:flex"
                    onClick={() => lastPageUrl && router.get(lastPageUrl, {}, { preserveScroll: true })}
                    disabled={!canNextPage}
                >
                    <ChevronsRight />
                </Button>
            </div>
        </div>
    )
}
