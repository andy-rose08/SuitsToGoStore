import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suits To Go",
  description: "Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${font.className} bg-white dark:bg-[#0D1A26] dark:text-white text-[#252440]`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider />
            <ModalProvider />
            { userId && <Navbar/>}
            {children}
            { userId && <Footer/>}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
