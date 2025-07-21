import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Banner from "@/components/Banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex Assistant",
  description: "A Walkthrough assistant for your game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className=" flex flex-col justify-center items-center bg-[url('/assets/images/bg-pattern.jpg')] bg-cover">
          <Banner />
          <section className=" w-2/3 bg-white p-8">{children}</section>
        </main>
      </body>
    </html>
  );
}
