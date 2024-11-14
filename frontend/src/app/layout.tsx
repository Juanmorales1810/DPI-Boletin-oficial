
import AppProvider from "@/components/provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Ubuntu } from 'next/font/google'
import type { Metadata } from "next";

import "@/style/globals.css"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
});


export const metadata: Metadata = {
  title: "Boletín Oficial",
  description: "Boletín Oficial de San Juan Gobierno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${ubuntu.variable} font-[family-name:var(--font-ubuntu)] antialiased bg-gris20`}
      >
        <AppProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-256px)]">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
