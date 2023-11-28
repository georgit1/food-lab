import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ToasterProvider } from '@/components/providers/ToasterProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { CalculatorProvider } from '@/context/CalculatorContext';
import { MealProvider } from '@/context/MealContext';
import { WeightProvider } from '@/context/WeightContext';
// import { RouteChangeListener } from '@/utils/routeChangeListener';

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
            <WeightProvider>
              <body className={inter.className}>
                {/* <RouteChangeListener /> */}
                <ToasterProvider />
                <ModalProvider />
                {children}
              </body>
            </WeightProvider>
          </MealProvider>
        </CalculatorProvider>
      </AuthProvider>
    </html>
  );
}
