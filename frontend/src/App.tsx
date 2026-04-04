import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/default')
        .then(res => res.json())
        .then(data => setMessage(data.message))
  }, [])

  return (
      <div>
        <h1>Nette + React</h1>
        <p>{message || 'Loading...'}</p>
      </div>
  )
}

export default App
