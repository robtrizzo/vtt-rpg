import React from 'react';
import { FC } from 'react';
import styles from '../styles/character-sheet.module.sass';

const AbilityScoreCard: FC<{ ability: string; handleOnClick: () => void }> = ({
  ability,
  handleOnClick,
}) => {
  return (
    <div
      className={styles.abilityScoreCard}
      onClick={(e) => {
        e.preventDefault;
        handleOnClick();
      }}
    >
      <label htmlFor={ability}>
        {ability.charAt(0).toUpperCase() + ability.slice(1)}
      </label>
      <input id={ability} type="number" defaultValue={0}></input>
    </div>
  );
};

export default AbilityScoreCard;
