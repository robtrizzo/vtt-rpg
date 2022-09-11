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
      </main>
    </div>
  );
}
