import React from 'react';
import styles from '../../styles/Home.module.sass';
export default function SystemBasics() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>System Basics</h1>
        <a href="/">
          {' '}
          <h2>&larr; Home</h2>{' '}
        </a>
        <div className={styles.grid}>
          <a href="/guides/making-a-check" className={styles.card}>
            <h2>Making a Check &rarr;</h2>
            <p>Learn how to make a check and how to interpret the results.</p>
          </a>
        </div>
      </main>
    </div>
  );
}
