import React from 'react';
import styles from '../styles/Home.module.sass';
export default function Term(props: any) {
  return <span className={styles.code}>{props.children}</span>;
}
