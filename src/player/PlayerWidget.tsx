import { Qset } from '../utils/qset'
import '@/globals.css'
import playerStyles from './styles.module.css'
import appStyles from '../app.module.css'
import Button from '../components/Button/Button'
import Question from '../components/Question/Question'
import { ReactNode, useCallback, useMemo, useReducer, useState } from 'react'
import {
  createInitialGameState,
  GameStateReducer,
} from '../utils/game-start-reducer'
import { ModalContext } from '../utils/modal-context'
import Modal from '../components/Modal/Modal'

interface PlayerWidgetProps {
  qset: Qset,
  onEnd: () => void,
  submitQuestionForScoring: (id: string, answers: string, value: string) => void,
}

export default function PlayerWidget({ qset, onEnd, submitQuestionForScoring }: PlayerWidgetProps) {
  const [gameState, dispatch] = useReducer(GameStateReducer, createInitialGameState(qset.items))
  const [selectedQuestion, setSelectedQuestion] = useState(0)
  const [modal, setModal] = useState<ReactNode | null>(null)

  // On submit game
  const submitGame = useCallback(() => {
    qset.items.forEach((item, index) => {
      submitQuestionForScoring(item.id, gameState.questions[index].playerAnswer, '100') // TODO is 100 right???
    })
    onEnd()
  }, [qset, gameState])

  // Create set of question components
  // TODO add check to make sure questions[0] exists
  const questionComponents = useMemo(() => {
    return qset.items.map((qsetItem, i) => (
      <Question
        key={i}
        question={qsetItem.questions[0].text}
        index={i}
        questionState={gameState.questions[i]}
        updateState={dispatch}
      />
    ))
  }, [qset.items, gameState])

  // Open submit modal
  const openSubmitModal = useCallback(() => {
    setModal(
      <Modal>
        <h2>Submit Answers?</h2>
        <p>Are you sure you want to submit your answers? You have not looked at 2 questions still.</p>
        <div className={playerStyles.submitModalButtons}>
          <Button onClick={() => setModal(null)}>Go Back</Button>
          <Button onClick={submitGame}>
            Submit Answers
          </Button>
        </div>
      </Modal>,
    )
  }, [])

  return (
    <ModalContext.Provider value={setModal}>
      <div className={appStyles.app}>
        <nav className={appStyles.header}>
          <h1>Python'd</h1>

          <div className={appStyles.questionButtons}>
            {qset.items.map((_, index) => {
              const active = index === selectedQuestion
              const label = active ? `Question ${index + 1}` : index + 1
              return (
                <Button
                  size="md"
                  active={active}
                  onClick={() => setSelectedQuestion(index)}
                >
                  {label}
                </Button>
              )
            })}
          </div>

          <Button
            postIcon="/assets/arrow-forward.svg"
            onClick={openSubmitModal}
          >
            Submit
          </Button>
        </nav>

        {questionComponents[selectedQuestion]}
      </div>

      {/* Modal */}
      {modal && (
        <div className={appStyles.modalBkg}>
          {modal}
        </div>
      )}
    </ModalContext.Provider>
  )
}
