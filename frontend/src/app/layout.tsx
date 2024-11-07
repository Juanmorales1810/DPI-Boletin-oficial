import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Ubuntu } from 'next/font/google'

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
        className={`${ubuntu.variable}  antialiased bg-gris20`}
      >
        <Navbar />
        <main className="min-h-[calc(100vh-304px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
