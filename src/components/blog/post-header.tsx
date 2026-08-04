import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
  paperLink?: string;
};

const PostHeader = ({ title, coverImage, date, paperLink }: Props) => {
  return (
    <>
      <PostTitle>
        {paperLink ? (
          <a
            href={paperLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-[hsl(var(--accent-color))] underline decoration-[hsl(var(--accent-color)/0.45)] decoration-2 underline-offset-[0.16em] transition-colors hover:decoration-[hsl(var(--accent-color))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-color))] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </PostTitle>
      {coverImage && (
        <div className="mb-8 max-w-xl sm:mx-0 md:mb-16">
          <CoverImage title={title} src={coverImage} />
        </div>
      )}
      <div className="mx-auto">
        <div className="mb-6 text-lg opacity-40">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
