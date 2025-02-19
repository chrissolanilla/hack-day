import styles from './styles.module.css'
import Box from '../Box/Box'
import Button from '../Button/Button'
import { useCallback } from 'react'
import CodeBlockEditor from '../CodeBlock/CodeBlockEditor'
import { EditorQuestion, QuestionContent } from '../../utils/editorQuestion'
import ParagraphEditor from '../ParagraphEditor/ParagraphEditor'
import EditorSectionContainer from '../EditorSectionContainer/EditorSectionContainer'

interface QuestionEditorProps {
  question: EditorQuestion,
  updateContent: (newContent: QuestionContent[]) => void,
  onDelete: () => void,
  index: number,
}

export default function QuestionEditor({ question, updateContent, onDelete, index }: QuestionEditorProps) {
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
            // TODO add keys but dont use index
            return (
              <EditorSectionContainer label="Code" onDelete={() => deleteBlock(i)}>
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
            return (
              <EditorSectionContainer label="Paragraph" onDelete={() => deleteBlock(i)}>
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
      </Box>
    </div>

  )
}
