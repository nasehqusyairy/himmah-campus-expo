import { Calendar, Clock, MapPin } from "lucide-react";

export default () => {
    return (
        <section id="details" className="py-24 bg-zinc-900 border-y border-primary/30">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-black/40 p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors">
                        <Calendar className="w-12 h-12 text-primary mb-6" />
                        <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">TANGGAL</h3>
                        <p className="text-gray-400 mb-1">Saturday</p>
                        <p className="text-2xl font-bold text-white">31 Januari 2026</p>
                    </div>
                    <div className="bg-black/40 p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors">
                        <Clock className="w-12 h-12 text-primary mb-6" />
                        <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">JAM</h3>
                        <p className="text-gray-400 mb-1">Morning Session</p>
                        <p className="text-2xl font-bold text-white">07.00 - Selesai</p>
                    </div>
                    <div className="bg-black/40 p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors">
                        <MapPin className="w-12 h-12 text-primary mb-6" />
                        <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">TEMPAT</h3>
                        <p className="text-gray-400 mb-1">Venue</p>
                        <p className="text-2xl font-bold text-white">BCC Bayt Al Hikmah</p>
                    </div>
                </div>
            </div>
        </section>
    );
};