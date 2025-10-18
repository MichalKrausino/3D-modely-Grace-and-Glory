import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoSchedule AI",
  description: "Intelligent minimalist task planner",
};

"use client";

import { useEffect } from "react";
import { syncService } from "@/lib/sync";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    syncService.start();
    return () => {
      syncService.stop();
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="py-4 px-8 border-b">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              AutoSchedule AI
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Dashboard
              </Link>
              <Link href="/add-task" className="text-gray-600 hover:text-gray-800">
                Add Task
              </Link>
              <Link href="/stats" className="text-gray-600 hover:text-gray-800">
                Stats
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}