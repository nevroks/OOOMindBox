import { createBrowserRouter } from 'react-router-dom'

import MainPage from '../../pages/MainPage/MainPage'

const router = createBrowserRouter([
	{
		index: true,
		element: <MainPage />
	}
])

export default router
