import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/blog/container";
import PostBody from "@/components/blog/post-body";
import PostHeader from "@/components/blog/post-header";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "@/components/blog/post-title";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import Cas9ScrollStory from "@/components/blog/cas9-scroll-story";

type Props = {
  post: PostType & {
    contentBeforeAnimation?: string;
    contentAfterAnimation?: string;
  };
  morePosts: PostType[];
  preview?: boolean;
};

const cas9AnimationMarker = "<!-- cas9-animation -->";

export default function Post({ post }: Props) {
  const router = useRouter();
  const isCas9Walkthrough = post.slug === "how-crispr-spycas9-works";
  const hasCas9PostSections = Boolean(
    post.contentBeforeAnimation && post.contentAfterAnimation
  );

  const title = `${post.title} | Garv Goswami`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <article className="mb-32 mt-16">
          <Head>
            <title>{title}</title>
            {post.ogImage?.url && (
              <meta property="og:image" content={post.ogImage.url} />
            )}
          </Head>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            paperLink={post.paperLink}
          />
          {hasCas9PostSections ? (
            <>
              <PostBody content={post.contentBeforeAnimation ?? ""} />
              <Cas9ScrollStory />
              <PostBody content={post.contentAfterAnimation ?? ""} />
            </>
          ) : (
            <>
              {isCas9Walkthrough && <Cas9ScrollStory />}
              <PostBody content={post.content} />
            </>
          )}
        </article>
      )}
    </Container>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
    "paperLink",
  ]);
  const rawContent = post.content || "";
  const splitIndex =
    post.slug === "how-crispr-spycas9-works"
      ? rawContent.indexOf(cas9AnimationMarker)
      : -1;
  let contentBeforeAnimation: string | undefined;
  let contentAfterAnimation: string | undefined;

  if (splitIndex >= 0) {
    [contentBeforeAnimation, contentAfterAnimation] = await Promise.all([
      markdownToHtml(rawContent.slice(0, splitIndex), post.slug),
      markdownToHtml(
        rawContent.slice(splitIndex + cas9AnimationMarker.length),
        post.slug
      ),
    ]);
  }

  const content =
    contentBeforeAnimation && contentAfterAnimation
      ? `${contentBeforeAnimation}${contentAfterAnimation}`
      : await markdownToHtml(rawContent, post.slug);

  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);
  const morePosts = allPosts.filter((p) => p.slug !== params.slug);

  return {
    props: {
      morePosts,
      post: {
        ...post,
        content,
        ...(contentBeforeAnimation && contentAfterAnimation
          ? { contentBeforeAnimation, contentAfterAnimation }
          : {}),
      },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
