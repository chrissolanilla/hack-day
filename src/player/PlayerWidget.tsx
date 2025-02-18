import { Qset } from '../types/qset'
import '@/globals.css'
import styles from './styles.module.css'
import Button from '../components/Button/Button'
import Question from '../components/Question/Question'
import { useMemo, useState } from 'react';

interface PlayerWidgetProps {
  qset: Qset,
  onEnd: () => void,
  submitQuestionForScoring: (id: string, answers: string, value: string) => void,
}

export default function PlayerWidget({ qset, onEnd, submitQuestionForScoring }: PlayerWidgetProps) {
  const [selectedQuestion, setSelectedQuestion] = useState(0)

  // TODO replace with actual qset logic
  const qsetQuestions = ['1', '2', '3']

  const questionComponents = useMemo(() => {
    return qsetQuestions.map((q, i) => (
      <Question
        key={i}
        question={['']}
        number={i + 1}
      />
    ))
  }, [])

  return (
    <div className={styles.playerApp}>
      <nav className={styles.header}>
        <h1>Python'd</h1>

        <div className={styles.questionButtons}>
          {qsetQuestions.map((q, i) => {
            const active = i === selectedQuestion
            const label = active ? `Question ${i + 1}` : i + 1
            return (
              <Button
                size="md"
                active={active}
                onClick={() => setSelectedQuestion(i)}
              >
                {label}
              </Button>
            )
          })}
        </div>

        <Button postIcon="/assets/arrow-forward.svg">Submit</Button>
      </nav>

      {questionComponents[selectedQuestion]}
    </div>
  )
}
