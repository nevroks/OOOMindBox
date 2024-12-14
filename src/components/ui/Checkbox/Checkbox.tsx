import { ChangeEventHandler, FC } from 'react'
import styles from './style.module.css'
import classNames from 'classnames'

type CheckboxProps = {
	checked: boolean
	handleChange: ChangeEventHandler<HTMLInputElement> | undefined
}

const Checkbox: FC<CheckboxProps> = ({ checked, handleChange }) => {
	return (
		<input
			className={classNames(styles['checkbox'], {
				[styles.checked]: checked
			})}
			type='checkbox'
			checked={checked}
			onChange={handleChange}
		/>
	)
}

export default Checkbox
