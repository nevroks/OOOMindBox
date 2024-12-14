import TodoList from '../../components/Todo/TodoList/TodoList'
import useDocumentTitle from '../../utils/hooks/useDocumentTitle/useDocumentTitle'
import useTodosQuery from '../../utils/hooks/useTodosQuery/useTodosQuery'
import { motion } from 'framer-motion'
import styles from './style.module.css'

const MainPage = () => {
	useDocumentTitle()

	const {
		data: todos,
		loading: todosLoading,
		error: todosError
	} = useTodosQuery()
    
	return (
		<div className={styles['MainPage']}>
			<h1 className={styles['MainPage-title']}>Приветствую</h1>
			<div className={styles['MainPage-todos-wrapper']}>
				<motion.h2 className={styles['MainPage-todos-title']}>Todos list:</motion.h2>
				{todosError && <h2>ERROR: {todosError}</h2>}
				{todosLoading && <h2>Loading...</h2>}
				{!todosLoading && !todosError && <TodoList todos={todos!} />}
			</div>
		</div>
	)
}

export default MainPage
