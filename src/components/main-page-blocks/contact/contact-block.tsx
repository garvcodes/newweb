import { ContactForm } from "./contact-form";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import patternDots from "~/pattern-dots.svg";

const blockDescription = {
  title: "Contact Me",
  description:
    "I'd love to talk to you!",
  email: "garvgoswami@berkeley.edu",
};

export function ContactBlock() {
  return (
    <div
      className="container relative flex  flex-col justify-between 
    gap-16  md:flex-row md:gap-24 lg:gap-48"
      id="contact"
    >
      <Image
        src={patternDots as StaticImageData}
        alt="abstract pattern dots"
        className="absolute -left-16 z-10 opacity-20  "
        height={300}
      />

      <div className="relative z-10 flex flex-1 flex-col gap-4">
        <h2 className="responsive-heading-xl text-center md:text-left">
          {blockDescription.title}
        </h2>
        <p className="text-center text-body md:text-left">
          {blockDescription.description}
        </p>
        <Link
          href={`mailto:${blockDescription.email}`}
          className="text-center text-body text-foreground underline md:text-left"
        >
          {blockDescription.email}
        </Link>

        <p>Thank you to aleksandr-efimenko for this website template!</p>

      </div>
      <div className="flex-1">
        <ContactForm />
      </div>
    </div>
  );
}
