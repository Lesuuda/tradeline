import WelcomeComponent from './welcome';
import Navbar from '../Navbar';

const WelcomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <WelcomeComponent />
      </div>
    </>
  );
};

export default WelcomePage;
