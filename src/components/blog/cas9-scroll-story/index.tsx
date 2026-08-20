import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const stages = [
  {
    eyebrow: "01 · Meet",
    title: "Meet SpyCas9",
    body: "SpyCas9 is a 1,368-amino-acid protein built around a central channel. Its REC domains inspect nucleic acids; HNH and RuvC provide two cutting centers; the PI region reads the PAM.",
    detail: "Recognition lobe + nuclease lobe + PAM reader",
    label:
      "SpyCas9 alone, with its six functional regions arranged around an empty central channel.",
  },
  {
    eyebrow: "02 · Load",
    title: "Load the single-guide RNA",
    body: "The orange sgRNA enters the central channel. Its folded scaffold is the handle Cas9 grips, while the exposed 20-nucleotide spacer carries the sequence that will interrogate DNA.",
    detail: "Scaffold = handle · spacer = programmable address",
    label:
      "An orange single-guide RNA entering SpyCas9 and settling into its central channel.",
  },
  {
    eyebrow: "03 · Approach",
    title: "Bring in the DNA duplex",
    body: "Double-stranded DNA now passes the loaded complex. The target and non-target strands remain paired at first; Cas9 can sample many such segments without opening them completely.",
    detail: "Loaded Cas9 meets intact double-stranded DNA",
    label:
      "A green double-stranded DNA molecule approaching the guide-loaded SpyCas9 complex.",
  },
  {
    eyebrow: "04 · Search",
    title: "Read the PAM first",
    body: "The complex samples DNA, but it does not unzip every sequence it meets. SpyCas9 first looks for an NGG protospacer-adjacent motif. R1333 and R1335 make the decisive contacts with its two guanines.",
    detail: "NGG is permission to inspect the neighboring DNA",
    label:
      "The Cas9 guide complex scanning double-stranded DNA and pausing at an NGG PAM.",
  },
  {
    eyebrow: "05 · Pair",
    title: "Let the RNA interrogate the DNA",
    body: "PAM recognition destabilizes the nearby duplex. The guide RNA can now pair with the complementary target strand, building an RNA–DNA hybrid while the other DNA strand is displaced.",
    detail: "A matching sequence grows into an R-loop",
    label:
      "DNA opening next to the PAM as the guide RNA pairs with the target strand.",
  },
  {
    eyebrow: "06 · Cut",
    title: "Two nuclease domains, two cuts",
    body: "The HNH domain cleaves the guide-complementary target strand. RuvC cleaves the displaced non-target strand. Together they usually leave a blunt double-strand break about three bases upstream of the PAM.",
    detail: "HNH → target strand · RuvC → non-target strand",
    label:
      "The HNH and RuvC active sites cutting opposite DNA strands near the PAM.",
  },
  {
    eyebrow: "07 · Repair",
    title: "The cell writes the ending",
    body: "Cas9 makes the break; the cell performs the edit. End joining can create small insertions or deletions, while template-directed repair can copy in a designed sequence when a repair template is available.",
    detail: "Break → disruption or template-guided change",
    label:
      "A cut DNA molecule branching toward end joining or template-directed repair.",
  },
] as const;

const dnaBases = ["A", "T", "C", "G", "A", "C", "T", "G", "G", "A", "C", "T"];

