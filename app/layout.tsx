import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowMinds — AI-Powered Digital Solutions",
  description:
    "FlowMinds delivers cutting-edge AI web development, social media automation, Meta integrations, and no-code/code automation solutions for modern businesses.",
  keywords: [
    "AI web development",
    "social media automation",
    "Meta solutions",
    "WhatsApp Business API",
    "no-code automation",
    "digital agency",
  ],
  metadataBase: new URL("https://flowminds.tech"),
  openGraph: {
    title: "FlowMinds — AI-Powered Digital Solutions",
    description: "We build smart digital solutions that work while you sleep.",
    type: "website",
    url: "https://flowminds.tech",
    siteName: "FlowMinds",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowMinds — AI-Powered Digital Solutions",
    description: "We build smart digital solutions that work while you sleep.",
    site: "@flowmindstech",
  },
  alternates: {
    canonical: "https://flowminds.tech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
