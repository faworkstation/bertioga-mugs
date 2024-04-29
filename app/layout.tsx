import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { CartContextProvider } from "@/components/CartContext";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canecas Bertioga",
  description: "Canecas Personalizadas que relembram seus melhores momentos em bertioga",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="pt-BR">
        <body className={inter.className}>
          <CartContextProvider>
            <Header />
            {children}
          </CartContextProvider>
        </body>
      </html>
    </SessionProvider>
  );
};