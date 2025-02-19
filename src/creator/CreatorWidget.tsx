import '@/globals.css'
import appStyles from '../app.module.css'
import { Qset } from '../utils/qset'
import { ModalContext } from '../utils/modal-context'
import Button from '../components/Button/Button'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import QuestionEditor from '../components/QuestionEditor/QuestionEditor'
import { EditorQuestion, QuestionContent } from '../utils/editorQuestion'

interface CreatorWidgetProps {
  title: string | null,
  qset: Qset,
  updateTitle: (newTitle: string) => void,
  registerSaver: (validator: () => Qset | string) => void,
}

export default function CreatorWidget({ title, qset, updateTitle, registerSaver }: CreatorWidgetProps) {
  const [modal, setModal] = useState<ReactNode | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState(0)

  const [questions, setQuestions] = useState<EditorQuestion[]>(() => {
    // Generate initial set of questions from qset
    if (!qset?.items) return []

    return qset.items.map((item) => {
      // Convert each qset item to EditorQuestion item
      const question = item.questions[0]

      // Convert question contents
      const questionContents = question.text.map<QuestionContent>((rawQuestion) => {
        const trimmedText = rawQuestion.substring(6)
        if (rawQuestion.startsWith('@para:'))
          return { type: 'para', val: trimmedText }
        else if (rawQuestion.startsWith('@code:'))
          return { type: 'code', val: trimmedText }
        else return null
      }).filter((q) => !!q) // Filter out null

      // Construct final object
      return {
        content: questionContents,
        inputs: [],
        outputs: [],
      }
    })
  })

  // Create new question
  const createQuestion = useCallback(() => {
    const newQuestion: EditorQuestion = {
      content: [{ type: 'para', val: '' }],
      inputs: [],
      outputs: [],
    }

    setQuestions([...questions, newQuestion])
    setSelectedQuestion(questions.length)
  }, [questions])

  // Delete question
  const deleteQuestion = useCallback((index: number) => {
    setQuestions([...questions.slice(0, index), ...questions.slice(index + 1)])
    setSelectedQuestion(Math.min(selectedQuestion, questions.length - 2))
  }, [questions, selectedQuestion])

  // Create question editor components
  const questionEditorComponents = useMemo(() => {
    return questions.map((q, index) => {
      return (
        <QuestionEditor
          key={index}
          index={index}
          question={q}
          updateContent={(newContent) => {
            const newQuestions = [...questions]
            newQuestions[index].content = newContent
            setQuestions(newQuestions)
          }}
          onDelete={() => deleteQuestion(index)}
        />
      )
    })
  }, [questions])

  return (
    <ModalContext.Provider value={setModal}>
      <div className={appStyles.app}>
        <nav className={appStyles.header}>
          <h1>Python'd</h1>

          <div className={appStyles.questionButtons}>
            {/* Existing question buttons */}
            {questions.map((_, index) => {
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
            {/* New question button */}
            <Button size="md" onClick={createQuestion}>+</Button>
          </div>

          <Button>
            Save
          </Button>
        </nav>

        {questionEditorComponents[selectedQuestion]}
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
