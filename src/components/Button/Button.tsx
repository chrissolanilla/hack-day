import styles from './styles.module.css'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps {
  color?: 'translucent' | 'transparent',
  size?: 'sm' | 'md',
  fill?: boolean,
  active?: boolean,
  preIcon?: string,
  postIcon?: string,
  popupEffect?: 'normal' | 'reduced',
  onClick?: () => void,
  children?: ReactNode | ReactNode[],
}

export default function Button({
  color = 'translucent',
  size = 'md',
  fill = false,
  active = false,
  preIcon,
  postIcon,
  popupEffect = 'normal',
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx({
        [styles.button]: true,
        [styles.normalPopup]: popupEffect === 'normal',
        [styles.reducedPopup]: popupEffect === 'reduced',
        [styles.small]: size === 'sm',
        [styles.medium]: size === 'md',
        [styles.translucent]: color === 'translucent',
        [styles.transparent]: color === 'transparent',
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
