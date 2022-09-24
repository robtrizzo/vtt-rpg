import React from 'react';
import { FC } from 'react';
import characterSheetStyles from '../styles/character-sheet.module.sass';
import AffectedScoresCard from './AffectedScoresCard';

const AbilityScoreFullDetailsCard: FC<{
  primaryAbility: string;
  abilityScoreConfig: any;
  handleBackClick: () => void;
}> = ({ primaryAbility, abilityScoreConfig, handleBackClick }) => {
  return (
    <div
      className={`${characterSheetStyles.panel} ${characterSheetStyles.abilityScoreFullDetailsCard}`}
    >
      <h1>
        {primaryAbility.charAt(0).toUpperCase() + primaryAbility.slice(1)}
      </h1>
      <h2
        onClick={(e) => {
          e.preventDefault();
          handleBackClick();
        }}
      >
        &larr; All Ability Scores
      </h2>
      <AffectedScoresCard
        primaryAbility={primaryAbility}
        headerText="Secondary Scores"
        abilities={abilityScoreConfig.secondaryScores}
      />
      <AffectedScoresCard
        primaryAbility={primaryAbility}
        headerText="Resistances"
        abilities={abilityScoreConfig.resists}
      />
    </div>
  );
};
export default AbilityScoreFullDetailsCard;
