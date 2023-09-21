import { create } from "zustand";
import {
  faCat,
  faDog,
  faHippo,
  faSpider,
  faFish,
  faDragon,
  faKiwiBird,
  faWorm,
  faShrimp,
  faMosquito,
  faHorse,
  faFrog,
  faDove,
  faBugs,
  faOtter,
  faLocust,
  faCow,
  faCrow,
} from "@fortawesome/free-solid-svg-icons";

const useGameStore = create((set) => {
  const initialGridSize = 4;

  const initialState = {
    settings: {
      selectedTheme: "Numbers",
      selectedPlayers: 1,
      selectedGridSize: `${initialGridSize}x${initialGridSize}`,
    },
    gameStatus: {
      isTimerRunning: false,
      moves: 0,
      time: 0,
    },
    grid: {
      gridValues: [],
      flippedValues: [],
      flippedCount: 0,
      gridSize: initialGridSize,
    },
    playersData: {
      currPlayer: 1,
      players: [],
    },
    totalScore: 0,
    isMobileMenuOpen: false,
    pausePlay: "Start Game",
    playersDetails: {},
    isGameEnd: false,
  };

  const actions = {
    adjustGridSize: () => {
      set((state) => ({
        grid: {
          ...state.grid,
          gridSize: state.settings.selectedGridSize === "4x4" ? 4 : 6,
        },
      }));
    },

    adjustPlayers: () => {
      set((state) => ({
        playersData: {
          ...state.playersData,
          players: Array.from(
            { length: state.settings.selectedPlayers },
            (_, index) => ({
              id: index + 1,
              score: 0,
            })
          ),
        },
      }));
    },

    changeOptions: (key, value) => {
      set((state) => ({
        settings: {
          ...state.settings,
          [key]: value,
        },
      }));
    },

    setPausePlay: (value) => {
      set({ pausePlay: value });
    },

    toggleTimer: () => {
      set((state) => ({
        gameStatus: {
          ...state.gameStatus,
          isTimerRunning: !state.gameStatus.isTimerRunning,
        },
      }));
    },

    toggleMobileMenu: () => {
      set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
    },

    rotate: (index) => {
      set((state) => {
        const newGridValues = state.grid.gridValues.map((gridValue, i) =>
          i === index ? { ...gridValue, status: true } : gridValue
        );

        return state.grid.flippedCount < 2 &&
          !state.grid.gridValues[index].status
          ? {
              grid: {
                ...state.grid,
                gridValues: newGridValues,
                flippedValues: [...state.grid.flippedValues, index],
                flippedCount: state.grid.flippedCount + 1,
              },
              gameStatus: { ...state.gameStatus, isTimerRunning: true },
            }
          : state;
      });
    },

    match: (firstIndex, secondIndex) => {
      set((state) => {
        const firstValue = state.grid.gridValues[firstIndex].value;
        const secondValue = state.grid.gridValues[secondIndex].value;

        const matched = firstValue === secondValue;
        const newGridValues = state.grid.gridValues.map((gridValue, index) =>
          index === firstIndex || index === secondIndex
            ? {
                ...gridValue,
                status: matched,
                bgColor: matched ? "bg-[#fca516]" : "bg-[#bbcdd8]",
              }
            : gridValue
        );

        const newState = {
          ...state,
          grid: {
            ...state.grid,
            gridValues: newGridValues,
            flippedValues: [],
            flippedCount: 0,
          },
        };

        if (matched) {
          newState.totalScore++;
          newState.playersData.players = newState.playersData.players.map(
            (player) =>
              player.id === newState.playersData.currPlayer
                ? { ...player, score: player.score + 1 }
                : player
          );
        }

        if (newState.settings.selectedPlayers === 1) {
          newState.gameStatus.moves++;
        } else {
          newState.playersData.currPlayer =
            newState.playersData.currPlayer ===
            newState.settings.selectedPlayers
              ? 1
              : newState.playersData.currPlayer + 1;
        }

        if (
          newState.totalScore * 2 ===
          state.grid.gridSize * state.grid.gridSize
        ) {
          newState.gameStatus.isTimerRunning =
            !newState.gameStatus.isTimerRunning;
          newState.isGameEnd = !newState.isGameEnd;
        }
        return newState;
      });
    },

    setPlayersDetails: (minutes, seconds, maxScore, playersData) => {
      set((state) => ({
        playersDetails:
          state.settings.selectedPlayers === 1
            ? {
                title: "You did it!",
                subtitle: "Game over! Here's how you got on...",
                data: [
                  {
                    win: false,
                    title: "Time Elapsed",
                    result: `${minutes}:${
                      seconds < 10 ? `0${seconds}` : seconds
                    }`,
                    bgColor: "#dee6ec",
                    titleColor: "#819cae",
                    resultColor: "#31485b",
                  },
                  {
                    win: false,
                    title: "Moves Taken",
                    result: state.gameStatus.moves,
                    bgColor: "#dee6ec",
                    titleColor: "#819cae",
                    resultColor: "#31485b",
                  },
                ],
              }
            : {
                title:
                  playersData.players.filter(
                    (player) => player.score === maxScore
                  ).length === 1
                    ? `Player ${playersData.players[0].id} Wins!`
                    : "It's a tie!",
                subtitle: "Game over! Here are the results...",
                data: playersData.players.map((player) => ({
                  win: player.score === maxScore,
                  title: `Player ${player.id}`,
                  result: player.score,
                  bgColor: player.score === maxScore ? "#142936" : "#dee6ec",
                  titleColor: player.score === maxScore ? "#ffffff" : "#819cae",
                  resultColor:
                    player.score === maxScore ? "#ffffff" : "#31485b",
                })),
              },
      }));
    },

    toggleGameEnd: () => set((state) => ({ isGameEnd: !state.isGameEnd })),

    incMoves: () => {
      set((state) => ({
        gameStatus: { ...state.gameStatus, moves: state.gameStatus.moves + 1 },
      }));
    },

    incTime: () => {
      set((state) => ({
        gameStatus: { ...state.gameStatus, time: state.gameStatus.time + 1 },
      }));
    },

    incTotalScore: () => {
      set((state) => ({ totalScore: state.totalScore + 1 }));
    },

    shuffleGridValues: () => {
      set((state) => {
        const pairs =
          state.settings.selectedTheme === "Numbers"
            ? Array.from(
                { length: (state.grid.gridSize * state.grid.gridSize) / 2 },
                (_, index) => index + 1
              )
            : [
                faCat,
                faDog,
                faHippo,
                faSpider,
                faFish,
                faDragon,
                faKiwiBird,
                faWorm,
                faShrimp,
                faMosquito,
                faHorse,
                faFrog,
                faDove,
                faBugs,
                faOtter,
                faDove,
                faLocust,
                faCow,
                faCrow,
              ].slice(0, (state.grid.gridSize * state.grid.gridSize) / 2);

        const shuffledPairs = [...pairs, ...pairs].sort(
          () => Math.random() - 0.5
        );

        const initialRotationState = shuffledPairs.map((value) => ({
          value,
          bgColor: "bg-[#bbcdd8]",
          status: false,
        }));

        return { grid: { ...state.grid, gridValues: initialRotationState } };
      });
    },

    restartGame: () => {
      set((state) => ({
        gameStatus: { isTimerRunning: false, moves: 0, time: 0 },
        grid: {
          gridValues: [],
          flippedValues: [],
          flippedCount: 0,
          gridSize: state.grid.gridSize,
        },
        totalScore: 0,
        playersData: {
          currPlayer: 1,
          players: state.playersData.players.map((player) => ({
            ...player,
            score: 0,
          })),
        },
        pausePlay: "Start Game",
      }));
    },
  };

  return { ...initialState, ...actions };
});

export default useGameStore;
