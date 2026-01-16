const univs = [
    {
        "img": "ui.png",
        "name": "Universitas Indonesia",
        "href": "https://www.ui.ac.id"
    },
    {
        "img": "its.png",
        "name": "Institut Teknologi Sepuluh Nopember",
        "href": "https://www.its.ac.id"
    },
    {
        "img": "unesa.png",
        "name": "Universitas Negeri Surabaya",
        "href": "https://www.unesa.ac.id"
    },
    {
        "img": "um.png",
        "name": "Universitas Negeri Malang",
        "href": "https://www.um.ac.id"
    },
    {
        "img": "unair.png",
        "name": "Universitas Airlangga",
        "href": "https://www.unair.ac.id"
    },
    {
        "img": "ub.png",
        "name": "Universitas Brawijaya",
        "href": "https://www.ub.ac.id"
    },
    {
        "img": "polije.png",
        "name": "Politeknik Negeri Jember",
        "href": "https://www.polije.ac.id"
    },
    {
        "img": "uin-malang.png",
        "name": "UIN Maulana Malik Ibrahim Malang",
        "href": "https://www.uin-malang.ac.id"
    },
    {
        "img": "uinsa.png",
        "name": "UIN Sunan Ampel Surabaya",
        "href": "https://www.uinsby.ac.id"
    },
    {
        "img": "umm.png",
        "name": "Universitas Muhammadiyah Malang",
        "href": "https://www.umm.ac.id"
    },
    {
        "img": "unisma.png",
        "name": "Universitas Islam Malang",
        "href": "https://www.unisma.ac.id"
    },
    {
        "img": "pens.png",
        "name": "Politeknik Elektronika Negeri Surabaya",
        "href": "https://www.pens.ac.id"
    },
    {
        "img": "polinema.png",
        "name": "Politeknik Negeri Malang",
        "href": "https://www.polinema.ac.id"
    },
    {
        "img": "poltekkes-surabaya.png",
        "name": "Poltekkes Kemenkes Surabaya",
        "href": "https://www.poltekkesdepkessby.ac.id"
    },
    {
        "img": "poltekkes-malang.png",
        "name": "Poltekkes Kemenkes Malang",
        "href": "https://www.poltekkesmalang.ac.id"
    },
    {
        "img": "telkom.png",
        "name": "Telkom University",
        "href": "https://telkomuniversity.ac.id"
    },
    {
        "img": "uag.png",
        "name": "Universitas Ary Ginanjar",
        "href": "https://www.uag.ac.id"
    },
    {
        "img": "upn-veteran-jatim.png",
        "name": "UPN Veteran Jawa Timur",
        "href": "https://www.upnjatim.ac.id"
    }
]


export default () => {
    return (
        <section className="py-16 bg-zinc-900 overflow-hidden">
            <div className="container mx-auto px-4 mb-8">
                <h4 className="text-center text-gray-500 font-bold uppercase tracking-widest text-sm mb-12">Mitra Universitas</h4>
            </div>
            <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                {univs.concat(univs).map((univ, idx) => (
                    <a href={univ.href} target="_blank" key={idx}>
                        <img src={"/assets/images/" + univ.img} loading="lazy" alt={univ.name} className="h-12 w-12 mx-8 object-contain gap-8 filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-opacity" />
                    </a>
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