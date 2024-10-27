"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return <p>You have no orders.</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-violet-900 mb-8">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  products: {
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  shippingAddress: {
    fullName: string;
    email: string;
    phoneNumber: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  status: string;
}

const OrderCard = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Order #{order._id}</h3>
          <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-600">Total: ${order.totalPrice.toFixed(2)}</p>
        </div>
        <button
          onClick={toggleExpand}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          {expanded ? "Hide Details" : "View Details"}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
          <h4 className="text-lg font-medium text-indigo-500 text-semibold">Products</h4>
          {order.products.map((product, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
            >
              <div>
                <p className="text-gray-800 font-semibold">{product.product.name}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
              </div>
              <p className="text-gray-800">${(product.product.price * product.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div className="mt-6 space-y-2 text-gray-800">
            <p className="font-semibold">Shipping Information:</p>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.email}</p>
            <p>{order.shippingAddress.phoneNumber}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}, {order.shippingAddress.zipCode}
            </p>
          </div>

          <p className="mt-4 font-semibold text-gray-600">Status: {order.status}</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
