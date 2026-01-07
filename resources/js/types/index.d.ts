import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    role_id: number
    invoice: Invoice
    step: Step
}

export type Step = {
    id: number
    last: number
}

export type Option = {
    name: string
    id: number
}

export type Participant = {
    id: number
    name: string
    invoice: Invoice
    presence_token: string
    present_at: string
}

export type Agency = {
    id: number
    name: string
    level_id: number
    level: Level
}

export type Level = {
    id: number
    name: string
}

export type Invoice = {
    id: number
    user_id: number
    agency_id?: number
    agency?: Agency
    wa: string
    payment_file: string
    verified_at: string
    participants: Participant[]
}

export type PaginationLink = {
    url: string | null
    label: string
    active: boolean
}

export type Paginated<T> = {
    data: T[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number | null
    to: number | null
    links: PaginationLink[]
}
