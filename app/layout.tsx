import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers/theme-provider";
import { ConvexClientPrivider } from "@/components/Providers/convex-provider";
import { ModalProvider } from "@/components/Providers/modal-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ConvexClientPrivider>
                    <ThemeProvider
                        attribute={"class"}
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                        storageKey="jotion-theme-2"
                    >
                        <Toaster position="bottom-center" />
                        <ModalProvider />
                        {children}
                    </ThemeProvider>
                </ConvexClientPrivider>
            </body>
        </html>
    );
}
