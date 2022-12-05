import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/Home.module.sass';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>VTTRPG</title>
        <meta
          name="description"
          content="An RPG created for the virtual tabletop"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the VTTRPG</h1>

        <p className={styles.description}>A virtual tabletop focused RPG </p>

        <div className={styles.grid}>
          <a href="/guides/system-basics" className={styles.card}>
            <h2>System Basics 🤔 &rarr;</h2>
            <p>Find an overview of how the sytem works</p>
          </a>

          <a href="/guides/character-creation" className={styles.card}>
            <h2>Character Creation 🛠️ &rarr;</h2>
            <p>
              Learn how to create a character with a step-by-step example and
              guide
            </p>
          </a>

          <a href="/guides/combat" className={styles.card}>
            <h2>Combat ⚔️ &rarr;</h2>
            <p>
              Learn the rules and mechanics of combat, damage, and defenses.
            </p>
          </a>

          <a href="/guides/running-the-game" className={styles.card}>
            <h2>Running the Game 🎲 &rarr;</h2>
            <p>
              Learn how to introduce the game to your players and run a session.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
