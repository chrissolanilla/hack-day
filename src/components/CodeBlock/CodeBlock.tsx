import styles from './styles.module.css'
import { ReactNode } from 'react'

interface CodeBlockProps {
  children: ReactNode,
}

export default function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className={styles.codeBlock}>
      {children}
    </pre>
  )
}
