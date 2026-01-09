import About from "@/components/landing-page-sections/about";
import Details from "@/components/landing-page-sections/details";
import Footer from "@/components/landing-page-sections/footer";
import Header from "@/components/landing-page-sections/header";
import Hero from "@/components/landing-page-sections/hero";
import Logos from "@/components/landing-page-sections/logos";
import RegistrationCta from "@/components/landing-page-sections/registration-cta";
import Speaker from "@/components/landing-page-sections/speaker";

export default () => {
    return (
        <div className="min-h-screen landing-page">
            <Header />
            <main>
                <Hero />
                <About />
                <Speaker />
                <Details />
                <Logos />
                <RegistrationCta />
            </main>
            <Footer />
        </div>
    );
};
