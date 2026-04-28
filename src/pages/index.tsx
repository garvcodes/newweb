import Head from "next/head";
import { siteConfig } from "@/config/site";
import { HeroBlock } from "@/components/main-page-blocks/hero/hero-block";
import { ExperienceBlock } from "@/components/main-page-blocks/experience/experience-block";
import { ResearchBlock } from "@/components/main-page-blocks/research/research-block";
import { HackathonsBlock } from "@/components/main-page-blocks/hackathons/hackathons-block";
import { ContactBlock } from "@/components/main-page-blocks/contact/contact-block";

const googleAdsClientId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID;

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="google-adsense-account" content={googleAdsClientId}></meta>
      </Head>
      <HeroBlock />
      <hr className="container border-rule" />
      <ExperienceBlock />
      <hr className="container border-rule" />
      <ResearchBlock />
      <hr className="container border-rule" />
      <HackathonsBlock />
      <hr className="container border-rule" />
      <ContactBlock />
    </>
  );
}
