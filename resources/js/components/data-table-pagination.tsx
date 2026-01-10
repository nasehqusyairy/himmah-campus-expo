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
        first_page_url,
        last_page_url,
        next_page_url,
        prev_page_url
    } = pagination

    const canPreviousPage = current_page > 1
    const canNextPage = current_page < last_page

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
                    onClick={() => {

                        first_page_url && router.get(first_page_url, {}, { preserveScroll: true })
                    }}
                    disabled={!canPreviousPage}
                >
                    <ChevronsLeft />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => prev_page_url && router.get(prev_page_url, {}, { preserveScroll: true })}
                    disabled={!canPreviousPage}
                >
                    <ChevronLeft />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        next_page_url && router.get(next_page_url, {}, { preserveScroll: true })
                    }}
                    disabled={!canNextPage}
                >
                    <ChevronRight />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="hidden size-8 lg:flex"
                    onClick={() => last_page_url && router.get(last_page_url, {}, { preserveScroll: true })}
                    disabled={!canNextPage}
                >
                    <ChevronsRight />
                </Button>
            </div>
        </div>
    )
}
