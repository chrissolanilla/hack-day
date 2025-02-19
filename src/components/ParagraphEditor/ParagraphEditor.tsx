import styles from './styles.module.css'

interface ParagraphEditorProps {
  value: string,
  onChange: (newValue: string) => void,
}

export default function ParagraphEditor({ value, onChange }: ParagraphEditorProps) {
  return (
    <textarea
      className={styles.paragraphEditor}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Put some text here"
      rows={5}
      value={value}
    />
  )
}
