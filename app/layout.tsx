import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { MealProvider } from "@/context/MealContext";
import { WeightProvider } from "@/context/WeightContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CalculatorProvider } from "@/context/CalculatorContext";

import AuthProvider from "@/components/providers/AuthProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { ToasterProvider } from "@/components/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodLab",
  description: "Analyze your food down the smallest detail",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <CalculatorProvider>
          <MealProvider>
            <WeightProvider>
              <FavoritesProvider>
                <body className={inter.className}>
                  <ToasterProvider />
                  <ModalProvider />
                  {children}
                </body>
              </FavoritesProvider>
            </WeightProvider>
          </MealProvider>
        </CalculatorProvider>
      </AuthProvider>
    </html>
  );
}
