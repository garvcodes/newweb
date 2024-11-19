import kanbanImage from "~/project-screenshots/kanban-desk.png";
import spaceImage from "~/project-screenshots/space-tourism.png";
import passwordGenImage from "~/project-screenshots/password-generator.png";
import inspirationalImg from "~/project-screenshots/inspirational-p.png";
import trashtotreasure from "~/project-screenshots/trashtotreasure.jpg";
import leedbudImg from "~/project-screenshots/leedbud.jpg";
import scrapbookImg from "~/project-screenshots/scrapbookImg.jpg";
import cybercapImg from "~/project-screenshots/cybercap.png";
import bluteImg from "~/project-screenshots/blute.png";
import { type ProjectData } from "@/components/main-page-blocks/projects/projects-block";

export const projectsData: ProjectData[] = [
  {
    title: "Scrapbook",
    tags: ["React", "Node.js", "Next.js", "CSS Modules"],
    links: {
      projectInfo: "/scrapbook",
      livePreview: "https://devpost.com/software/scrapbook-5h0f4v",
      github:
        "https://devpost.com/software/scrapbook-5h0f4v",
    },
    image: scrapbookImg,
  },
  {
    title: "LEED Bud",
    tags: ["React", "TypeScript", "OpenAI"],
    links: {
      projectInfo: "/leed-bud",
      livePreview: "https://devpost.com/software/leed-bud",
      github: "https://devpost.com/software/leed-bud",
    },
    image: leedbudImg,
  },

  {
    title: "TrashToTreasure - Sustainable Showcase",
    tags: ["React", "JavaScript", "CSS Modules", "Next.js", "MongoDB", "Express.JS"],
    links: {
      projectInfo: "/trash-to-treasure",
      livePreview: "https://devpost.com/software/trashtotreasure-sustainable-showcase",
      github: "https://devpost.com/software/trashtotreasure-sustainable-showcase",
    },
    image: trashtotreasure,
  },
];

export const tagsList = projectsData
  .map((project) => project.tags)
  .flat()
  .reduce((acc, tag) => {
    if (!acc.includes(tag)) {
      acc.push(tag);
    }
    return acc;
  }, [] as string[]);

export const tagsWithCount = projectsData
  .map((project) => project.tags)
  .reduce((acc, tag) => {
    tag.forEach((tag) => {
      if (acc[tag]) {
        acc[tag] += 1;
      } else {
        acc[tag] = 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);
