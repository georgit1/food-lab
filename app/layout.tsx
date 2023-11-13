import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ToasterProvider } from '@/components/providers/ToasterProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { CalculatorProvider } from '@/context/calculatorContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodLab',
  description: 'Analyze your food down the smallest detail',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <AuthProvider>
        <CalculatorProvider>
          <body className={inter.className}>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </body>
        </CalculatorProvider>
      </AuthProvider>
    </html>
  );
}

// TODO
// update context on add or delete food on database
// change preferences to only one string
// signal user to add profile before go on
