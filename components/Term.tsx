import React from 'react';
import { FC } from 'react';
import styles from '../styles/Home.module.sass';
const Term: FC<{ children?: React.ReactNode }> = (props) => {
  return <span className={styles.code}>{props.children}</span>;
};
export default Term;
