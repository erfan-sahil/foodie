import Hero from "@/components/Hero";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

type Props = {
  showHero?: boolean;
  children: React.ReactNode;
};

export default function Layout({ children, showHero = false }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}

      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}
