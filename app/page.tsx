import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Courses from "@/components/Courses";
import MonthlyPlans from "@/components/MonthlyPlans";
import News from "@/components/News";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Team from "@/components/Team";
import ContactCTA from "@/components/ContactCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <Courses />
        <MonthlyPlans />
        <News />
        <Testimonials />
        <About />
        <Team />
        <ContactCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
