import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import QASection from "./_components/QASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Features />
      <QASection />
      <Footer />
    </>
  );
}
