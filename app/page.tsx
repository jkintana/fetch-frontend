'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import BreedButton from '@/components/BreedDisplay';

// Home page. Displays a list of dog breeds and a search bar.
export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);

  // On page load, fetch dog breeds from the API.
  // Handle errors as necessary.
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!response.ok) {
          throw new Error("Failed to fetch dog breeds!");
        }
        const data = await response.json();
        setBreeds(Object.keys(data.message));
      } catch (err) {
        console.error(err);
        setError("Couldn't fetch dog breeds at this time!"); // TODO - Edit this
      }
    };

    fetchBreeds();
  }, []);

  // On page load, set up the filtered breeds state.
  // Since the breeds list is pretty short we're just doing this on the client.
  useEffect(() => {
    setFilteredBreeds(
      breeds.filter(breed =>
        breed.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, breeds]);

  // Updates the search term state when the user types.
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Page content.
  // TODO - Add better error handling rather than just a text with the error.
  return (
    <main>
      <p>{error}</p>
      <input
        type="text"
        placeholder="Search for a dog breed!"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredBreeds.map(breed => (
          <li key={breed}>
            <BreedButton name={breed} />
          </li>
        ))}
      </ul>
    </main>
  );
}
