import Container from "@/components/blog/container";
import MoreStories from "@/components/blog/more-stories";
import HeroPost from "@/components/blog/hero-post";
import Intro from "@/components/blog/intro";
import ContributionGraph from "@/components/blog/contribution-graph";
import { getAllPosts } from "../../lib/api";
import Head from "next/head";
import type Post from "../../interfaces/post";

type Props = {
  allPosts: Post[];
  postDates: string[];
};

export default function Index({ allPosts, postDates }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Head>
        <title>{`Blog — Garv Goswami`}</title>
      </Head>
      <Container>
        <Intro />
        <ContributionGraph postDates={postDates} />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  const postDates = allPosts
    .map((p) => p.date as string)
    .filter(Boolean);

  return {
    props: { allPosts, postDates },
  };
};
