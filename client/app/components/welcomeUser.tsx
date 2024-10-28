'use client';

import { useEffect, useState } from "react";
import { FiUser, FiChevronDown, FiLogOut } from "react-icons/fi";

const WelcomeUser = () => {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.username);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          localStorage.removeItem("token");
          setUsername("");
          window.location.href = "/login";
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="relative inline-block text-gray-900 font-semibold">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center cursor-pointer space-x-2 md:space-x-3"
      >
        <FiUser className="text-pink-500 text-2xl md:text-3xl" />
        <span className="text-sm md:text-base">Hi, {username}</span>
        <FiChevronDown
          className={`text-pink-500 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {dropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-32 md:w-40 bg-white rounded-md shadow-lg border border-gray-200 transition-opacity"
          style={{ zIndex: 1000 }}
        >
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 w-full space-x-2 md:space-x-3"
          >
            <FiLogOut className="text-pink-500 text-xl" />
            <span className="text-sm md:text-base">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeUser;
