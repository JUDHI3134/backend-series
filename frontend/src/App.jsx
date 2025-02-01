import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [jokes, setJokes] = useState([])

  const fetchJokes = async () => {
    const {data} = await axios.get("/api/jokes")
    setJokes(data)
  }

  useEffect(() => {
    fetchJokes()
  },[])

  // console.log(jokes)

  return (
    <>
      <h1>Hello World</h1>
      <p>TOTAL JOKES : {jokes.length}</p>
      <div>
        {jokes.map((joke, index) => (
          <div key={index}>
            <p>Joke No : { joke.id}</p>
            <p>{ joke.title}</p>
            <p>{ joke.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
