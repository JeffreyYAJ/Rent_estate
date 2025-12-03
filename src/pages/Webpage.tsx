import NavBar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PropertyTypeSection from "../components/PropertyTypeSection";
import FeaturedProperties from "../components/FeaturedProperties";
//import ExploreMap from "../components/ExploreMap";
import { Footer } from "../components/Footer";
import ProfileCard from "../components/profile";
import FAQSection from "../components/FAQ";
import Discover from "../components/Disccover";
//import MapCard from "../components/ExploreMap";

function Webpage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <HeroSection />
      <Discover/>
      <PropertyTypeSection />
      <FeaturedProperties />
      <ProfileCard/>
      <FAQSection />
      <Footer />
    </div>
  );
}

export default Webpage;
