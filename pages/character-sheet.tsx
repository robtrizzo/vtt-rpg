import { GetStaticProps } from 'next';
import { useState, useMemo, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  SxProps,
  Button,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CasinoIcon from '@mui/icons-material/Casino';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
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

const red: number[] = [0, 0, 0, 0, 1, 1];
const blue: number[] = [0, 0, 0, 0, 1, 1, 1, 1];
const green: number[] = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
const yellow: number[] = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function roll(n: number, c: number[]) {
  return Array(n)
    .fill(0)
    .reduce((sum, _) => sum + c[Math.floor(Math.random() * c.length)], 0);
}

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

const PrimaryAbilityScoreCard: FC<{
  ability: string;
  score: number[];
  setScore?: (score: number[]) => void;
  readonly?: boolean;
  handleMessage: (message: string) => void;
  sx?: SxProps;
}> = ({
  ability,
  score,
  setScore,
  readonly = false,
  handleMessage,
  sx = [],
}) => {
  const abilityName = useMemo(() => {
    return ability
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }, [ability]);

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
      <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'medium' }}>
        {abilityName}
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
            mx: 1,
          }}
        >
          {totalScore}
        </Typography>
        <Divider orientation="vertical" sx={{ height: '50px' }} />
        <Box className={styles.column}>
          <Box className={styles.row}>
            {readonly ? (
              <Box
                sx={{
                  height: '24px',
                  width: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                  variant="body1"
                >
                  {score[0]}
                </Typography>
              </Box>
            ) : (
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
                  setScore
                    ? handleSetScore(e, (val: number) => {
                        setScore([val, score[1], score[2], score[3]]);
                      })
                    : null;
                }}
              />
            )}
            {readonly ? (
              <Box
                sx={{
                  height: '24px',
                  width: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    color: 'cyan',
                  }}
                  variant="body1"
                >
                  {score[1]}
                </Typography>
              </Box>
            ) : (
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
                  setScore
                    ? handleSetScore(e, (val: number) => {
                        setScore([score[0], val, score[2], score[3]]);
                      })
                    : null;
                }}
              />
            )}
          </Box>
          <Box className={styles.row}>
            {readonly ? (
              <Box
                sx={{
                  height: '24px',
                  width: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    color: 'springgreen',
                  }}
                  variant="body1"
                >
                  {score[2]}
                </Typography>
              </Box>
            ) : (
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
                  setScore
                    ? handleSetScore(e, (val: number) => {
                        setScore([score[0], score[1], val, score[3]]);
                      })
                    : null;
                }}
              />
            )}
            {readonly ? (
              <Box
                sx={{
                  height: '24px',
                  width: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    color: 'yellow',
                  }}
                  variant="body1"
                >
                  {score[3]}
                </Typography>
              </Box>
            ) : (
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
                  setScore
                    ? handleSetScore(e, (val: number) => {
                        setScore([score[0], score[1], score[2], val]);
                      })
                    : null;
                }}
              />
            )}
          </Box>
        </Box>
        <Divider orientation="vertical" sx={{ height: '50px' }} />
        <IconButton
          sx={{ borderRadius: '10px' }}
          onClick={() => {
            handleMessage(
              `Rolled ${abilityName}: ${
                roll(score[0], red) +
                roll(score[1], blue) +
                roll(score[2], green) +
                roll(score[3], yellow)
              }`
            );
          }}
        >
          <>
            <svg width={0} height={0}>
              <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="rgba(241,184,74,1)" />
                <stop offset={1} stopColor="rgba(207,113,8,1)" />
              </linearGradient>
            </svg>
            <CasinoIcon sx={{ fill: 'url(#linearColors)' }} />
          </>
        </IconButton>
      </Box>
    </Item>
  );
};

const AbilitySection: FC<{
  header: string;
  scores: {
    ability: {
      score: number[];
    };
  };
  handleSetAbilityScore: (name: string, s: number[]) => void;
  handleNewSnack: (message: string) => void;
}> = ({ header, scores, handleSetAbilityScore, handleNewSnack }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        className={styles.row}
        sx={{ alignItems: 'center', justifyContent: 'flex-start', gap: 1 }}
      >
        <Typography variant="h5" sx={{ my: 1 }}>
          {header}
        </Typography>
        <IconButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Box className={styles.row} sx={{ width: '100%', flexWrap: 'wrap' }}>
          {Object.entries(scores).map(([name, { score }]) => (
            <Box
              key={`${name}-container`}
              className={styles.row}
              sx={{
                width: '350px',
                flexGrow: 1,
                flexBasis: '350px',
                maxWidth: '33%',
              }}
            >
              <PrimaryAbilityScoreCard
                key={`${name}-card`}
                sx={{ width: '100%' }}
                ability={name}
                score={score}
                setScore={(s) => {
                  handleSetAbilityScore(name, s);
                }}
                handleMessage={handleNewSnack}
              />
            </Box>
          ))}
        </Box>
      </Collapse>
    </>
  );
};

const CharacterSheetMUI: FC<{ abilityScoreConfig: any }> = ({
  abilityScoreConfig,
}) => {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleNewSnack = (message: string) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExitedSnack = () => {
    setMessageInfo(undefined);
  };

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
            const file = new Blob(
              [
                JSON.stringify(
                  {
                    primaryScores: primaryAbilityScores,
                    secondaryScores: secondaryAbilityScores,
                    resists,
                  },
                  null,
                  2
                ),
              ],
              {
                type: 'application/json',
              }
            );
            element.href = URL.createObjectURL(file);
            element.download = 'character.json';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
          }}
        >
          Save
        </Button>
        <Box className={styles.column} sx={{ width: '100%' }}>
          <AbilitySection
            header="Primary Ability Scores"
            scores={primaryAbilityScores}
            handleSetAbilityScore={handleSetAbilityScore}
            handleNewSnack={handleNewSnack}
          />
          <Divider sx={{ width: '100%', my: 2 }} />
          <AbilitySection
            header="Secondary Ability Scores"
            scores={secondaryAbilityScores}
            handleSetAbilityScore={handleSetAbilityScore}
            handleNewSnack={handleNewSnack}
          />
          <Divider sx={{ width: '100%', my: 2 }} />
          <AbilitySection
            header="Resistances"
            scores={resists}
            handleSetAbilityScore={handleSetAbilityScore}
            handleNewSnack={handleNewSnack}
          />
        </Box>
        <Divider sx={{ width: '100%', mt: 2 }} />
      </Box>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        TransitionProps={{ onExited: handleExitedSnack }}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleCloseSnack}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert
          onClose={handleCloseSnack}
          severity="info"
          sx={{ width: '100%' }}
          icon={
            <>
              <svg width={0} height={0}>
                <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                  <stop offset={0} stopColor="rgba(241,184,74,1)" />
                  <stop offset={1} stopColor="rgba(207,113,8,1)" />
                </linearGradient>
              </svg>
              <CasinoIcon sx={{ fill: 'url(#linearColors)' }} />
            </>
          }
        >
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
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
