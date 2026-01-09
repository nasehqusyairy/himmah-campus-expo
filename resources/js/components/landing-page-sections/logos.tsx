export default () => {
    const logos = Array.from({ length: 12 }).map((_, i) => `https://picsum.photos/200/200?random=${i}`);
    return (
        <section className="py-16 bg-black overflow-hidden">
            <div className="container mx-auto px-4 mb-8">
                <h4 className="text-center text-gray-500 font-bold uppercase tracking-widest text-sm mb-12">Mitra Universitas</h4>
            </div>
            <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                {logos.concat(logos).map((src, idx) => (
                    <img key={idx} src={src} className="h-12 w-12 mx-8 object-contain filter grayscale opacity-50 hover:opacity-100 transition-opacity" />
                ))}
            </div>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
};