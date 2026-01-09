import { login } from "@/routes";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-teal-600/20 -z-10"></div>
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700"></div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        SIAP MENAMBAH <br />
                        <span className="underline decoration-black/30 underline-offset-8">WAWASAN?</span>
                    </h2>
                    <p className="text-teal-100 text-xl mb-12 max-w-xl mx-auto font-medium">
                        Jangan lewatkan kesempatan untuk bertemu Shakira Amirah dan perwakilan dari universitas-universitas ternama di Indonesia.
                    </p>
                    <Link href={login().url} className="inline-flex items-center gap-4 bg-white text-teal-950 px-10 py-5 rounded-full lg:text-2xl font-black hover:bg-teal-50 transition-all transform hover:scale-105 shadow-2xl">
                        DAFTAR SEKARANG <ArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};