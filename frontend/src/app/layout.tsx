
import AppProvider from "@/components/provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Ubuntu } from 'next/font/google'
import type { Metadata } from "next";
import { Toaster } from "sonner";

import "@/style/globals.css"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Boletín Oficial",
    template: `%s - Boletín Oficial`,
  },
  description: "Boletín Oficial de San Juan Gobierno",
  keywords: ["Adopción", "Mascotas", "Perros", "Gatos", "Adopta", "Adopta una mascota", "Adopta un perro", "Adopta un gato", "Adopta un animal", "Adopta un amigo", "Adopta un compañero", "Adopta un compañero", "Cuidados", "Veranarías Cercanas", "Cuidados animales"],
  icons: {
    icon: "/logo-san-juan.svg",
    apple: "/logo-san-juan.svg",
  },
  manifest: "/manifest.json",
  creator: "Juan Morales",
  openGraph: {
    title: "Boletín Oficial",
    description: "Boletín Oficial de San Juan Gobierno",
    url: 'https://pichirika.com',
    siteName: 'PichiriKa',
    images: [
      {
        url: 'https://pichirika.com/Metadata.jpg', // Must be an absolute URL
        width: 1200,
        height: 630,
      },

    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Boletín Oficial",
    description: "Boletín Oficial de San Juan Gobierno",
    siteId: '1467726470533754880',
    creator: '@Juanmora1810',
    creatorId: '1467726470533754880',
    images: ['https://pichirika.com/Metadata.jpg'], // Must be an absolute URL
  },
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
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
