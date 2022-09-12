import styles from '../styles/Home.module.sass';
export default function Term(props) {
  return <span className={styles.code}>{props.children}</span>;
}
