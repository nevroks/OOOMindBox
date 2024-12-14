import { FC, useMemo, useState } from 'react'
import styles from './style.module.css'
import { Todo } from '../../../utils/appTypes'
import TodoListItem from '../TodoListItem/TodoListItem'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import classNames from 'classnames'
type TodoFilterValues = 'all' | 'uncompleted' | 'completed'

type TodoListProps = {
	todos: Todo[]
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
	const [localTodos, setLocalTodos] = useState<Todo[]>(todos)
	const [newTodoTitle, setNewTodoTitle] = useState<string>('')
	const [filter, setFilter] = useState<TodoFilterValues>('all')

	const filteredTodos = useMemo(() => {
		switch (filter) {
			case 'all':
				return localTodos
			case 'uncompleted':
				return localTodos.filter(todo => !todo.completed)
			case 'completed':
				return localTodos.filter(todo => todo.completed)
		}
	}, [localTodos, filter])

	const completedTodosCount = useMemo(
		() => localTodos.filter(todo => todo.completed).length,
		[localTodos]
	)

	const handleCreateNewTodo = () => {
		if (newTodoTitle) {
			const newTodo: Todo = {
				completed: false,
				title: newTodoTitle,
				id: localTodos.length + 1
			}
			setLocalTodos([...localTodos, newTodo])
			setNewTodoTitle('')
		} else {
			alert('Введите название задачи')
		}
	}
	const handleToggleTodo = (id: number) => {
		const newTodos = localTodos.map(todo => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed }
			}
			return todo
		})
		setLocalTodos(newTodos)
	}
	const handleDeleteCompletedTodos = () => {
		setLocalTodos(localTodos.filter(todo => !todo.completed))
	}
	return (
		<motion.div layout className={styles['TodoList']}>
			<motion.input
				placeholder='Что будем делать?'
				type='text'
				value={newTodoTitle}
				onChange={e => setNewTodoTitle(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && handleCreateNewTodo()}
			/>
			<AnimatePresence>
				<motion.div layout className={styles['TodoList-todos']}>
					{filteredTodos.length === 0 && <div>Список задач пуст</div>}
					{filteredTodos.map(filteredTodo => (
						<TodoListItem
							handleToggleTodo={handleToggleTodo}
							key={filteredTodo.id}
							todo={filteredTodo}
						/>
					))}
				</motion.div>
			</AnimatePresence>
			<motion.div className={styles['TodoList-footer']}>
				<p className={styles['TodoList-footer-completed']}>
					{completedTodosCount} задач выполнено из {localTodos.length}
				</p>
				<div className={styles['TodoList-footer-actions']}>
					<button
						className={classNames(styles['TodoList-footer-actions-btn'], {
							[styles.active]: filter === 'all'
						})}
						onClick={() => setFilter('all')}
					>
						Все
					</button>
					<button
						className={classNames(styles['TodoList-footer-actions-btn'], {
							[styles.active]: filter === 'uncompleted'
						})}
						onClick={() => setFilter('uncompleted')}
					>
						Невыполненные
					</button>
					<button
						className={classNames(styles['TodoList-footer-actions-btn'], {
							[styles.active]: filter === 'completed'
						})}
						onClick={() => setFilter('completed')}
					>
						Выполненные
					</button>
				</div>
				<button onClick={handleDeleteCompletedTodos}>
					Удалить выполненные
				</button>
			</motion.div>
		</motion.div>
	)
}

export default TodoList
