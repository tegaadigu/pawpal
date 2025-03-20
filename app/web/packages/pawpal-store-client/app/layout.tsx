import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "./Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pawpal Stores - Buy Organic Dog food",
  description: "Pawpal Stores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/logo-small.svg" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-black text-black dark:text-white`}
      >
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
          <Providers>
            <div className="bg-gray-50 min-h-screen">
              <Header />
              <div>
                <div className="mx-auto w-full max-w-pageWidth container mt-8">
                  {children}
                </div>
              </div>
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
