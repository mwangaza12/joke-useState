import { useState } from "react";
import type { Joke } from "../types/types";

interface JokeProps {
  joke: Joke;
  increaseRates: (id: number) => void;
  decreaseRates: (id: number) => void;
  updateJoke: (joke: Joke) => void;
  deleteJoke: (id: number) => void;
}

export const JokeComponent = ({ joke, increaseRates, decreaseRates, updateJoke, deleteJoke }: JokeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJoke, setEditedJoke] = useState(joke.joke);

  const handleUpdate = () => {
    updateJoke({ ...joke, joke: editedJoke });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
          style={{padding: "10px"}}
            type="text"
            value={editedJoke}
            onChange={(e) => setEditedJoke(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{joke.joke}</h3>
          <p>Likes: {joke.rate}</p>
          <button onClick={() => increaseRates(joke.id)} className="btn btn-sm">👍</button>
          <button onClick={() => decreaseRates(joke.id)} className="btn btn-sm">👎</button>
          <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-warning">Edit</button>
          <button onClick={() => deleteJoke(joke.id)} className="btn btn-sm btn-danger">Delete</button>
        </>
      )}
    </div>
  );
};
