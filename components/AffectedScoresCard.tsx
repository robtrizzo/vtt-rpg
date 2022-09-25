import React from 'react';
import { FC } from 'react';
import characterSheetStyles from '../styles/character-sheet.module.sass';

const AffectedScoresCard: FC<{
  primaryAbility: string;
  abilities: any;
  headerText: string;
}> = ({ abilities, headerText, primaryAbility }) => {
  return (
    <div className={characterSheetStyles.affectedScoresContainer}>
      <h3 style={{ color: '#e83e8c' }}>{headerText}</h3>
      <div className={characterSheetStyles.grid}>
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
            <div className={characterSheetStyles.abilityScoreCard}>
              <h4
                style={multiplier >= 1 ? { color: 'green' } : { color: 'red' }}
              >
                {score
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str: string) => str.toUpperCase())}
              </h4>
            </div>
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
};

export default AffectedScoresCard;
