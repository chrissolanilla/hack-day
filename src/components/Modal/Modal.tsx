import styles from './styles.module.css'
import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode | ReactNode[],
}

export default function Modal({ children }) {
  return (
    <div className={styles.modal}>
      {children}
    </div>
  )
}
