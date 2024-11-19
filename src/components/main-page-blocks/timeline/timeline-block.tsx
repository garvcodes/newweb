import { Icons } from "@/components/icons";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image, { type StaticImageData } from "next/image";
import wavesPattern from "~/pattern-waves.svg";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { getTechnologyLogo } from "@/data/tags-logo-matcher";

const timelineElements = [
  {
    title: "Software Development Engineering Intern",
    subtitle: "Amazon, Sunnyvale, CA",
    date: "May 2024",
    icon: <Icons.work />,
    bulletPoints: [
      "Created Integration and Load Testing CI/CD frameworks for new FireTV Ad Stack plugins, using Java to write tests on temporary Lambda compute.",
      "Developed a validation pipeline for FireTV Ads Plugins to add packages to FireTV’s Setu, Amazon’s internal tool for ad customization. Monitored CPU, memory, and latency metrics during plugin integration testing.",
      "Implemented a Funnel View to visualize request and response loss across the ad stack, aiding engineers in identifying problem areas.",
    ],
    technologies: ["Java", "System Design", "AWS", "Testing"],
  },
  {
    title: "Full-Stack Development Intern",
    subtitle: "Cair Health (YC23), San Francisco, CA",
    date: "January 2024 - May 2024",
    icon: <Icons.work />,
    bulletPoints: [
      "Developed and deployed a FHIR server for secure patient data storage, ensuring compliance with HIPAA and interoperability with hospital EHR systems.",
      "Led the development of a front-end interface for a RAG model used in hospital billing offices, enhancing the UX with React, TailwindCSS, and Chart.js.",
    ],
    technologies: [
      "JavaScript",
      "Python",
      "C++",
      "AWS S3",
      "React",
      "TailwindCSS",
      "Chart.js",
    ],
  },
  {
    title: "Research Intern",
    subtitle: "UCSF Medical AI Initiative, San Francisco, CA",
    date: "August 2023 - February 2024",
    icon: <Icons.work />,
    bulletPoints: [
      "Implemented an IVR system using Amazon Connect, AWS Lex, and OpenAI API to create an AI phone agent for patient pre-consultations.",
      "Optimized patient journeys by collaborating with neurologists and analyzing consultation responses, focusing on head injuries.",
    ],
    technologies: ["AWS Lex", "Azure OpenAI API", "Prompt Engineering"],
  },
  {
    title: "Student Researcher",
    subtitle: "Innovative Genomics Institute, Berkeley, CA",
    date: "October 2024 - Present",
    icon: <Icons.work />,
    bulletPoints: [
      "Utilized advanced protein prediction models like AlphaFold and Raygun to minimize protein candidates.",
      "Conducted experiments in a wet lab to test functionality and stability of designed proteins.",
    ],
    technologies: [
      "Protein Prediction Models",
      "AlphaFold",
      "BindCraft",
      "Raygun",
      "Wet Lab Testing",
    ],
  },
  {
    title: "B.S. in Computer Science and Molecular Cell Biology",
    subtitle: "University of California, Berkeley",
    date: "August 2022 – May 2026 (Expected)",
    icon: <Icons.education />,
    bulletPoints: [
      "Relevant Coursework: Structure of Computer Programming, Data Structures, Organic Chemistry, Discrete Mathematics/Probability Theory, Integrated-Circuit Devices, Optimization Models, Natural Language Processing, Efficient Algorithms and Intractable Problems, Computer Architecture.",
      "Student Organizations: Medical Technology at Berkeley, Disabled Students Program, Yoga, Soccer.",
    ],
  },
];

export function TimelineBlock() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setAnimated(false);
    } else {
      setAnimated(true);
    }
  }, [isMobile, animated]);

  return (
    <div className="relative flex flex-col gap-10">
      <h2 className="responsive-heading-xl">Timeline</h2>
      <Image
        src={wavesPattern as StaticImageData}
        alt="abstract pattern dots"
        className="absolute -left-96 top-32 -z-10 w-full  opacity-10"
      />
      <VerticalTimeline
        animate={animated}
        layout="1-column-left"
        lineColor="hsl(var(--light-green))"
      >
        {timelineElements.map((element, index) => (
          <VerticalTimelineElement
            visible={element.visible ?? false}
            key={index}
            contentStyle={{
              background: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
              boxShadow: "none",
            }}
            contentArrowStyle={{ borderRight: "7px solid  hsl(var(--muted))" }}
            date={element.date}
            iconStyle={{
              boxShadow: "hsl(var(--light-green)) 0px 0px 0px 3px ",
              background: "hsl(var(--background))",
            }}
            icon={element.icon}
          >
            <h3 className="mb-1 text-xl">{element.title}</h3>
            <h4 className="mb-5 italic">{element.subtitle}</h4>
            {element.bulletPoints && (
              <ul>
                {element.bulletPoints.map((bulletPoint, index) => (
                  <li className="list-inside list-disc" key={index}>
                    {bulletPoint}
                  </li>
                ))}
              </ul>
            )}
            {element.technologies && element.technologies.length > 0 && (
              <>
                <h4 className="mb-2 mt-5 text-lg font-bold">
                  Main technologies:
                </h4>
                <ul className="flex flex-wrap gap-3">
                  {element.technologies.map((technology, index) => (
                    <li
                      className="flex items-center gap-1 whitespace-nowrap rounded-full border border-foreground px-3"
                      key={index}
                    >
                      {getTechnologyLogo(technology)} {technology}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
