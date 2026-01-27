import { Badge } from "../ui/badge";

export default () => {
    return (
        <section id="about" className="py-24 bg-black">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto lg:text-center">
                    <Badge className="mb-4 font-bold">TENTANG</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Level up Your <span className="text-primary">Future</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-12">
                        <span className="text-primary font-bold">Seminar Pelajar Gen-Z & <span className="font-bold">HIMMAH</span> Campus Expo </span>
                        acara yang diselenggarakan oleh Pondok Pesantren Bayt Al-Hikmah dengan tujuan mulia untuk menjembatani kesenjangan antara potensi pelajar/mahasiswa di seluruh Indonesia dengan peluang pendidikan tinggi terbaik. Melalui seminar ini, kami bertekad memberikan wawasan mendalam, strategi jitu, dan "ilmu mahal" langsung dari para tokoh akademis terkemuka, sehingga peserta dapat mengeksplorasi secara maksimal jalan menuju universitas impian  dan merencanakan masa depan akademik yang terencana dan sukses.
                    </p>
                    <div className="flex lg:justify-center gap-6">
                        <div>
                            <p className="text-primary text-3xl font-black mb-2">20+</p>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Universitas</p>
                        </div>
                        <div>
                            <p className="text-primary text-3xl font-black mb-2">1000+</p>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Kuota Pendaftaran</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};