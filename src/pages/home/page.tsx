import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Safety from "./components/Safety";
import Amenities from "./components/Amenities";
import Gallery from "./components/Gallery";
import StudentLife from "./components/StudentLife";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import FAQ from "./components/FAQ";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden grain-overlay">
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <Rooms />
      <Safety />
      <Amenities />
      <Gallery />
      <StudentLife />
      <Testimonials />
      <Location />
      <FAQ />
      <Booking />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
