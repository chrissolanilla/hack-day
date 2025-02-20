import '@/globals.css'
import appStyles from '../app.module.css'
import { Qset } from '../utils/qset'
import { ModalContext } from '../utils/modal-context'
import Button from '../components/Button/Button'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import QuestionEditor from '../components/QuestionEditor/QuestionEditor'
import { EditorQuestion, QuestionContent } from '../utils/editorQuestion'
import { convertToInternal, convertToQset } from '../utils/saver'
import LabelledInput from '../components/LabelledInput/LabelledInput';

interface CreatorWidgetProps {
  title: string | null,
  qset: Qset,
  updateTitle: (newTitle: string) => void,
  registerSaver: (validator: () => Qset | string) => void,
}

export default function CreatorWidget({ title, qset, updateTitle, registerSaver }: CreatorWidgetProps) {
  const [modal, setModal] = useState<ReactNode | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState(0)
  const [widgetTitle, setWidgetTitle] = useState('My Python\'d Widget')

  const [questions, setQuestions] = useState<EditorQuestion[]>(() => convertToInternal(qset))

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
          updateAnswer={(newInputs, newOutputs) => {
            const newQuestions = [...questions]
            newQuestions[index].inputs = newInputs
            newQuestions[index].outputs = newOutputs
            setQuestions(newQuestions)
          }}
          onDelete={() => deleteQuestion(index)}
        />
      )
    })
  }, [questions])

  // Register saver with materia
  registerSaver(() => {
    updateTitle('lol')
    return convertToQset(questions)
  })

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
                  key={index}
                >
                  {label}
                </Button>
              )
            })}
            {/* New question button */}
            <Button size="md" onClick={createQuestion}>+</Button>
          </div>

          <LabelledInput
            label="Widget Title"
            value={widgetTitle}
            onUpdate={setWidgetTitle}
          />
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
