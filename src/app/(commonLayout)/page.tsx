import Category from "./components/Category";
import { HeroSection } from "./components/HeroSection";
import Medicine from "./components/Medicine";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <Category />
      <Medicine />
    </div>
  )
}
