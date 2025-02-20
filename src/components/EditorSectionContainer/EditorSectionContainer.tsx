import styles from './styles.module.css'
import { ReactNode } from 'react'
import Button from '../Button/Button'

interface EditorSectionContainerProps {
  label: string,
  onDelete: () => void,
  children: ReactNode,
}

export default function EditorSectionContainer({ label, onDelete, children }: EditorSectionContainerProps) {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h3>{label}</h3>
        <Button
          size="sm"
          onClick={() => onDelete()}
          preIcon="/assets/trash.svg"
          color="transparent"
        />
      </div>
      <div className={styles.sectionBottom}>
        {children}
      </div>
    </div>
  )
}
