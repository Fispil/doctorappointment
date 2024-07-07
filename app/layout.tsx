import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";


const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doctor appointment app",
  description: "Doctor appointment app with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${raleway.className} flex flex-col min-h-[80vh]`}>
        <main className="md:px-20 flex-1">
          <Header />
          {children}
          <Toaster />
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
