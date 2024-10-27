'use client'

import { CartProvider } from '../app/cart/cartContext';
import HeaderIcons from './components/headers'; // Corrected import path for HeaderIcons
import './globals.css'; // Global styles
import { ReactNode } from 'react';

// Importing fonts from Google Fonts via next/font/google
import { Inter, Roboto_Mono, Roboto_Serif, DynaPuff, Pacifico, Rowdies, Urbanist } from 'next/font/google';

// Initializing fonts with CSS variable names
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

const roboto_serif = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto-serif',
  display: 'swap',
});

const dyna_puff = DynaPuff({
  subsets: ['latin'],
  variable: '--font-dyna-puff',
  display: 'swap',
  style: ['normal'],
  weight: '400',
});

const pacifico = Pacifico({
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
  style: ['normal'],
  weight: '400',
});

const rowdies = Rowdies({
  subsets: ['latin'],
  variable: '--font-rowdies',
  display: 'swap',
  style: ['normal'],
  weight: '300',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
  style: ['normal'],
  weight: '100',
});

// Defining the RootLayout component with CartProvider and font styling
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable} ${roboto_serif.variable} ${dyna_puff.variable} ${pacifico.variable} ${rowdies.variable} ${urbanist.variable}`}>
      <body>
        <CartProvider>
        
          <div>{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
