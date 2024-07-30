import type { Metadata } from "next";
import { Inter, Sawarabi_Gothic } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable:'--font-inter' });
const sawarabiGothic = Sawarabi_Gothic({
  subsets: ["latin"],
  weight:['400'],
  variable:'--font-sawarabi-gothic'
});

export const metadata: Metadata = {
  title: "Banking",
  description: "Modern Finance Management System",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sawarabiGothic.variable}`}>{children}</body>
    </html>
  );
}
