import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input])
      setInput('')
    }
  }

  const deleteTodo = (indexToRemove) => {
    setTodos(todos.filter((_, i) => i !== indexToRemove))
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button onClick={addTodo}>Add</Button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo, i) => (
              <li key={i} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span>{todo}</span>
                <button
                  onClick={() => deleteTodo(i)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}