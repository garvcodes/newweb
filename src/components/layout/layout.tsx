import Head from "next/head";
import { cn } from "../../utils/utils";
import { fontGrotesk } from "../../styles/fonts";
import { Header } from "./header";
import { Footer } from "./footer";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta name="description" content="Garv Goswami personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={cn(
          " -z-20 min-h-screen overflow-hidden scroll-smooth bg-background text-foreground",
          // fontGrotesk.variable
          fontGrotesk.className
        )}
      >
        <Header />
        <div className="relative z-0">{children}</div>
        <Footer />
      </main>
    </>
  );
}
