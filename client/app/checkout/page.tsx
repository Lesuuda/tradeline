"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Kenya");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  const router = useRouter();

  interface CartItem {
    product: {
      _id: string;
      name: string;
      price: number;
      images: string;
    };
    quantity: number;
  }

  interface Cart {
    items: CartItem[];
  }

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      setCart(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Ensure the cart and shipping information are valid
      if (!cart || cart.items.length === 0) {
        throw new Error("Your cart is empty");
      }
      if (!fullName || !email || !phoneNumber || !country || !city || !state || !zipCode) {
        throw new Error("Please fill out all shipping information fields");
      }

      const orderData = {
        products: cart.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        totalPrice: cart.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
        shippingAddress: {
          fullName,
          email,
          phoneNumber,
          country,
          city,
          state,
          zipCode
        },
        paymentMethod: 'cash-on-delivery',  // Example payment method
        shippingMethod,
      };

      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      // After placing the order successfully, redirect to an order confirmation page or home
      alert("Order placed successfully!");
      router.push("/products");
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start">
          {/* Left Side: Shipping Form */}
          <div className="w-full md:w-2/3 mr-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Shipping Information</h3>
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setShippingMethod('delivery')}
                  className={`px-4 py-2 border rounded-lg text-gray-900 ${
                    shippingMethod === 'delivery' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setShippingMethod('pickup')}
                  className={`px-4 py-2 border rounded-lg text-gray-900 ${
                    shippingMethod === 'pickup' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  Pick Up
                </button>
              </div>

              {/* Shipping form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-900 text-gray-900"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-900 text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-900 text-gray-900"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Kenya</option>
                  <option>Uganda</option>
                  <option>Tanzania</option>
                  {/* Add more countries */}
                </select>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-900 text-gray-900"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-900 text-gray-900"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-900 text-gray-900"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4 text-gray-900">
              <input type="checkbox" className="mr-2" />{' '}
              <span>I have read and agree to the Terms and Conditions</span>
            </div>
          </div>

          {/* Right Side: Cart Summary */}
          <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review your cart</h3>
            <div className="space-y-4 text-gray-900">
              {cart.items.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <span>{item.product.name}</span>
                  <span>${item.product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Discount code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-900 text-gray-900"
              />
            </div>

            <div className="mt-6 space-y-2 text-gray-900">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  $
                  {cart.items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span> {/* Static for now */}
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>$0.00</span> {/* Static for now */}
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  $
                  {(cart.items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                  ) + 5).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-purple-500 text-white py-3 rounded-lg font-semibold text-gray-900"
            >
              Place Order
            </button>

            <div className="mt-4 text-sm text-center text-gray-600">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
