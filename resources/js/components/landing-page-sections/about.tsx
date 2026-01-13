import { Badge } from "../ui/badge";

export default () => {
    return (
        <section id="about" className="py-24 bg-black">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto lg:text-center">
                    <Badge className="mb-4 font-bold">TENTANG</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Level up Your <span className="text-primary">Future</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-12">
                        Seminar Pelajar Pasuruan & Himmah Campus Expo adalah acara yang menargetkan pelajar/mahasiswa
                        untuk mengeksplorasi peluang universitas dan mendapatkan wawasan dari tokoh akademis.
                        Kami menjembatani kesenjangan antara posisi Anda saat ini dan posisi yang ingin Anda capai.
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