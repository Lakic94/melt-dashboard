import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const apkGaleria = localFont({
  src: "../../public/fonts/ApkGaleria.ttf",
  variable: "--font-apk-galeria",
  display: "swap",
});

const gtEra = localFont({
  src: [
    { path: "../../public/fonts/GT-Era-Text-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/GT-Era-Text-Regular-Oblique.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/GT-Era-Text-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/GT-Era-Text-Medium-Oblique.ttf", weight: "500", style: "italic" },
  ],
  variable: "--font-gt-era",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MELT Dashboard",
  description: "Your MELT subscription dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${apkGaleria.className} ${apkGaleria.variable} ${gtEra.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
