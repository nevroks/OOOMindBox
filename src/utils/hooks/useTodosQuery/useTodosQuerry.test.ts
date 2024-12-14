
import { describe, it, expect} from 'vitest'
import { z } from 'zod'
import { JsonPlaceholderTodo } from './useTodosQuery'

const JsonPlaceholderTodoSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
})

describe('useTodosQuery', () => {
    it('should return data that matches the JsonPlaceholderTodo schema', async () => {
        // Mocking the fetch response
        const response = fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=3')
        const todos = await response.then(res => res.json() as Promise<JsonPlaceholderTodo[]>)
        if (todos) {
            todos.forEach(todo => {
                expect(JsonPlaceholderTodoSchema.safeParse(todo).success).toBe(true)
            })
        } else {
            throw new Error('Data is null')
        }
    })
})