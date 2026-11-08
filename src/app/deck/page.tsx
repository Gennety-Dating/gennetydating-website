import Image from "next/image";
import { DeckShell } from "@/components/deck/deck-shell";
import { DeckViewer } from "@/components/deck/deck-viewer";
import { WalkthroughVideo } from "@/components/deck/walkthrough-video";
import { APP_SCREENS, COMPETITORS, DECK_PDF, FOUNDER, ROUND } from "@/lib/deck-content";
import styles from "@/components/deck/deck.module.css";

export default function DeckPage() {
  const mail = `mailto:${FOUNDER.email}?subject=${encodeURIComponent("Gennety — pre-seed")}`;

  return (
    <DeckShell>
      <header className={styles.topbar}>
        <a href="https://www.gennety.com" className={styles.brand} data-track="brand">
          <Image src="/images/butterfly-burgundy-v3-transparent.svg" alt="" width={28} height={28} priority />
          <span>Gennety</span>
        </a>
        <nav className={styles.topActions} aria-label="Deck actions">
          <a href={DECK_PDF} download className={styles.quietLink} data-track="download:topbar" data-event="download">
            Download PDF
          </a>
          <a href={mail} className={styles.pill} data-track="email:topbar">
            Email Gleb
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className={styles.hero} data-deck-section="hero" aria-labelledby="deck-title">
          <h1 id="deck-title" className={styles.statement}>
            <span>Zero swiping.</span>
            <span>Zero chats.</span>
            <span>Real dates.</span>
          </h1>
          <p className={styles.lede}>
            Gennety is a personal AI matchmaker. It gets to know you, finds one person worth meeting,
            agrees on a time and books the place. You just show up.
          </p>
          <div className={styles.heroFoot}>
            <p className={styles.round}>
              {ROUND.stage}. Raising {ROUND.target}.
            </p>
            <div className={styles.heroActions}>
              <a href="#walkthrough" className={styles.pill} data-track="hero:watch">
                Watch the walkthrough
              </a>
              <a href="#deck" className={styles.ghost} data-track="hero:deck">
                Open the deck
              </a>
            </div>
          </div>
        </section>

        <section id="walkthrough" className={styles.block} data-deck-section="video" aria-labelledby="video-title">
          <div className={styles.blockHead}>
            <h2 id="video-title">The app, start to finish</h2>
            <p>90 seconds in the iOS app, from the first question to the date itself. Every screen is the real product.</p>
          </div>
          <WalkthroughVideo />
        </section>

        <section id="deck" className={styles.block} data-deck-section="deck" aria-labelledby="deck-heading">
          <DeckViewer />
        </section>

        {APP_SCREENS.length > 0 && (
          <section className={styles.block} data-deck-section="screens" aria-labelledby="screens-title">
            <div className={styles.blockHead}>
              <h2 id="screens-title">Inside the app</h2>
              <p>One screen for each step, in the order a person goes through them.</p>
            </div>
            <ol className={styles.screens}>
              {APP_SCREENS.map((screen, index) => (
                <li key={screen.src} className={styles.screen} data-screen={screen.step}>
                  <Image
                    src={screen.src}
                    alt={screen.caption}
                    width={1206}
                    height={2622}
                    sizes="(max-width: 767px) 62vw, 240px"
                    className={styles.screenImage}
                  />
                  <p>
                    <span className={styles.stepNo}>{index + 1}</span>
                    {screen.caption}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className={`${styles.block} ${styles.roundBlock}`} data-deck-section="round" aria-labelledby="round-title">
          <div className={styles.blockHead}>
            <h2 id="round-title">The round</h2>
            <p>
              {ROUND.stage}, {ROUND.target}. Where the money goes and what it buys in 12 months.
            </p>
          </div>
          <div className={styles.split} role="img" aria-label="Use of proceeds: 60% viral UGC and shows, 25% offline pop-ups, 15% AI and scale">
            {ROUND.proceeds.map((item) => (
              <span key={item.title} style={{ flexGrow: item.share }} className={styles.splitPart} />
            ))}
          </div>
          <div className={styles.roundGrid}>
            <ul className={styles.proceeds}>
              {ROUND.proceeds.map((item) => (
                <li key={item.title}>
                  <strong>{item.share}%</strong>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ol className={styles.milestones}>
              {ROUND.milestones.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.block} data-deck-section="market" aria-labelledby="market-title">
          <div className={styles.blockHead}>
            <h2 id="market-title">Others building AI matchmaking</h2>
            <p>The closest companies, and where they were covered.</p>
          </div>
          <ul className={styles.market}>
            {COMPETITORS.map((company) => (
              <li key={company.name}>
                <a href={company.url} target="_blank" rel="noopener noreferrer" data-track={`competitor:${company.name}`}>
                  {company.name}
                </a>
                <a
                  href={company.pressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.press}
                  data-track={`press:${company.name}`}
                >
                  {company.press}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.closing} data-deck-section="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className={styles.closingLine}>
            Let&apos;s bring dating back to real life.
          </h2>
          <div className={styles.founder}>
            <p>
              {FOUNDER.name}, {FOUNDER.role}
            </p>
            <div className={styles.heroActions}>
              <a href={mail} className={styles.pill} data-track="email:closing">
                {FOUNDER.email}
              </a>
              <a href="https://www.gennety.com" className={styles.ghost} data-track="website:closing">
                gennety.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>This page measures how long each part is viewed so we can make it better. It sets no cookies.</p>
      </footer>
    </DeckShell>
  );
}
