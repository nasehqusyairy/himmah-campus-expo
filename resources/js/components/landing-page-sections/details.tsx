import { Calendar, Clock, MapPin } from "lucide-react";

export default () => {
    return (
        <section id="details" className="py-12 bg-zinc-900">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="bg-black/40 p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors">
                        <div className="flex gap-8 items-center">
                            <Calendar className="w-12 h-12 text-primary" />
                            <div>
                                <h3 className="text-gray-400 font-bold uppercase tracking-wide">TANGGAL</h3>
                                <p className="text-2xl font-bold">31 Januari 2026</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/40 p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors">
                        <div className="flex gap-8 items-center">
                            <Clock className="w-12 h-12 text-primary" />
                            <div>
                                <h3 className="text-gray-400 font-bold uppercase tracking-wide">JAM</h3>
                                <p className="text-2xl font-bold">07.00 - Selesai</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/40 p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors">
                        <div className="flex gap-8 items-center">
                            <MapPin className="w-12 h-12 text-primary" />
                            <div>
                                <h3 className="text-gray-400 font-bold uppercase tracking-wide">LOKASI</h3>
                                <p className="text-2xl font-bold">BCC Bayt Al Hikmah</p>
                            </div>
                        </div>
                    </div>
                </div>
                <iframe className="border-0 w-full rounded-3xl mb-4  " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.1990773300327!2d112.91056622500372!3d-7.661733492354737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7c8a9d8ea511f%3A0xb6d54ddcfd7a5ad8!2sPondok%20Pesantren%20Bayt%20Al-Hikmah!5e0!3m2!1sid!2sid!4v1768262321377!5m2!1sid!2sid" width="600" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
        </section>
    );
};