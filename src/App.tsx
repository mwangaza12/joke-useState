import { useState } from 'react';
import './App.css'
import { JokeComponent } from './components/JokeComponent';
import type { Joke } from './types/types';

function App() {
  const InitialJokes = [
    {
      id: 1,
      joke: 'What do you call a very small valentine? A valen-tiny!!!',
      rate: 0
    },
    {
      id: 2,
      joke: 'What did the dog say when he rubbed his tail on the sandpaper? Ruff, Ruff!!!',
      rate: 5
    },
    {
      id: 3,
      joke: "Why don't sharks like to eat clowns? Because they taste funny!!!",
      rate: 10
    }
  ];

  const [jokes, setJokes] = useState<Joke[]>(InitialJokes);
  const [joke, setJoke] = useState<string>('');

  const addJoke = () => {
    if (joke.trim()) {
      setJokes([
        ...jokes,
        { id: Date.now(), joke, rate: 0 }
      ]);
      setJoke('');
    }
  };

  const increaseRates = (id: number) => {
    setJokes(jokes.map(j => j.id === id ? { ...j, rate: j.rate + 1 } : j));
  };

  const decreaseRates = (id: number) => {
    setJokes(jokes.map(j => j.id === id ? { ...j, rate: j.rate - 1 } : j));
  };

  const updateJoke = (updatedJoke: Joke) => {
    setJokes(jokes.map(j => j.id === updatedJoke.id ? updatedJoke : j));
  };

  const deleteJoke = (id: number) => {
    setJokes(jokes.filter(j => j.id !== id));
  };

  return (
    <>
      <input
        type="text"
        style={{padding: "10px"}}
        value={joke}
        onChange={e => setJoke(e.target.value)}
        placeholder="Enter a new joke"
      />
      <button onClick={addJoke}>Add Joke</button>

      {jokes.map((j) => (
        <JokeComponent
          key={j.id}
          joke={j}
          increaseRates={increaseRates}
          decreaseRates={decreaseRates}
          updateJoke={updateJoke}
          deleteJoke={deleteJoke}
        />
      ))}
    </>
  );
}

export default App;
