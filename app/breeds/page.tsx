'use client'

import { useState, useEffect } from 'react';
import BreedButton from '@/components/BreedDisplay';

export default function DogSearch() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // On page load, fetch dog breeds from the API.
  // Handle errors as necessary.
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");

        if (!response.ok) {
          throw new Error("Failed to fetch dog breeds");
        }
        const data = await response.json();
        setBreeds(Object.keys(data.message));

      } catch (err) {
        setError("An error occurred while fetching dog breeds. Please try again later.");
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

  // Function that updates the search term state.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
