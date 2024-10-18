'use client'

import './page.css';

import { useState, useEffect } from 'react';
import DogImage from '@/components/DogImage';

// Dynamically generated page that displays images of a specific dog breed. 
export default function Breed({ params }: { params: { slug: string } }) {
    const [status, setStatus] = useState<string>("Fetching dog images...");
    const [images, setImages] = useState<string[]>([]);
    
    // On page load, fetch images of the dog breed from the API.
    // TODO: handle case where breed doesn't exist.
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`https://dog.ceo/api/breed/${params.slug}/images`);
                if (!response.ok) {
                    throw new Error("Failed to fetch dog images!");
                }
                const data = await response.json();
                setImages(data.message);
            } catch (err) {
                console.error(err);
                setStatus(`Couldn't fetch images of ${params.slug}!`);
            }
        };

        fetchImages();
    }, []);

    // Page content.
    return (
        <div>
            <title>{`${params.slug} | Dog Breeds Explorer`}</title>
            {/* Not exactly best practice, but wasn't sure how to do this. */}

            {images.length === 0 && (
                <div className="status">
                    <h2>{status}</h2>
                </div>
            )}

            <div className="container">
                {images.map((image, index) => (
                    <div className="item" key={index}>
                        <a href={image} target="_blank">
                            <DogImage key={index} src={image} alt={params.slug} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}