import React from 'react';
import styles from '../styles/character-sheet.module.sass';

export default function AbilityScoreCard({ ability }) {
  return (
    <div className={styles.card}>
      <label htmlFor={ability}>
        {ability.charAt(0).toUpperCase() + ability.slice(1)}
      </label>
      <input id={ability} type="number" defaultValue={0}></input>
    </div>
  );
}
