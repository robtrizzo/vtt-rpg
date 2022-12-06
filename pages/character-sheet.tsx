import { GetStaticProps } from 'next';
import { useState, useMemo, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  SxProps,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveAsIcon from '@mui/icons-material/SaveAs';
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
  score: number[];
  setScore: (score: number[]) => void;
  sx?: SxProps;
}> = ({ ability, score, setScore, sx = [] }) => {
  const numberFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === '') {
      return 0;
    }
    // only allow numbers
    if (e.target.value.match(/^[0-9]*$/)) {
      return parseInt(e.target.value);
    }
  };

  const handleSetScore = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fn: { (val: number): void; (arg0: number): void }
  ) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '') {
      fn(0);
    } else if (regex.test(e.target.value)) {
      fn(parseInt(e.target.value));
    }
  };

  const totalScore = useMemo(() => {
    return score.reduce((acc, val) => acc + val, 0);
  }, [score]);

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
      <Box
        className={styles.row}
        sx={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',
            backgroundImage: 'linear-gradient(60deg, #E21143, #FFB03A)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {totalScore}
        </Typography>
        <Box className={styles.column}>
          <Box className={styles.row}>
            <TextField
              sx={{ width: '3ch' }}
              inputProps={{
                style: {
                  fontSize: '.8rem',
                  fontWeight: 'bold',
                  padding: '2px 4px',
                  color: 'red',
                },
              }}
              value={score[0]}
              onChange={(e) => {
                e.preventDefault();
                handleSetScore(e, (val: number) => {
                  setScore([val, score[1], score[2], score[3]]);
                });
              }}
            />
            <TextField
              sx={{ width: '3ch' }}
              inputProps={{
                style: {
                  fontSize: '.8rem',
                  fontWeight: 'bold',
                  padding: '2px 4px',
                  color: 'cyan',
                },
              }}
              value={score[1]}
              onChange={(e) => {
                e.preventDefault();
                handleSetScore(e, (val: number) => {
                  setScore([score[0], val, score[2], score[3]]);
                });
              }}
            />
          </Box>
          <Box className={styles.row}>
            <TextField
              sx={{ width: '3ch' }}
              inputProps={{
                style: {
                  fontSize: '.8rem',
                  fontWeight: 'bold',
                  padding: '2px 4px',
                  color: 'springgreen',
                },
              }}
              value={score[2]}
              onChange={(e) => {
                e.preventDefault();
                handleSetScore(e, (val: number) => {
                  setScore([score[0], score[1], val, score[3]]);
                });
              }}
            />
            <TextField
              sx={{ width: '3ch' }}
              inputProps={{
                style: {
                  fontSize: '.8rem',
                  fontWeight: 'bold',
                  padding: '2px 4px',
                  color: 'yellow',
                },
              }}
              value={score[3]}
              onChange={(e) => {
                e.preventDefault();
                handleSetScore(e, (val: number) => {
                  setScore([score[0], score[1], score[2], val]);
                });
              }}
            />
          </Box>
        </Box>
      </Box>
    </Item>
  );
};

const CharacterSheetMUI: FC<{ abilityScoreConfig: any }> = ({
  abilityScoreConfig,
}) => {
  const [fileContent, setFileContent] = useState(abilityScoreConfig);

  const [primaryAbilityScores, setPrimaryAbilityScores] = useState<{
    ability: { score: number[] };
  }>(abilityScoreConfig.primaryScores);

  const handleSetAbilityScore = (ability: string, score: number[]) => {
    setPrimaryAbilityScores((prev) => ({
      ...prev,
      [ability]: { score },
    }));
  };

  useEffect(() => {
    setPrimaryAbilityScores(fileContent.primaryScores);
  }, [fileContent]);

  const secondaryAbilityScores = useMemo<{
    ability: {
      inputs: { primaryScores: [{ score: string; multiplier: number }] };
      score: number[];
    };
  }>(() => {
    const secondaryScores = { ...abilityScoreConfig.secondaryScores };
    Object.keys(secondaryScores).forEach((ability) => {
      let inputs = secondaryScores[ability].inputs.primaryScores;
      let denominator = inputs.reduce((acc: number, cur: { ratio: number }) => {
        return acc + Math.abs(cur.ratio);
      }, 0);
      secondaryScores[ability].score = [0, 1, 2, 3].map((idx) =>
        Math.floor(
          inputs.reduce(
            (acc: number, cur: { score: string; ratio: number }) => {
              return (
                acc +
                // the keyof typof is a hack to get around typescript not liking the dynamic property access
                primaryAbilityScores[
                  cur.score as keyof typeof primaryAbilityScores
                ].score[idx] *
                  (cur.ratio / denominator)
              );
            },
            0
          )
        )
      );
    });
    return secondaryScores;
  }, [primaryAbilityScores]);

  const resists = useMemo<{
    ability: {
      inputs: { primaryScores: [{ score: string; multiplier: number }] };
      score: number[];
    };
  }>(() => {
    const resists = { ...abilityScoreConfig.resists };
    Object.keys(resists).forEach((ability) => {
      let inputs = resists[ability].inputs.primaryScores;
      let denominator = inputs.reduce((acc: number, cur: { ratio: number }) => {
        return acc + Math.abs(cur.ratio);
      }, 0);
      resists[ability].score = [0, 1, 2, 3].map((idx) =>
        Math.floor(
          inputs.reduce(
            (acc: number, cur: { score: string; ratio: number }) => {
              return (
                acc +
                // the keyof typof is a hack to get around typescript not liking the dynamic property access
                primaryAbilityScores[
                  cur.score as keyof typeof primaryAbilityScores
                ].score[idx] *
                  (cur.ratio / denominator)
              );
            },
            0
          )
        )
      );
    });
    return resists;
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
        setFileContent(JSON.parse(content?.toString() || ''));
      };
    }
  };
  return (
    <main className={styles.main}>
      <Typography variant="h2">Character Sheet</Typography>
      <Box className={styles.column} sx={{ gap: 1 }}>
        <Box className={styles.row} sx={{ gap: 1 }}>
          <label htmlFor="charSheetUpload">Load your character</label>
          <input
            id="charSheetUpload"
            type="file"
            onChange={fileUploadHandler}
            style={{ backgroundColor: '#221b1e' }}
          />
        </Box>
        <Button
          sx={{ width: '80px', textTransform: 'none', fontWeight: 'bold' }}
          variant="contained"
          color="warning"
          startIcon={<SaveAsIcon />}
          onClick={() => {
            const element = document.createElement('a');
            const file = new Blob([JSON.stringify(fileContent, null, 2)], {
              type: 'application/json',
            });
            element.href = URL.createObjectURL(file);
            element.download = 'character.json';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
          }}
        >
          Save
        </Button>
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
          <Box className={styles.column}>
            {Object.entries(resists).map(([name, { inputs, score }]) => (
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
