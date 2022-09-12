import React from 'react';
import styles from '../../styles/Home.module.sass';
export default function CharacterCreation() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Character Creation</h1>
        <a href="/">
          <h2>&larr; Home</h2>{' '}
        </a>
        <a href="/character-sheet" className={styles.card}>
          <h3>Character Sheet &rarr;</h3>
          <p>Create a character.</p>
        </a>
      </main>
    </div>
  );
}
