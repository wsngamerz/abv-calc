import { cn } from "@/lib/utils";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "ABV Calculator",
  description: "Calculate the ABV of your cocktail",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(openSans.className, "bg-[#fafcfe]")}>{children}</body>
    </html>
  );
}
