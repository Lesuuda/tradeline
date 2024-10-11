import HomeComponent from './home';
import Navbar from '../Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <HomeComponent />
      </div>
    </>
  );
};

export default HomePage;
