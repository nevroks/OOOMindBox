import { useEffect, useState } from 'react'
import { Todo } from '../../appTypes'

export type JsonPlaceholderTodo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

const useTodosQuery = () => {
    const [data, setData] = useState<Todo[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=3')
            .then(res => res.json() as Promise<JsonPlaceholderTodo[]>)
            .then(json => setData(json.map(({ userId, ...rest }) => rest)))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { data, loading, error }
}

export default useTodosQuery
