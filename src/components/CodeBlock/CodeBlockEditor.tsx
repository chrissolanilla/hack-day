import styles from './styles.module.css'

interface CodeBlockEditorProps {
  value: string,
  onChange: (newValue: string) => void,
}

export default function CodeBlockEditor({ value, onChange }: CodeBlockEditorProps) {
  return (
    <textarea
      className={`${styles.codeBlock} ${styles.codeBlockEditor}`}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Put your code here"
      rows={3}
      value={value}
    >

    </textarea>
  )
}
