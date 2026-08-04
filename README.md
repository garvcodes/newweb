# Personal Portfolio Website

![personal website](https://github.com/aleksandr-efimenko/personal-portfolio-website/assets/10911832/aaef27c0-6af4-4b24-a0fd-658c60a190cf)

Welcome to my personal portfolio website built with Next.js, React, Tailwind CSS, shadcn/ui, Framer Motion, and React hook form with Zod. This website showcases my career and education journey, featuring a sleek design and interactive components.

## Technologies Used

- **Next.js**
- **React**
- **Tailwind CSS**
- **shadcn/ui**
- **Framer Motion**
- **react-hook-form with zod**
- **react-vertical-timeline-component**:
- **Nodemailer**

## Features

- **Responsive Design**: The website is designed to be fully responsive, ensuring a seamless experience across various devices.
- **Interactive Animations**: Framer Motion is used to add interactive animations, providing a dynamic and engaging user experience.
- **Timeline Display**: The career and education sections are presented using the react-vertical-timeline-component, allowing for a chronological display of milestones.
- **Contact Form**: The contact form, powered by react-hook-form and zod, enables users to reach out, and messages are sent using Nodemailer and SendGrid.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository.
2. Install dependencies.
3. Configure Nodemailer and SendGrid:
   - Set up your Nodemailer and SendGrid accounts.
   - Update the email credentials in the code to enable sending emails.
4. Run the development server.

## Writing Blog Posts

Create one directory per post under `_posts`. Each post directory must contain
exactly one Markdown file and may contain a post-specific `pics` directory:

```text
_posts/
  example-post/
    example-post.md
    pics/
      diagram.png
```

The Markdown filename becomes the public blog slug. Reference an image from the
post with `![Diagram](pics/diagram.png)`. Add `draft: true` to the frontmatter to
keep an unfinished post out of the blog index and generated routes.

For reading notes about a paper, add `paperLink` to the frontmatter. The post
title will become an accent-colored link to the paper:

```yaml
paperLink: https://arxiv.org/abs/example
```

Use an image title to add an automatically numbered caption:

```md
![Accessible description](pics/diagram.png "Caption text")
```

Wrap an editorial aside in tangent markers:

```md
:::tangent

## A related idea

Tangent content goes here.

:::
```

Follow a tangent with a short return-to-topic summary:

```md
:::where-we-left-off

The main thread was...

:::
```

Structure paper explanations with reusable research blocks:

```md
:::research-question

The question being tested.

:::

:::example-data

#### Example dataset

| Input   | Label |
| ------- | ----- |
| Example | True  |

:::

:::key-result

### 71–83%

What the result measures.

:::

:::probability-bars

| Candidate | Probability |
| --------- | ----------: |
| Paris     |         95% |

:::
```

Use a compact, horizontally scrollable table for dense model results:

```md
:::results-table

#### Table 1 · Model name

| Model | Topic | Average |
| :--- | ---: | ---: |
| layer-1 | 0.7500 | **0.7500** |

*A short description of what the table measures.*

:::
```

Use inline operations for emphasis:

```md
/bold{Important text}
\highlight{Highlighted text}
/positive{Positive value}
/negative{Negative value}
/mixed{Ambiguous value}
```

Use a direct quotation block with an optional attribution line:

```md
::direct-quote

Quoted text goes here.

— Author or source

::
```

## Acknowledgements

The idea of the design for this website was inspired by [Frontend Mentor](https://www.frontendmentor.io/challenges/singlepage-developer-portfolio-bBVj2ZPi-x).

Thank you for exploring my portfolio! I hope you enjoy the journey through my career and educational experiences. If you have any questions or feedback, feel free to get in touch.