export default function Cas9ScrollStory() {
  const [activeStage, setActiveStage] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter(
      (step): step is HTMLElement => step !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveStage(Number((visible.target as HTMLElement).dataset.stage));
        }
      },
      { rootMargin: "-34% 0px -34% 0px", threshold: [0, 0.25, 0.5, 0.75] }
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const jumpToStage = (index: number) => {
    setActiveStage(index);
    stepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section className={styles.walkthrough} aria-labelledby="cas9-story-title">
      <header className={styles.intro}>
        <p className={styles.kicker}>A molecular walkthrough</p>
        <h2 id="cas9-story-title">A search engine with molecular scissors</h2>
        <p>
          CRISPR provides the address; Cas9 performs the search and the cut. In
          this walkthrough, we will assemble one editing complex piece by piece
          before following it from DNA recognition to repair.
        </p>
      </header>

      <aside
        className={styles.orientation}
        aria-labelledby="diagram-guide-title"
      >
        <div className={styles.orientationCopy}>
          <p>Before you scroll</p>
          <h3 id="diagram-guide-title">How to read the molecular plate</h3>
          <span>
            This is a functional illustration, not an atom-by-atom structure.
            The cross-hatched shapes are regions of the SpyCas9 protein arranged
            around its pale central channel. The striped bridge helix crosses
            that channel and helps communicate between the protein&apos;s two
            lobes. Each new molecule enters only when the story reaches it.
          </span>
        </div>

        <ul className={styles.orientationKey}>
          <li className={styles.proteinKey}>
            <i />
            <div>
              <strong>Cool-toned shapes</strong>
              <span>
                SpyCas9 recognition, nuclease, and PAM-reading regions
              </span>
            </div>
          </li>
          <li className={styles.rnaKey}>
            <i />
            <div>
              <strong>Orange path</strong>
              <span>The sgRNA scaffold and its programmable 20-nt spacer</span>
            </div>
          </li>
          <li className={styles.dnaKey}>
            <i />
            <div>
              <strong>Green double rail</strong>
              <span>The target and non-target strands of the DNA duplex</span>
            </div>
          </li>
        </ul>
      </aside>

      <div className={styles.storyGrid}>
        <div className={styles.visualColumn}>
          <div
            className={styles.visual}
            data-stage={activeStage}
            role="img"
            aria-live="polite"
            aria-label={stages[activeStage]?.label}
          >
            <div className={styles.visualHeader}>
              <span>SpyCas9 · 1,368 aa</span>
              <span className={styles.stageReadout}>
                {String(activeStage + 1).padStart(2, "0")} /{" "}
                {String(stages.length).padStart(2, "0")}
              </span>
            </div>

            <div className={styles.molecularScene} aria-hidden="true">
              <div className={styles.scanTrail} />

              <div className={styles.dna}>
                <span className={clsx(styles.strandLabel, styles.targetLabel)}>
                  target strand
                </span>
                <span
                  className={clsx(styles.strandLabel, styles.nonTargetLabel)}
                >
                  non-target strand
                </span>
                <div className={clsx(styles.dnaRail, styles.topRail)} />
                <div className={clsx(styles.dnaRail, styles.bottomRail)} />
                <div className={styles.basePairs}>
                  {dnaBases.map((base, index) => (
                    <span key={`${base}-${index}`}>
                      <i>{base}</i>
                    </span>
                  ))}
                </div>
                <div className={styles.cutMarkA} />
                <div className={styles.cutMarkB} />
                <div className={styles.pam}>
                  <span>N</span>
                  <strong>G</strong>
                  <strong>G</strong>
                  <small>PAM</small>
                </div>
              </div>

              <div className={styles.cas9}>
                <div className={styles.proteinGroupLabel}>
                  <strong>SpyCas9 protein</strong>
                  <span>six functional regions</span>
                </div>
                <div className={clsx(styles.domain, styles.rec1)}>
                  <span>REC1</span>
                  <small>guide anchor</small>
                </div>
                <div className={clsx(styles.domain, styles.rec2)}>
                  <span>REC2</span>
                  <small>duplex support</small>
                </div>
                <div className={clsx(styles.domain, styles.rec3)}>
                  <span>REC3</span>
                  <small>duplex sensing</small>
                </div>
                <div className={clsx(styles.domain, styles.hnhDomain)}>
                  <span>HNH</span>
                  <small>target-strand nuclease</small>
                </div>
                <div className={clsx(styles.domain, styles.ruvcDomain)}>
                  <span>RuvC</span>
                  <small>non-target nuclease</small>
                </div>
                <div className={clsx(styles.domain, styles.piDomain)}>
                  <span>PI</span>
                  <small>PAM reader</small>
                </div>
                <div className={styles.channel}>
                  <span>central channel</span>
                </div>
                <div className={styles.bridgeHelix}>
                  <span>bridge helix</span>
                </div>
                <div className={clsx(styles.activeSite, styles.hnhSite)}>
                  target cut
                </div>
                <div className={clsx(styles.activeSite, styles.ruvcSite)}>
                  non-target cut
                </div>
              </div>

              <div className={styles.guideRna}>
                <div className={styles.rnaScaffold}>
                  <i />
                  <i />
                  <i />
                </div>
                <div className={styles.rnaSpacer}>
                  {dnaBases.slice(0, 9).map((base, index) => (
                    <span key={`rna-${base}-${index}`} />
                  ))}
                </div>
                <small className={styles.scaffoldLabel}>sgRNA scaffold</small>
                <small className={styles.spacerLabel}>20-nt spacer</small>
              </div>

              <div className={styles.figureNote}>
                RNA–DNA complementarity
                <br />
                stabilizes the R-loop
              </div>

              <div className={styles.repairChoice}>
                <div>
                  <span>quick repair</span>
                  <strong>small indels</strong>
                </div>
                <i>or</i>
                <div>
                  <span>repair template</span>
                  <strong>precise change</strong>
                </div>
              </div>
            </div>

            <div className={styles.visualFooter}>
              <span className={styles.legendRec}>recognition domains</span>
              <span className={styles.legendNuc}>nuclease domains</span>
              <span className={styles.legendRna}>guide RNA</span>
              <span className={styles.legendDna}>target DNA</span>
            </div>
          </div>

          <nav className={styles.stageNav} aria-label="CRISPR mechanism stages">
            {stages.map((stage, index) => (
              <button
                key={stage.eyebrow}
                type="button"
                aria-label={`Go to ${stage.title}`}
                aria-current={activeStage === index ? "step" : undefined}
                onClick={() => jumpToStage(index)}
              >
                <span />
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.steps}>
          {stages.map((stage, index) => (
            <article
              key={stage.eyebrow}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              data-stage={index}
              className={clsx(
                styles.step,
                activeStage === index && styles.activeStep
              )}
              tabIndex={0}
              onFocus={() => setActiveStage(index)}
            >
              <p className={styles.stepEyebrow}>{stage.eyebrow}</p>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              <div className={styles.stepDetail}>{stage.detail}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
