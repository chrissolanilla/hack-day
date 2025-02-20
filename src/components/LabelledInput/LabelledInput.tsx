import styles from './styles.module.css'
import clsx from 'clsx'

interface LabelledInputProps {
  label: string,
  value: string,
  onUpdate: (newVal: string) => void,
  fill?: boolean,
}

export default function LabelledInput({ label, value, onUpdate, fill = false }: LabelledInputProps) {
  return (
    <div className={clsx({
      [styles.labelledInputContainer]: true,
      [styles.fill]: fill,
    })}>
      {label}
      <input
        className={styles.labelledInput}
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
      />
    </div>
  )
}
