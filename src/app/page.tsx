// pages/index.tsx or app/page.tsx (depending on your Next.js version)
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DealSlider from './components/DealSlider'
import FoodCategorySection from './components/FoodCategorySection'
import FeaturedItems from './components/FeaturedItems'
import NewArrivals from './components/NewArrivals'
import KidsMenu from './components/KidsMenu'
import DessertsSection from './components/DessertSection'
import BeverageSection from './components/BeveragesSection'
import ScrollPopupCard from './components/ScrollPopupCard'
import SearchBar from './components/SearchBar'
import CartIcon from './components/CartIcon'


export default function Home() {
  return (
    <div style={{ paddingTop: '64px' }}> {/* Navbar ki height ke barabar padding */}
      <Navbar />
      <SearchBar />
      
      <DealSlider />
      <ScrollPopupCard />
      {/* baaki content */}
      <h2
        className="text-3xl font-bold text-center text-black tracking-wide drop-shadow-lg mt-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Explore Our Categories
      </h2>
      <FoodCategorySection />
      <h2
        className="text-3xl font-bold text-center text-black tracking-wide drop-shadow-lg mt-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Featured Items
      </h2>
      <FeaturedItems />
      <NewArrivals />
      <KidsMenu />
      <DessertsSection />
      <BeverageSection />
      <Footer />
    </div>
  )
}
