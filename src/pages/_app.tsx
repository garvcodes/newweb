import { type AppType } from "next/app";
import "@/styles/globals.css";
import { RootLayout } from "@/components/layout/layout";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
      <Analytics />
    </>
  );
};

export default MyApp;
