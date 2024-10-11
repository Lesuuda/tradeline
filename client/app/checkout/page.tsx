import CheckoutComponent from './checkout';
import Navbar from '../Navbar';

const CheckoutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <CheckoutComponent />
      </div>
    </>
  );
};

export default CheckoutPage;
