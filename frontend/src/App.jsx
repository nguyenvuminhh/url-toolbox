import { useState } from 'react'
import MainPane from './pages/MainPane'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainPane />
  )
}

export default App
