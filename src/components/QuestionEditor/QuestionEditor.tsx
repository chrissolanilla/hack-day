import styles from './styles.module.css'
import Box from '../Box/Box'
import Button from '../Button/Button'
import { useCallback } from 'react'
import CodeBlockEditor from '../CodeBlock/CodeBlockEditor'
import { EditorQuestion, QuestionContent } from '../../utils/editorQuestion'
import ParagraphEditor from '../ParagraphEditor/ParagraphEditor'
import EditorSectionContainer from '../EditorSectionContainer/EditorSectionContainer'
import TestCase from '../TestCase/TestCase'

interface QuestionEditorProps {
  question: EditorQuestion,
  updateContent: (newContent: QuestionContent[]) => void,
  updateAnswer: (newInputs: string[], newOutputs: string[]) => void,
  onDelete: () => void,
  index: number,
}

export default function QuestionEditor({ question, updateContent, updateAnswer, onDelete, index }: QuestionEditorProps) {
  const content = question.content

  // Content adders
  const addParagraphBlock = useCallback(() => {
    updateContent([...content, { type: 'para', val: '' }])
  }, [content])

  const addCodeBlock = useCallback(() => {
    updateContent([...content, { type: 'code', val: '' }])
  }, [content])

  const deleteBlock = useCallback((index: number) => {
    updateContent([...content.slice(0, index), ...content.slice(index + 1)])
  }, [content])

  // Test case utils
  const addTestCase = useCallback(() => {
    updateAnswer(
      [...question.inputs, ''], [...question.outputs, ''],
    )
  }, [question])

  const deleteTestCase = useCallback((index: number) => {
    updateAnswer(
      [...question.inputs.slice(0, index), ...question.inputs.slice(index + 1)],
      [...question.outputs.slice(0, index), ...question.outputs.slice(index + 1)],
    )
  }, [question])

  return (
    <div className={styles.editorArea}>
      <Box extraClass={styles.editorBox}>
        <div className={styles.questionHeader}>
          <h2>{`Question ${index + 1}`}</h2>
          <Button onClick={onDelete} preIcon="/assets/trash.svg">Delete question</Button>
        </div>

        {/* Existing content */}
        {content.map((c, i) => {
          if (c.type === 'code') {
            // TODO keys probably shoudln't be the index. but we don't have any other sort of ID for now
            return (
              <EditorSectionContainer key={i} label="Code" onDelete={() => deleteBlock(i)}>
                <CodeBlockEditor
                  value={c.val}
                  onChange={(newVal) => {
                    const newContent = [...content]
                    newContent[i].val = newVal
                    updateContent(newContent)
                  }}
                />
              </EditorSectionContainer>
            )
          } else if (c.type === 'para') {
            // TODO keys probably shoudln't be the index. but we don't have any other sort of ID for now
            return (
              <EditorSectionContainer key={i} label="Paragraph" onDelete={() => deleteBlock(i)}>
                <ParagraphEditor
                  value={c.val}
                  onChange={(newVal) => {
                    const newContent = [...content]
                    newContent[i].val = newVal
                    updateContent(newContent)
                  }}
                />
              </EditorSectionContainer>
            )
          } else {
            return null
          }
        }) }

        {/* New content */}
        <div className={styles.addContentButtons}>
          <Button
            fill
            popupEffect="reduced"
            onClick={addParagraphBlock}
          >
            Add paragraph
          </Button>
          <Button
            fill
            popupEffect="reduced"
            onClick={addCodeBlock}
          >
            Add code block
          </Button>
        </div>
      </Box>
      <Box extraClass={styles.editorBox}>
        <h2>Test Cases</h2>

        {question.inputs.map((input, index) => {
          // TODO keys probably shoudln't be the index. but we don't have any other sort of ID for now
          return (
            <TestCase
              input={input}
              output={question.outputs[index]}
              updateInput={(newVal) => {
                const newInputs = [...question.inputs]
                newInputs[index] = newVal
                updateAnswer(newInputs, question.outputs)
              }}
              updateOutput={(newVal) => {
                const newOuts = [...question.outputs]
                newOuts[index] = newVal
                updateAnswer(question.inputs, newOuts)
              }}
              onDelete={() => deleteTestCase(index)}
              index={index}
              key={index}
            />
          )
        })}

        <Button
          fill
          popupEffect="reduced"
          onClick={addTestCase}
        >
          Add test case
        </Button>
      </Box>
    </div>

  )
}
