import { FC } from 'react'
import styles from './style.module.css'
import { Todo } from '../../../utils/appTypes'
import { motion, Variants } from 'framer-motion'
import Checkbox from '../../ui/Checkbox/Checkbox'

const TodoListItemVariants: Variants = {
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.6,
			type: 'spring',
			ease: 'linear'
		}
	},
	hidden: {
		scale: 0,
		opacity: 0,
		transition: {
			duration: 0.6,
			type: 'spring',
			ease: 'linear'
		}
	}
}

type TodoListItemProps = {
	todo: Todo
	handleToggleTodo: (id: number) => void
}

const TodoListItem: FC<TodoListItemProps> = ({ todo, handleToggleTodo }) => {
	return (
		<motion.div
			variants={TodoListItemVariants}
			initial='hidden'
			animate='visible'
			exit='hidden'
			className={styles['TodoListItem']}
			layout
		>
			<motion.div className={styles['TodoListItem-content']}>
				<Checkbox
					checked={todo.completed}
					handleChange={() => {
						handleToggleTodo(todo.id)
					}}
				/>
				<p>{todo.title}</p>
			</motion.div>
			<motion.div className={styles['TodoListItem-divider']}></motion.div>
		</motion.div>
	)
}

export default TodoListItem
