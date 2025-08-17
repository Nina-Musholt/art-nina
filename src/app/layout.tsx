import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";   // import your Header

export const metadata: Metadata = {
  title: "Art be Nina",
  description: "Gallery and artworks of Nina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />    {/* Header appears here */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}