import { createBrowserRouter } from 'react-router-dom'

import MainPage from '../../pages/MainPage/MainPage'
import { APP_PATHS } from '../constants/appPaths'

const router = createBrowserRouter([
    {
        path: `${import.meta.env.BASE_URL}/${APP_PATHS.MAIN_PAGE}`,
        element: <MainPage />
    }
])

export default router
