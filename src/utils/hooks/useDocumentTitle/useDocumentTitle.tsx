import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { APP_PATHS } from '../../constants/appPaths'

const useDocumentTitle = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		let currentPage = 'not found'

		Object.entries(APP_PATHS).forEach(([key, value]) => {
			if (pathname === value) {
				currentPage = key.toLowerCase()
			}
		})

		const title = 'ooomindbox | ' + currentPage
		document.title = title
	}, [pathname])
}
export default useDocumentTitle
