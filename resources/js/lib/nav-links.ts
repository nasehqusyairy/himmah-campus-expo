import { login } from "@/routes";

export type NavigationItem = {
    label: string;
    href?: string;
    isButton?: boolean;
    children?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
    { label: "Beranda", href: "#hero" },
    { label: "Informasi", href: "#about" },
    { label: "Pembicara", href: "#speaker" },
    { label: "Lokasi", href: "#location" },
    { label: "Pendaftaran", href: login().url, isButton: true },
    { label: "separator" },
    { label: "theme" },
];
