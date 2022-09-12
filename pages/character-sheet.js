import { useState } from 'react';
import characterSheetStyles from '../styles/character-sheet.module.sass';
import styles from '../styles/Home.module.sass';
export default function CharacterSheet(props) {
  const [fileContent, setFileContent] = useState('');

  const fileUploadHandler = (event) => {
    event.preventDefault();
    const fileReader = new FileReader();
    const { files } = event.target;

    fileReader.readAsText(files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const content = e.target.result;
      console.log(content);
      setFileContent(JSON.parse(content));
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
    <div className={characterSheetStyles.card}>
      <label htmlFor={ability}>
        {ability.charAt(0).toUpperCase() + ability.slice(1)}
      </label>
      <input id={ability} type="number" defaultValue={0}></input>
    </div>
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

export async function getStaticProps() {
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
