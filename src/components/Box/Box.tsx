import styles from './styles.module.css'
import { ReactNode } from 'react'

interface BoxProps {
  extraClass?: string | null,
  children: ReactNode | ReactNode[],
}

export default function Box({ extraClass, children }: BoxProps) {
  return (
    <div className={`${styles.box} ${extraClass || ''}`}>
      {children}
    </div>
  )
}
