import styles from './styles.module.css'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps {
  color?: 'translucent',
  size?: 'sm' | 'md',
  fill?: boolean,
  active?: boolean,
  preIcon?: string,
  postIcon?: string,
  onClick?: () => void,
  children: ReactNode | ReactNode[],
}

export default function Button({
  color = 'translucent',
  size = 'md',
  fill = false,
  active = false,
  preIcon,
  postIcon,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx({
        [styles.button]: true,
        [styles.small]: size === 'sm',
        [styles.medium]: size === 'md',
        [styles.translucent]: color === 'translucent',
        [styles.fill]: fill,
        [styles.translucentActive]: active && color === 'translucent',
      })}
      type="button"
      onClick={onClick}
    >
      <div className={styles.buttonContents}>
        {preIcon && <img src={preIcon} alt="" />}
        {children}
        {postIcon && <img src={postIcon} alt="" />}
      </div>
    </button>
  )
}
