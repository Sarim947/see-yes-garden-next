import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "See Yes Garden | Outdoor Garden Structures",
  description:
    "See Yes Garden supplies pergolas, garden beds, greenhouses, sheds, planters, and custom outdoor structure solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
