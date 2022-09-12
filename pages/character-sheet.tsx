import { useState } from 'react';
import { GetStaticProps } from 'next';
import AbilityScoreCard from '../components/AbilityScoreCard';
import styles from '../styles/Home.module.sass';
import React from 'react';
export default function CharacterSheet() {
  const [fileContent, setFileContent] = useState('');

  const fileUploadHandler = (event) => {
    event.preventDefault();
    const fileReader = new FileReader();
    const { files } = event.target;

    fileReader.readAsText(files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const content = e.target?.result;
      console.log(content);
      setFileContent(JSON.parse(content?.toString() || ''));
    };
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
    <AbilityScoreCard key={ability} ability={ability}></AbilityScoreCard>
  ));

  console.log(formattedAbilityScores);
  return (
    <main className={styles.main}>
      <h1>Character Sheet</h1>
      <label htmlFor="charSheetUpload">Load your character</label>
      <input id="charSheetUpload" type="file" onChange={fileUploadHandler} />

      <h2>{JSON.stringify(fileContent)}</h2>

      <div className={styles.grid}>{formattedAbilityScores}</div>
    </main>
  );
}

export const getStaticProps:GetStaticProps = async() => {
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
}
