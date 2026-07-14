import {useState, useEffect} from "react";

type Todo = { id: number; text: string; done: boolean }
export default function Todo() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchTodos() }, []);

    async function fetchTodos() {
        const res = await fetch('/api/todos');
        console.log(res);
        setTodos(await res.json());
        setLoading(false);
    }

    async function addTodo()
    {
        if (!input.trim()) return;

        await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: input.trim()})
        });
        setInput('');
        fetchTodos();
    }

    async function toggleTodo(todo: Todo) {
        await fetch(`/api/todos/${todo.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ done: !todo.done }),
        })
        fetchTodos()
    }

    async function deleteTodo(id: number) {
        await fetch(`/api/todos/${id}`, { method: 'DELETE' })
        fetchTodos()
    }

    return (
        <div style={{ maxWidth: 520, margin: 'auto' }}>
            <h4 className="fw-medium mb-3">Todo List</h4>

            <div className="d-flex gap-2 mb-3">
                <input
                    className="form-control"
                    placeholder="Add a new task..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTodo()}
                />
                <button className="btn btn-primary px-3" onClick={addTodo}>Add</button>
            </div>

            {loading && <p className="text-muted">Loading...</p>}

            {todos.map(todo => (
                <div key={todo.id} className="d-flex align-items-center gap-2 p-2 mb-2 border rounded" style={{ background: todo.done ? '#d1ffb5' : 'white' }}>
                    <input
                        type="checkbox"
                        className="form-check-input mt-0"
                        checked={todo.done}
                        onChange={() => toggleTodo(todo)}
                    />
                    <span className="flex-grow-1" style={{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#aaa' : 'inherit' }}>
                        {todo.text}
                     </span>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(todo.id)}>✕</button>
                </div>
            ))}

            {!loading && todos.length === 0 && (
                <p className="text-muted">No tasks yet. Add one above!</p>
            )}
        </div>
    )
}