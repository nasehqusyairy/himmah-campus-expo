import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function capitalizeWords(str: string, isLowerFirst = false): string {
    const s = isLowerFirst ? str.toLowerCase() : str
    return s.replace(/\b\w/g, char => char.toUpperCase());
}

export function toRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value)
}

export function parseQueryString(url: string): Record<string, string> {
    const params = new URL(url).searchParams
    const result: Record<string, string> = {}

    params.forEach((value, key) => {
        result[key] = value
    })

    return result
}

/**
 * Mengambil token dari URL setelah segment path tertentu.
 * @param url - String URL lengkap atau path
 * @param parentSegment - Nama folder/segment sebelum token (default: 'presence')
 * @returns string | undefined
 */
export const extractToken = (url: string, parentSegment: string = "presence"): string | undefined => {
    // Penjelasan Regex:
    // [\/]           -> Mencari karakter "/"
    // ${parentSegment} -> Nama segment yang ditentukan (misal: presence)
    // [\/]           -> Mencari karakter "/" setelahnya
    // ([^\/?#]+)     -> Group 1: Ambil semua karakter kecuali "/", "?", atau "#"
    const regex = new RegExp(`[\\/]${parentSegment}[\\/]([^\\/?#]+)`);

    const match = url.match(regex);

    // Jika ditemukan, kembalikan Group 1 (index 1), jika tidak kembalikan undefined
    return match ? match[1] : undefined;
};

export function toFourDigit(value: number): string {
    return value.toString().padStart(4, '0');
}
