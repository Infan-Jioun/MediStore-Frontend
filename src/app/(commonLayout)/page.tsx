import Category from "./components/Category";
import { HeroSection } from "./components/HeroSection";
import Medicine from "../Medicine";
import DeliverySection from "./components/DeliverySection";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <Category />
      <Medicine />
      <DeliverySection />
    </div>
  )
}
