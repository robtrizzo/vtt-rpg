import React from 'react';
import styles from '../../styles/Home.module.sass';
export default function MakingACheck() {
  const [red1, setred1] = React.useState(0);
  const [blue1, setblue1] = React.useState(0);
  const [green1, setgreen1] = React.useState(0);
  const [yellow1, setyellow1] = React.useState(0);

  const [red2, setred2] = React.useState(0);
  const [blue2, setblue2] = React.useState(0);
  const [green2, setgreen2] = React.useState(0);
  const [yellow2, setyellow2] = React.useState(0);

  const [roll1, setRoll1] = React.useState(0);
  const [roll2, setRoll2] = React.useState(0);

  const red: number[] = [0, 0, 0, 0, 1, 1];
  const blue: number[] = [0, 0, 0, 0, 1, 1, 1, 1];
  const green: number[] = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
  const yellow: number[] = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  function roll(n: number, c: number[]) {
    return Array(n)
      .fill(0)
      .reduce((sum, _) => sum + c[Math.floor(Math.random() * c.length)], 0);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Making a Check</h1>
        <a href="/guides/system-basics">
          {' '}
          <h2>&larr; System Basics</h2>{' '}
        </a>
        <div className={styles.grid}>
          <div style={{ margin: '10px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <h2>Skill: </h2>
              <input
                type="number"
                name="red1"
                id="red1"
                style={{
                  width: '4ch',
                  fontSize: '1.5em',
                  height: '50px',
                  color: 'red',
                }}
                value={red1 || 0}
                onChange={(e) => setred1(parseInt(e.target.value))}
              />
              <input
                type="number"
                name="blue1"
                id="blue1"
                style={{
                  width: '4ch',
                  fontSize: '1.5em',
                  height: '50px',
                  color: 'blue',
                }}
                value={blue1 || 0}
                onChange={(e) => setblue1(parseInt(e.target.value))}
              />
              <input
                type="number"
                name="green1"
                id="green1"
                style={{
                  width: '4ch',
                  fontSize: '1.5em',
                  height: '50px',
                  color: 'green',
                }}
                value={green1 || 0}
                onChange={(e) => setgreen1(parseInt(e.target.value))}
              />
              <input
                type="number"
                name="yellow1"
                id="yellow1"
                style={{
                  width: '4ch',
                  fontSize: '1.5em',
                  height: '50px',
                  color: 'yellow',
                }}
                value={yellow1 || 0}
                onChange={(e) => setyellow1(parseInt(e.target.value))}
              />
            </div>
            <h2
              style={{
                color:
                  roll1 > roll2 ? 'green' : roll1 === roll2 ? 'white' : 'red',
              }}
            >
              {roll1}
            </h2>
          </div>
          <div style={{ margin: '10px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <h2>Skill: </h2>
              <input
                type="number"
                name="red2"
                id="red2"
                style={{
                  width: '4ch',
                  fontSize: '1.5em',
                  height: '50px',
                  color: 'red',
                }}
                value={red2 || 0}
                onChange={(e) => setred2(parseInt(e.target.value))}
              />
              <input
                type="number"
                name="blue2"
                id="blue2"
                style={{
                  width: '4ch',
                  fontSize: '1.5em',
                  height: '50px',
                  color: 'blue',
                }}
                value={blue2 || 0}
                onChange={(e) => setblue2(parseInt(e.target.value))}
              />
              <input
                type="number"
                name="green2"
                id="green2"
                style={{
                  width: '4ch',
                  fontSize: '1.5em',
                  height: '50px',
                  color: 'green',
                }}
                value={green2 || 0}
                onChange={(e) => setgreen2(parseInt(e.target.value))}
              />
              <input
                type="number"
                name="yellow2"
                id="yellow2"
                style={{
                  width: '4ch',
                  fontSize: '1.5em',
                  height: '50px',
                  color: 'yellow',
                }}
                value={yellow2 || 0}
                onChange={(e) => setyellow2(parseInt(e.target.value))}
              />
            </div>
            <h2
              style={{
                color:
                  roll1 > roll2 ? 'red' : roll1 === roll2 ? 'white' : 'green',
              }}
            >
              {roll2}
            </h2>
          </div>
        </div>
        <div className={styles.grid}>
          <button
            style={{ margin: '10px' }}
            onClick={() => {
              setRoll1(
                roll(red1, red) +
                  roll(blue1, blue) +
                  roll(green1, green) +
                  roll(yellow1, yellow)
              );
              setRoll2(
                roll(red2, red) +
                  roll(blue2, blue) +
                  roll(green2, green) +
                  roll(yellow2, yellow)
              );
            }}
          >
            Roll
          </button>
        </div>
      </main>
    </div>
  );
}
