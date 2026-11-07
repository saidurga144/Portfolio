import type { Metadata } from "next";
import "./globals.css";
import { AccessibleMotion } from "@/components/motion-config";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Sai Kumar Dungala - Portfolio",
  description: "Portfolio of Sai Kumar Dungala, a Computer Science Engineering student focused on cybersecurity and software development.",
  keywords: ["Cybersecurity", "Software Development", "Web Security", "AI", "Machine Learning", "Network Security"],
  authors: [{ name: "Sai Kumar Dungala" }],
  icons: {
    icon: "/saikumar.png",
  },
  openGraph: {
    title: "Sai Kumar Dungala - Portfolio",
    description: "Computer Science Engineering student focused on cybersecurity and software development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <AccessibleMotion>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </AccessibleMotion>
      </body>
    </html>
  );
}
