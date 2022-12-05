import { GetStaticProps } from 'next';
import { useState, useMemo } from 'react';
import { Typography, Box, Paper, TextField, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { FC } from 'react';
import styles from '../styles/char-sheet-mui.module.sass';
import abilityScoreConfig from '../configs/abilityScores.content.json';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: '3px',
}));

const PrimaryAbilityScoreCard: FC<{
  ability: string;
  score: number;
  setScore: (score: number) => void;
  sx?: SxProps;
}> = ({ ability, score, setScore, sx = [] }) => {
  return (
    <Item
      className={styles.row}
      sx={[
        { alignItems: 'center', justifyContent: 'space-between' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="h6">
        {ability
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())}
      </Typography>
      <TextField
        type={'number'}
        sx={{ width: '10ch' }}
        inputProps={{ style: { fontSize: '1.5rem' } }}
        value={score}
        onChange={(e) => {
          e.preventDefault();
          setScore(parseInt(e.target.value));
        }}
      />
    </Item>
  );
};

const CharacterSheetMUI: FC<{ abilityScoreConfig: any }> = ({
  abilityScoreConfig,
}) => {
  const [fileContent, setFileContent] = useState('');

  const [primaryAbilityScores, setPrimaryAbilityScores] = useState<{
    ability: { score: number };
  }>(abilityScoreConfig.primaryScores);

  const handleSetAbilityScore = (ability: string, score: number) => {
    setPrimaryAbilityScores((prev) => ({
      ...prev,
      [ability]: { score },
    }));
  };

  const secondaryAbilityScores = useMemo<{
    ability: {
      inputs: { primaryScores: [{ score: string; multiplier: number }] };
      score: number;
    };
  }>(() => {
    const secondaryScores = { ...abilityScoreConfig.secondaryScores };
    Object.keys(secondaryScores).forEach((ability) => {
      let inputs = secondaryScores[ability].inputs.primaryScores;
      secondaryScores[ability].score = inputs.reduce(
        (acc: number, cur: { score: string; multiplier: number }) => {
          return (
            acc +
            // the keyof typof is a hack to get around typescript not liking the dynamic property access
            primaryAbilityScores[cur.score as keyof typeof primaryAbilityScores]
              .score *
              cur.multiplier
          );
        },
        0
      );
    });
    return secondaryScores;
  }, [primaryAbilityScores]);

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
  return (
    <main className={styles.main}>
      <Typography variant="h2">Character Sheet</Typography>
      <label htmlFor="charSheetUpload">Load your character</label>
      <input
        id="charSheetUpload"
        type="file"
        onChange={fileUploadHandler}
        style={{ backgroundColor: '#221b1e' }}
      />
      <Box className={styles.row}>
        <Box className={styles.column}>
          {Object.entries(primaryAbilityScores).map(([name, { score }]) => (
            <Box
              key={`${name}-container`}
              className={styles.row}
              sx={{ width: '400px' }}
            >
              <PrimaryAbilityScoreCard
                key={`${name}-card`}
                sx={{ width: '100%' }}
                ability={name}
                score={score}
                setScore={(s) => {
                  handleSetAbilityScore(name, s);
                }}
              />
            </Box>
          ))}
        </Box>
        <Box className={styles.column}>
          {Object.entries(secondaryAbilityScores).map(
            ([name, { inputs, score }]) => (
              <Box
                key={`${name}-container`}
                className={styles.row}
                sx={{ width: '400px' }}
              >
                <PrimaryAbilityScoreCard
                  key={`${name}-card`}
                  sx={{ width: '100%' }}
                  ability={name}
                  score={score}
                  setScore={(s) => {
                    handleSetAbilityScore(name, s);
                  }}
                />
              </Box>
            )
          )}
        </Box>
      </Box>
    </main>
  );
};
export default CharacterSheetMUI;

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
