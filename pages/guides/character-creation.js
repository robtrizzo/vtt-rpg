import styles from '../../styles/Home.module.sass';
export default function CharacterCreation() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Character Creation</h1>
        <a href="/">
          {' '}
          <h2>&larr; Home</h2>{' '}
        </a>
      </main>
    </div>
  );
}
