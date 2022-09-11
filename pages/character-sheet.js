import { useState } from "react";
import styles from '../styles/Home.module.sass';
export default function CharacterSheet(props) {

    const [fileContent, setFileContent] = useState("");

    const fileUploadHandler = (event) => {
        event.preventDefault();
        const fileReader = new FileReader();
        const { files } = event.target;
    
        fileReader.readAsText(files[0], "UTF-8");
        fileReader.onload = e => {
          const content = e.target.result;
          console.log(content);
          setFileContent(JSON.parse(content));
        };
    }

  return (
    <div>
      <h1>Character Sheet</h1>
      <label htmlFor="charSheetUpload">Load your character</label>
      <input id="charSheetUpload" type="file" onChange={fileUploadHandler}/>

      <h2>{JSON.stringify(fileContent)}</h2>

      <div className={styles.card}><label htmlFor="vitality">Vitality</label>
      <input id="vitality" type="number"></input></div>
      
      <div className={styles.card}><label htmlFor="strength">Strength</label>
      <input id="strength" type="number"></input></div>
      <div className={styles.card}><label htmlFor="agility">Agility</label>
      <input id="agility" type="number"></input></div>
      <div className={styles.card}><label htmlFor="coordination">Coordination</label>
      <input id="coordination" type="number"></input></div>
      <div className={styles.card}><label htmlFor="resolve">Resolve</label>
      <input id="resolve" type="number"></input></div>
      <div className={styles.card}><label htmlFor="perception">Perception</label>
      <input id="perception" type="number"></input></div>
      <div className={styles.card}><label htmlFor="intellect">Intellect</label>
      <input id="intellect" type="number"></input></div>
      <div className={styles.card}><label htmlFor="knowledge">Knowledge</label>
      <input id="knowledge" type="number"></input></div>
      <div className={styles.card}><label htmlFor="charisma">Charisma</label>
      <input id="charisma" type="number"></input></div>
      <div className={styles.card}><label htmlFor="empathy">Empathy</label>
      <input id="empathy" type="number"></input></div>
      <div className={styles.card}><label htmlFor="luck">Luck</label>
      <input id="luck" type="number"></input></div>
    </div>
  );
}

export async function getStaticProps() {
try {
    const res = await fetch('http://localhost:3000/api/hello');
    const data = await res.json();
    return {
        props: {
            data
        }
    }
} catch (e) {
    console.log(e);
}
}