import React from 'react';
import { FC } from 'react';
import characterSheetStyles from '../styles/character-sheet.module.sass';

const AffectedScoresCard: FC<{
  primaryAbility: string;
  abilities: any;
}> = ({ abilities, primaryAbility }) => {
  return (
    <div className={characterSheetStyles.affectedScoresContainer}>
      <h3 style={{ color: '#e83e8c' }}>Secondary Scores</h3>
      {Object.keys(abilities).map((score: any) => {
        let multiplier = 1;
        return abilities[score].inputs.primaryScores.some(
          (primaryScore: { score: string; multiplier: number }) => {
            if (primaryScore.score === primaryAbility) {
              multiplier = primaryScore.multiplier;
              return true;
            }
            return false;
          }
        ) ? (
          <h4 style={multiplier >= 1 ? { color: 'green' } : { color: 'red' }}>
            {score}
          </h4>
        ) : (
          ''
        );
      })}
    </div>
  );
};

export default AffectedScoresCard;
