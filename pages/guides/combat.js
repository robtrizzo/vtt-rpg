import styles from '../../styles/Home.module.sass';
export default function Combat() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Combat</h1>
        <a href="/">
          {' '}
          <h2>&larr; Home</h2>{' '}
        </a>
        <a className={styles.card}>
          <h2>Combat Basics &rarr;</h2>
          <p>Learn the basics of movement, attacks, defense, and damage.</p>
        </a>
        <a className={styles.card} href="/guides/combat-for-nerds">
          <h2>Combat for Nerds &rarr;</h2>
          <p>
            Learn about each kind of attack and defense stat and the math that
            goes into them.
          </p>
        </a>
      </main>
    </div>
  );
}
