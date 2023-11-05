import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ToasterProvider } from '@/components/providers/ToasterProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';

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
      <body className={inter.className}>
        <AuthProvider>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
