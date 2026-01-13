import { Calendar, MapPin } from "lucide-react";
import preview from '@/images/preview.jpg'

export default () => {
    return (
        <section className="relative min-h-screen pt-24 flex items-center overflow-hidden bg-custom-dark">
            {/* Background Decorative Elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-20 left-0 w-80 h-80 bg-teal-900/20 rounded-full blur-[80px] -z-10"></div>

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <div className="z-10">
                    <h1 className="text-4xl md:text-6xl lg:text-5xl font-extrabold leading-tight mb-4 mt-4 lg:mt-0">
                        <span className="">SEMINAR PELAJAR </span>
                        <span className="">GEN-Z</span> <span>DAN</span><br />
                        <span className="bg-primary text-black px-4">CAMPUS EXPO</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                        Level up Your Future with Shakira and Himmah Campus Expo
                        <br />
                        <span className="font-semibold text-primary">"One Step Today, Success All The Way"</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <Calendar className="text-primary" />
                            <div className="text-left">
                                <p className="text-xs text-gray-400 font-bold uppercase">TANGGAL</p>
                                <p className="font-bold">31 Jan 2026</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <MapPin className="text-primary" />
                            <div className="text-left">
                                <p className="text-xs text-gray-400 font-bold uppercase">LOKASI</p>
                                <p className="font-bold">BCC Bayt Al Hikmah</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group flex justify-center lg:justify-end">
                    {/* Hexagonal Background Frame */}
                    <div className="absolute inset-0 bg-primary/20 clip-hexagon animate-pulse-slow"></div>
                    <div className="relative w-full max-w-lg aspect-square">
                        <img
                            src={preview}
                            alt="Event Visualization"
                            className="w-full h-full object-cover rounded-3xl border-2 border-primary/50 shadow-2xl transition-transform group-hover:scale-[1.02]"
                        />
                        {/* Overlay Badges */}
                        <div className="absolute -top-6 -right-6 bg-primary text-black p-4 rounded-2xl shadow-xl transform rotate-3">
                            <p className="text-2xl font-black">2026</p>
                            <p className="text-xs font-bold uppercase tracking-widest">Januari</p>
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-2xl shadow-xl transform -rotate-3">
                            <p className="text-lg font-black leading-tight text-center">LIMITED<br />SLOTS</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};