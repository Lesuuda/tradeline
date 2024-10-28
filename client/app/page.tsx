// app/page.tsx
import Header from './welcome/header';
import Hero from './welcome/hero';
import Categories from './welcome/categories';
import FeaturedProducts from './welcome/featuredProducts';

const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
};

export default LandingPage;
