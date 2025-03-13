import type { Metadata } from "next";
import "./globals.scss";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Woozint",
  description: "Have you been pawned ?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Logspace" content="logspace"></meta>
        <link
          rel="icon"
          type="image/svg"
          sizes="128x128"
          href="/woozint_logo.svg"
        ></link>
      </head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className="h-[100vh]">{children}</body>
      </ThemeProvider>
    </html>
  );
}
