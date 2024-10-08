import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider";
import { Theme } from "@/providers/ThemeProvider";
import { Sidebar } from "./components/Sidebar/Sidebar";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressContentEditableWarning>
        <body className={manrope.className}>
          <Theme>
            <div className="flex">
              <Sidebar />
              {children}
            </div>
          </Theme>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
