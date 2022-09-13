import { useState } from 'react';
import { GetStaticProps } from 'next';
import AbilityScoreCard from '../components/AbilityScoreCard';
import characterSheetStyles from '../styles/character-sheet.module.sass';
import styles from '../styles/Home.module.sass';
import React from 'react';
export default function CharacterSheet() {
  const [animate, setAnimate] = useState(false);
  const [selectedAbilityScore, setSelectedAbilityScore] = useState('');
  const handleAbilityScoreCardClick: (score: string) => void = (score) => {
    setSelectedAbilityScore(score);
    setAnimate(true);
  };
  const handleSecondaryScoreCardClick: () => void = () => setAnimate(false);

  const [fileContent, setFileContent] = useState('');

  const fileUploadHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const fileReader = new FileReader();
    const { files } = event.target;

    if (files && files.length > 0) {
      fileReader.readAsText(files[0], 'UTF-8');
      fileReader.onload = (e) => {
        const content = e.target?.result;
        console.log(content);
        setFileContent(JSON.parse(content?.toString() || ''));
      };
    }
  };

  let formattedAbilityScores = [
    'vitality',
    'strength',
    'agility',
    'coordination',
    'resolve',
    'perception',
    'intellect',
    'knowledge',
    'charisma',
    'empathy',
    'luck',
  ].map((ability) => (
    <AbilityScoreCard
      key={ability}
      ability={ability}
      handleOnClick={handleAbilityScoreCardClick}
    ></AbilityScoreCard>
  ));

  return (
    <main className={styles.main} style={{ overflow: 'hidden' }}>
      <h1 className={styles.title}>Character Sheet</h1>
      <a href="/guides/character-creation">
        <h2>&larr; Back</h2>
      </a>
      <label htmlFor="charSheetUpload">Load your character</label>
      <input
        id="charSheetUpload"
        type="file"
        onChange={fileUploadHandler}
        style={{ backgroundColor: '#221b1e' }}
      />

      <h2>{JSON.stringify(fileContent)}</h2>

      <div
        className={`${characterSheetStyles.panelWrapper} ${
          characterSheetStyles.animate
        } ${animate ? characterSheetStyles.slideLeft : ''}`}
      >
        <div className={`${characterSheetStyles.panel}`}>
          <div className={`${characterSheetStyles.grid} `}>
            {formattedAbilityScores}
          </div>
        </div>
        <div className={characterSheetStyles.panel}>
          <h2
            onClick={(e) => {
              e.preventDefault();
              setAnimate(false);
            }}
          >
            &larr; {selectedAbilityScore}
          </h2>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/hello');
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};
