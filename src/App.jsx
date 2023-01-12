import { useState } from 'react'
import './App.css'
import { saveData } from './assets/saveData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Weather Wizard</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
