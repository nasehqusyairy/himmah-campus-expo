import { GraduationCap, ShieldCheck, Star } from "lucide-react";
import speaker from '@/images/speaker.png'

export default () => {
    return (
        <section id="speaker" className="py-24 bg-black relative">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="relative w-full md:w-1/2">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-transparent rounded-full opacity-20 blur-2xl"></div>
                        <img
                            src={speaker}
                            alt="Shakira Amirah"
                            className="relative w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-primary text-black rounded-lg transform -skew-x-12">
                            <h3 className="text-2xl font-black italic text-center uppercase skew-x-12">Shakira Amirah</h3>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <div className="text-primary font-bold uppercase tracking-[0.2em] mb-4">Pembicara Tamu</div>
                        <h2 className="text-4xl font-bold mb-6">Pemenang <span className="text-primary italic">Clash of Champions</span> Ruangguru <span className="inile-block bg-primary px-2">2024</span></h2>
                        {/* <p className="text-gray-400 text-lg mb-8 leading-relaxed italic">
                            "Experience the journey of excellence. Learn from the best how to strategically plan your academic future and crush your goals."
                        </p> */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                <GraduationCap className="text-primary mb-2" />
                                <h4 className="font-bold text-white uppercase text-sm tracking-widest">Pendidikan</h4>
                                <p className="text-xs text-gray-500">Fakultas Kedokteran UI</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                <Star className="text-primary mb-2" />
                                <h4 className="font-bold text-white uppercase text-sm tracking-widest">Keahlian</h4>
                                <p className="text-xs text-gray-500">Mentoring Akademik</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};