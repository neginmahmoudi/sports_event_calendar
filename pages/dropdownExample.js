import { useEffect, useState } from 'react';

export default function SingleEvent() {
  const [input, setInput] = useState('');
  const [allGenres, setAllGenres] = useState([]);

  const baseUrl = 'http://localhost:3000/api/genre';

  const handleClick = () => {
    setInput('');
  };

  // async function getAllGenre() {
  //   const response = await fetch(baseUrl);
  //   const allGenresdata = await response.json();
  //   setAllGenres(allGenresdata);
  // }

  async function createNewGenre() {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: input }),
    });
    const createdGenre = await response.json();
    setAllGenres([...allGenres, createdGenre]);
  }

  async function deleteGenre(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const deletedGenre = await response.json();
    setAllGenres(allGenres.filter((genre) => genre.id !== deletedGenre.id));
  }

  return (
    <div>
      <h1>API</h1>
      <input
        value={input}
        onChange={(event) => {
          setInput(event.currentTarget.value);
        }}
      />
      <button
        onClick={async () => {
          await createNewGenre();
          handleClick();
        }}
      >
        return
      </button>

      <br />
      <br />
      <br />

      {allGenres?.map((genre) => {
        console.log('this is meee', allGenres);
        return (
          <>
            <div key={`genres-${genre.id}`}>{genre.name}</div>
            <button
              onClick={async () => {
                await deleteGenre(genre.id);
              }}
            >
              remove
            </button>
            <button
              onClick={async () => {
                await editGenre(genre.id);
              }}
            >
              edit
            </button>
          </>
        );
      })}
    </div>
  );
}
