import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/layout/Layout";
import GlobalStyle from "@/styles/global";
import Providers from "@/redux/provider";
import { Web3AuthProvider } from "@/contexts/Web3AuthContext";
import ClientProvider from "@/contexts/ClientContext";
import "../../polyfills";

// // Register the "en" locale.
// TimeAgo.addDefaultLocale(en);

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
            <ClientProvider>
              <Layout>{children}</Layout>
            </ClientProvider>
          </Web3AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
