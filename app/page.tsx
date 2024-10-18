'use client'

import './page.css';

import { useState, useEffect, ChangeEvent } from 'react';
import BreedDisplay from '@/components/BreedDisplay';

// Home page. Displays a list of dog breeds and a search bar.
export default function Home() {
  const [status, setStatus] = useState<string>("Loading dog breeds...");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [breedImages, setBreedImages] = useState<Map<string, string>>(new Map());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);

  // On page load, fetch dog breeds from the API.
  // Handle errors as necessary.
  useEffect(() => {
    // Helper function to fetch a random image of a dog breed.
    const fetchBreedImage = async (breedName: string) => { 
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`);
        if (!response.ok) {
          throw new Error(`Failed to fetch dog image for ${breedName}!`);
        }
        const data = await response.json();
        return data.message;
      } catch (err) {
        console.error(err);
        return "";
      }
    }

    // Fetches all dog breed names.
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!response.ok) {
          throw new Error("Failed to fetch dog breeds!");
        }
        const data = await response.json();

        // Fetch images for each breed.
        Object.keys(data.message).forEach(async (breed: string) => {
          const image = await fetchBreedImage(breed);
          setBreedImages((prev) => {
            const newMap = new Map(prev);
            newMap.set(breed, image);
            return newMap;
          });
        });

        // Set the breeds state.
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
  return (
    <main>
      <div id="searchContainer">
        <input
          type="text"
          placeholder=" Search for a dog breed!"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {breedImages.size === 0 && (
          <div className="status">
            <h2>{status}</h2>
          </div>
        )}

        {breedImages.size > 0 && (
          <div className="container">
            {filteredBreeds.map(breed => (
              <BreedDisplay name={breed} imageURL={breedImages.get(breed)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
