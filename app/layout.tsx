import { SessionProvider } from "@/client/contexts/SessionContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
