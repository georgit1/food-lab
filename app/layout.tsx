import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ToasterProvider } from '@/components/providers/ToasterProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { CalculatorProvider } from '@/context/calculatorContext';
import { MealProvider } from '@/context/mealContext';

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
          <MealProvider>
            <body className={inter.className}>
              <ToasterProvider />
              <ModalProvider />
              {children}
            </body>
          </MealProvider>
        </CalculatorProvider>
      </AuthProvider>
    </html>
  );
}
