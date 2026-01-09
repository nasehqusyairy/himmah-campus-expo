import { ExternalLink, GraduationCap, Phone, Users } from "lucide-react";
import logo from '@/images/logo.png'

export default () => {
    return (
        <footer id="contact" className="bg-black pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="logo" className="size-12" />
                            <span className="font-bold text-2xl tracking-tighter">PP. Bayt Al-Hikmah <br /><span className="text-primary">Pasuruan</span></span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase text-sm tracking-widest mb-6">Contact Person</h4>
                        <div className="space-y-4">
                            <a href="https://wa.me/6282141803297" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                                <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                <span>0821-4180-3297</span>
                            </a>
                            <a href="https://wa.me/6281250017813" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                                <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                <span>0812-5001-7813</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
                    <p>© 2026 HIMMAH Campus Expo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};