import { useState } from 'react';
import { GetStaticProps } from 'next';
import AbilityScoreCard from '../components/AbilityScoreCard';
import abilityScoreConfig from '../configs/abilityScores.content.json';
import characterSheetStyles from '../styles/character-sheet.module.sass';
import styles from '../styles/Home.module.sass';
import React from 'react';
import { FC } from 'react';
import AbilityScoreFullDetailsCard from '../components/AbilityScoreFullDetailsCard';
const CharacterSheet: FC<{ abilityScoreConfig: any }> = ({
  abilityScoreConfig,
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [selectedAbilityScore, setSelectedAbilityScore] = useState('');
  const handleAbilityScoreCardClick: (score: string) => void = (score) => {
    setSelectedAbilityScore(score);
    setCurrentPanel(1);
  };
  const handleSecondaryScoreCardClick: () => void = () => setCurrentPanel(0);

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
  let formattedAbilityScores = Object.keys(
    abilityScoreConfig.primaryScores
  ).map((ability) => (
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

      {fileContent ? <h2>{JSON.stringify(fileContent)}</h2> : null}

      <div className={`${characterSheetStyles.slidingPanel}`}>
        <div
          className={`${characterSheetStyles.slidingPanelInner}`}
          style={{ transform: `translateX(${currentPanel * -100}%)` }}
        >
          <div className={`${characterSheetStyles.slidingPanelItem}`}>
            <div className={`${characterSheetStyles.grid}`}>
              {formattedAbilityScores}
            </div>
          </div>
          <div
            className={`${characterSheetStyles.slidingPanelItem}`}
            style={{ height: '70vh' }}
          >
            <AbilityScoreFullDetailsCard
              primaryAbility={selectedAbilityScore}
              abilityScoreConfig={abilityScoreConfig}
              handleBackClick={() => setCurrentPanel(0)}
            />
          </div>
          <div className={`${characterSheetStyles.slidingPanelItem}`}>Test</div>
        </div>
      </div>
    </main>
  );
};
export default CharacterSheet;

export const getStaticProps: GetStaticProps = async () => {
  try {
    // const res = await fetch('http://localhost:3000/api/hello');
    // const data = await res.json();
    return {
      props: {
        // data,
        abilityScoreConfig,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};
