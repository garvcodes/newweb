import { motion } from "framer-motion";
import { StyledLink } from "../../ui/styled-link";

const pageData = {
  title: "Hey! My name's",
  subtitle: "",
  subtitleHighlight: "Garv Goswami",
  subtitleEnd: ".",
  description:
    "I'm a student researcher and software engineer with expertise in full-stack development and bioinformatics, hoping to innovate at the intersection of technology and the life sciences.",
  links: [

  ],
};

const animationVariants = {
  initial: {
    opacity: 0,
    filter: "blur(50px)",
    scale: 1.5,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
};

export function HeroDescription() {
  return (
    <>
      <div className="mt-96 flex h-full flex-col gap-5 pt-16 md:mt-0 lg:gap-10">
        <div>
          <motion.h1
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            transition={{ duration: 0.5 }}
            className="responsive-heading-xl text-center md:text-left"
          >
            {pageData.title}
          </motion.h1>
          <motion.h2
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="responsive-heading-xl text-center md:text-left"
          >
            {pageData.subtitle}
            <span
              className="border-b-[0.375rem] border-light-green transition-all
        duration-200 hover:border-b-[0.75rem]"
            >
              {pageData.subtitleHighlight}
            </span>
            {pageData.subtitleEnd}
          </motion.h2>
        </div>
        <motion.p
          initial={animationVariants.initial}
          animate={animationVariants.animate}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-full text-center text-body md:max-w-md md:text-left"
        >
          {pageData.description}
        </motion.p>
      </div>
      <motion.div
        initial={{
          x: "-100vw",
        }}
        animate={{
          x: 0,
        }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="flex flex-col items-center gap-3 md:items-start"
      >
    

        <p className="flex w-fit gap-5 text-base uppercase tracking-widest text-foreground md:text-body lg:text-xl">
          {"Download CV:"}
          <StyledLink data-cy={"cvPdf"} href="/Garv_Goswami_Resume (26).pdf">
            {".PDF"}
          </StyledLink>
        </p>
      </motion.div>
    </>
  );
}
