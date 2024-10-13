import { useCart } from './cartContext';
import { useRouter } from 'next/router';

const CartIcon = () => {
  const { cart } = useCart() ?? { cart: [] };
  const router = useRouter();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="relative">
      <button onClick={() => router.push('/cart')}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h2l1.68 12.39A4 4 0 0010.6 19h6.79a4 4 0 003.92-3.39L21 8H7"></path>
        </svg>
      </button>
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 rounded-full bg-red-600 text-white p-1 text-xs">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
