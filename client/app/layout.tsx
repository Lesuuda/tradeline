// app/layout.tsx

import { CartProvider } from '../app/cart/cartContext';  // Adjust the path as necessary
import './globals.css'; // Your global styles

import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
