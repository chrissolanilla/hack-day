import styles from './styles.module.css'

interface LabelledInputProps {
  label: string,
  value: string,
  onUpdate: (newVal: string) => void,
}

export default function LabelledInput({ label, value, onUpdate }: LabelledInputProps) {
  return (
    <div className={styles.labelledInputContainer}>
      {label}
      <input
        className={styles.labelledInput}
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
      />
    </div>
  )
}
