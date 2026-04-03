import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Features from "@/components/features";
import WaitlistSection from "@/components/waitlist-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
