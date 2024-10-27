"use client";
import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa"; // Import orders icon
import Link from "next/link";

const OrdersIcon = ({ size = 30 }) => { // Allow icon size customization
  const [ordersCount, setOrdersCount] = useState(0);

  // Fetch the number of orders
  const fetchOrdersCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const ordersData = await response.json();
        const totalOrders = ordersData.orders.length; // Assume each order is a unique item
        setOrdersCount(totalOrders);
      } else {
        console.error("Failed to fetch orders count");
      }
    } catch (error) {
      console.error("Error fetching orders count:", error);
    }
  };

  useEffect(() => {
    fetchOrdersCount();
  }, []);

  return (
    <Link href="/orders" className="relative">
      <FaClipboardList size={size} color="#ff69b4" /> {/* Pink orders icon */}
      {ordersCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {ordersCount}
        </span>
      )}
    </Link>
  );
};

export default OrdersIcon;
