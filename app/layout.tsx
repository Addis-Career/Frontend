"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "../components/layout/NavBar";
import { Provider } from "react-redux";
import store from "@/lib/store";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <NextUIProvider>
            <Provider store={store}>
              <NavBar />
              {children}
            </Provider>
          </NextUIProvider>
        </div>
      </body>
    </html>
  );
}
