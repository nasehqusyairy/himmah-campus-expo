import logo from '@/images/logo.png'
import { Button } from '../ui/button';
import { Link } from '@inertiajs/react';
import { login } from '@/routes';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        // guard for SSR and set initial state
        if (typeof window !== 'undefined') {
            setIsTop(window.scrollY === 0);
            const onScroll = () => setIsTop(window.scrollY === 0);
            window.addEventListener('scroll', onScroll, { passive: true });
            return () => window.removeEventListener('scroll', onScroll);
        }
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isTop ? 'bg-transparent' : 'bg-black/60 backdrop-blur-md'}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={logo} className="size-12" alt="logo" />
                    <span className="font-bold text-xl tracking-tight hidden sm:inline-block uppercase">Seminar Pelajar <span className="text-primary">Gen-Z</span> </span>
                </div>
                <nav className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest text-gray-300">
                    <a href="#" className="hover:transition-colors">Beranda</a>
                    <a href="#about" className="hover:transition-colors">Tentang</a>
                    <a href="#speaker" className="hover:transition-colors">Pembicara</a>
                    <a href="#details" className="hover:transition-colors">Info</a>
                    <a href="#contact" className="hover:transition-colors">Kontak</a>
                </nav>
                <Button className="text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(20,184,166,0.4)]" asChild>
                    <Link href={login().url}>Daftar Sekarang</Link>
                </Button>
            </div>
        </header>
    );
};
