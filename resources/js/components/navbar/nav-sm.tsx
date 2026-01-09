import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button"
import { ChevronsUpDown, Menu, SunMoon } from "lucide-react"
import { Separator } from "../ui/separator"
import { navigation } from "@/lib/nav-links"
import { Link } from "@inertiajs/react"

export default () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden" size="icon">
                <Menu />
            </Button>
        </SheetTrigger>

        <SheetContent className="p-4">
            <SheetHeader className="px-0 border-b">
                <SheetTitle className="font-semibold">
                    Menu
                </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-2">
                {navigation.map((item, index) =>
                    item.children ? (
                        <Collapsible key={item.label}>
                            <CollapsibleTrigger className="flex justify-between items-center hover:bg-secondary p-2 rounded w-full">
                                {item.label}
                                <ChevronsUpDown size={16} />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col gap-2 pl-4 text-muted">
                                    {item.children.map((child) => (
                                        <Link href={child.href ?? "#"} key={child.label} className="hover:bg-secondary p-2 rounded w-full">
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ) : item.isButton ? (
                        <Button
                            asChild
                            className="w-full"
                            key={item.label}
                        >
                            <Link target="_blank" href={item.href ?? "#"}>{item.label}</Link>
                        </Button>
                    ) : item.label === 'separator' ? (
                        <Separator orientation="horizontal" key={`separator-${index}`} />
                    ) : item.label === 'theme' ? (
                        <Button
                            className="w-full"
                            key={item.label}
                            variant={"outline"}
                            onClick={() => {
                                localStorage.theme = localStorage.theme === "dark" ? "light" : "dark"
                                document.documentElement.classList.toggle("dark")
                            }}
                        >
                            <SunMoon /> Ganti Tema
                        </Button>
                    )
                        : (
                            <Link
                                key={item.label}
                                href={item.href ?? "#"}
                                className="hover:bg-secondary p-2 rounded w-full nav-link"
                            >
                                {item.label}
                            </Link>
                        )
                )}
            </div>
        </SheetContent>
    </Sheet>
)
