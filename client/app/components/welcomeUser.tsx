'use client'

import { useEffect, useState } from "react";

const WelcomeUser = () => {
  const [username, setUsername] = useState("");

  // Function to fetch user information from local storage token
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // If your backend provides a way to get user details via token, call it here
        const response = await fetch("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.username); // Assuming the API returns `{ username: "John" }`
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <span className="text-gray-900 font-semibold">Hi, {username}</span>
  );
};

export default WelcomeUser;
