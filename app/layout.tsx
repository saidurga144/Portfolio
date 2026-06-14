import type { Metadata } from "next";
import { JetBrains_Mono, Montserrat, Poppins, Space_Grotesk, DM_Sans, Inter_Tight, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StyledComponentsRegistry from "@/lib/styled-components-registry";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sai Kumar Dungala - Portfolio",
  description: "Computer Science Engineering student specializing in cybersecurity and secure software development with hands-on experience in AI/deep learning, malware analysis, network security, and full-stack web application security.",
  keywords: ["Cybersecurity", "Software Development", "Web Security", "AI", "Machine Learning", "Network Security"],
  authors: [{ name: "Sai Kumar Dungala" }],
  icons: {
    icon: "/saikumar.png",
  },
  openGraph: {
    title: "Sai Kumar Dungala - Portfolio",
    description: "Cybersecurity Engineer | Secure Software Developer",
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
      <head>
        {/* Force dark theme on first visit — must be in <head> to run before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!localStorage.getItem('portfolio-theme')){localStorage.setItem('portfolio-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${jetbrainsMono.variable} ${montserrat.variable} ${poppins.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${interTight.variable} ${dancingScript.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
