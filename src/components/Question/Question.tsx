import styles from './styles.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'
import { Editor, useMonaco } from '@monaco-editor/react'
import { useEffect, useRef } from 'react'
import Markdown from 'react-markdown';

interface QuestionProps {
  question: string[],
  number: number,
}

export default function Question({ question, number }: QuestionProps) {
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
      <div className={styles.questionsContainer}>
        <h2>{`Question ${number}`}</h2>
        {/*{question.map((question, i) => <p key={i}>{question}</p>)}*/}
        {/*<p>*/}
        {/*  Write some code that generates a fibonacci sequence, or something. Something that works at all. It just needs*/}
        {/*  to return anything. Something.*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  Anything at all works. It doesn't have to be a fibonacci sequence. It could be complete garbage. Professors*/}
        {/*  ever don't check the answers, anyway*/}
        {/*</p>*/}
        {/*<p>Here, have some example output:</p>*/}
        {/*<CodeBlock>0, 1, 1, 2, 3, 5, ...</CodeBlock>*/}
        <Markdown>
          {'# Hi, *Pluto*!\n- list item 1\n- list item 2\n```py\n# test\n```'}
        </Markdown>
      </div>

      <div className={styles.editorContainer}>
        <Editor
          defaultLanguage="python"
          defaultValue="# comment"
          height="100%"
          theme="default"
        />
      </div>
    </div>
  )
}
