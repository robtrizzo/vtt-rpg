import React from 'react';
import { FC } from 'react';
import styles from '../styles/character-sheet.module.sass';

const AbilityScoreCard: FC<{
  ability: string;
  handleOnClick: (score: string) => void;
}> = ({ ability, handleOnClick }) => {
  return (
    <div
      className={styles.abilityScoreCard}
      onClick={(e) => {
        e.preventDefault;
        handleOnClick(ability);
      }}
    >
      <label htmlFor={ability}>
        {ability
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())}
      </label>
      <input
        id={ability}
        type="number"
        defaultValue={0}
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></input>
    </div>
  );
};

export default AbilityScoreCard;
