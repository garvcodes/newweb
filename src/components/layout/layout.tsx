import Head from "next/head";
import { cn } from "../../utils/utils";
import { fontSerif, fontSans } from "../../styles/fonts";
import { Header } from "./header";
import { Footer } from "./footer";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Garv Goswami — researcher and engineer at the intersection of machine learning and the life sciences."
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main
        className={cn(
          "min-h-screen scroll-smooth bg-background font-sans text-foreground",
          fontSerif.variable,
          fontSans.variable
        )}
      >
        <Header />
        <div className="relative z-0">{children}</div>
        <Footer />
      </main>
    </>
  );
}
