import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CreditCard, LayoutGrid, Notebook, QrCode, Users } from 'lucide-react';
import AppLogo from './app-logo';
import registration from '@/routes/registration';
import participants from '@/routes/participants';
import validating from '@/routes/validating';
import presence from '@/routes/presence';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    }
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    let navItems;
    if (auth.user.role_id === 1) {
        navItems = mainNavItems.concat([
            {
                title: 'Validasi Pendaftaran',
                href: validating.index().url,
                icon: CreditCard
            },
            {
                title: 'Daftar Peserta',
                href: participants.index().url,
                icon: Users
            },
            {
                title: 'Scan Kode Presensi',
                href: presence.index().url,
                icon: QrCode
            },
        ])
    } else {
        navItems = mainNavItems.concat([
            {
                title: 'Daftar Peserta',
                href: participants.index().url,
                icon: Users
            },
            {
                title: 'Pendaftaran',
                href: registration.index().url,
                icon: Notebook
            }
        ])
    }

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
