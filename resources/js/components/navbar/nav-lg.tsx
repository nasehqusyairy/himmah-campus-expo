import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { navigation } from "@/lib/nav-links"
import { SunMoon } from "lucide-react"
import { Link } from "@inertiajs/react"
import { Appearance, useAppearance } from "@/hooks/use-appearance"

export default () => {
    const { appearance, updateAppearance } = useAppearance()
    const prefersDark = () =>
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const getEffectiveTheme = (appearance: Appearance) =>
        appearance === 'system'
            ? prefersDark()
                ? 'dark'
                : 'light'
            : appearance;

    const toggleTheme = () => {
        const current = getEffectiveTheme(appearance);
        updateAppearance(current === 'dark' ? 'light' : 'dark');
    };
    return (
        <NavigationMenu viewport={false} className="hidden lg:block">
            <NavigationMenuList>
                {navigation.map((item, index) =>
                    item.children ? (
                        <NavigationMenuItem key={item.label}>
                            <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className={"w-[150px]"}>
                                    {item.children.map((child) => (
                                        <li key={child.label}>
                                            <NavigationMenuLink href={child.href ?? "#"}>{child.label}</NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ) : item.isButton ? (
                        <NavigationMenuItem key={item.label}>
                            <Button asChild={item.href !== undefined}>
                                {item.href ? (
                                    <Link target="_blank" href={item.href}>{item.label}</Link>
                                ) : item.label}
                            </Button>
                        </NavigationMenuItem>
                    ) : item.label === 'separator' ? (
                        <NavigationMenuItem key={index}>
                            <Separator orientation="vertical" className="h-8!" />
                        </NavigationMenuItem>
                    ) : item.label === 'theme' ? (
                        <NavigationMenuItem key={item.label}>
                            <Button size={"icon"} variant={"outline"} onClick={toggleTheme}>
                                <SunMoon />
                            </Button>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem key={item.label}>
                            <NavigationMenuLink asChild>
                                <Link href={item.href ?? "#"} className="nav-link">{item.label}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )
                )}
            </NavigationMenuList>
        </NavigationMenu>
    )
}