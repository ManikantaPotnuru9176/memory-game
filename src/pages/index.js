import Navbar from "@/components/navbar/Navbar";
import Grid from "@/components/hero/Grid";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="lg:container mx-auto px-4">
        <Grid />
      </div>
      <Footer />
    </>
  );
}
