import { FC, MouseEvent } from 'react'
import styles from './Button.module.scss'

interface IButton {
  text: string,
  color?: string
  handleClick?: () => void
}

const Button:FC<IButton> = ({color, text, handleClick}) => {
  return (
    <button className={styles.btn} style={{backgroundColor: color}} onClick={(e: MouseEvent<HTMLButtonElement>) => {
      if(handleClick) {
        e.stopPropagation()
        handleClick()
      }
      
    }}>{text}</button>
  )
}

export default Button