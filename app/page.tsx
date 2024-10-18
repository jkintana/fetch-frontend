'use client'

import { useState, useEffect, ChangeEvent, Suspense } from 'react';
import BreedButton from '@/components/BreedDisplay';

// Home page. Displays a list of dog breeds and a search bar.
export default function Home() {
  const [status, setStatus] = useState<string>("Loading dog breeds...");
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
        setStatus("Couldn't fetch dog breeds at this time!");
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
      <input
        type="text"
        placeholder="Search for a dog breed!"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredBreeds.length === 0 && (
          <p>{status}</p>
        )}

        {filteredBreeds.length > 0 && (
          <div>
            {filteredBreeds.map(breed => (
              <li key={breed}>
                <BreedButton name={breed} />
              </li>
            ))}
          </div>
        )}
      </ul>
    </main>
  );
}
