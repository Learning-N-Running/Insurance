import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/layout/Layout";
import GlobalStyle from "@/styles/global";
import Providers from "@/redux/provider";
import { Web3AuthProvider } from "@/context/Web3AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insurance",
  description: "Safe Insurance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <Providers>
          <Web3AuthProvider>
            <Layout>{children}</Layout>
          </Web3AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
