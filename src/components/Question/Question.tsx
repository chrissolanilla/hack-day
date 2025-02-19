import styles from './styles.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'
import { Editor, useMonaco } from '@monaco-editor/react'
import { useContext, useEffect, useRef } from 'react';
import { GameQuestionState, GameStateAction } from '../../utils/game-start-reducer'
import { ModalContext } from '../../utils/modal-context';
import Box from '../Box/Box';

interface QuestionProps {
  question: string[],
  index: number,
  questionState: GameQuestionState,
  updateState: (action: GameStateAction) => void,
}

export default function Question({ question, index, questionState, updateState }: QuestionProps) {
  const monaco = useMonaco()
  const monacoInitialized = useRef<boolean>(false)

  // Initialize monaco
  useEffect(() => {
    if (!monaco) return // monaco might have not loaded yet
    if (monacoInitialized.current) return // we have already initialized monaco

    // Setup theme
    monaco.editor.defineTheme('default', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1c1c33',
      },
    })
    monaco.editor.setTheme('default')

    monacoInitialized.current = true
  }, [monaco])

  return (
    <div className={styles.questionArea}>
      <Box extraClass={styles.questionsContainer}>
        <h2>{`Question ${index + 1}`}</h2>
        {/* Display/convert question text array */}
        {question.map((question, i) => {
          if (question.startsWith('@code:')) {
            const codeBlockText = question.substring(6)
            return <CodeBlock key={i}>{codeBlockText}</CodeBlock>
          } else if (question.startsWith('@para:')) {
            const paragraphText = question.substring(6)
            return <p>{paragraphText}</p>
          } else {
            return null
          }
        })}
      </Box>

      <div className={styles.editorContainer}>
        <Editor
          defaultLanguage="python"
          defaultValue="# Put your code here"
          height="100%"
          theme="default"
          value={questionState.playerAnswer}
          onChange={(e) => updateState({
            do: 'updatePlayerAnswer',
            question: index,
            opt: { value: e },
          })}
        />
      </div>
    </div>
  )
}
