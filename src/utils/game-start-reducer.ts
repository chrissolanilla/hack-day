import { QsetItem } from './qset'

export type GameQuestionState = {
  playerAnswer: string, seen: boolean,
}

export type GameState = {
  questions: GameQuestionState[],
}

export type GameStateAction = {
  do: 'updatePlayerAnswer' | 'markSeen',
  question: number,
  opt: unknown,
}

export function createInitialGameState(qsetItems: QsetItem[]): GameState {
  return {
    questions: qsetItems.map(() => {
      return { playerAnswer: '', seen: false }
    }),
  }
}

export function GameStateReducer(state: GameState, action: GameStateAction): GameState {
  const newState = {
    questions: state.questions.map((q) => {
      return { playerAnswer: q.playerAnswer, seen: q.seen }
    }),
  }

  switch (action.do) {
    case 'updatePlayerAnswer':
      newState.questions[action.question].playerAnswer = action.opt['value']
      return newState
    case 'markSeen':
      newState.questions[action.question].seen = true
      return newState
    default:
      console.error('Unknown reducer action: ' + action)
      return newState
  }
}
