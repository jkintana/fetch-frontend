'use client'

import { useState, useEffect } from 'react';

// Dynamically generated page that displays images of a specific dog breed. 
export default function Breed({ params }: { params: { slug: string } }) { 
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
            }
        };

        fetchImages();
    }, []);

    // Page content.
    return (
        <div>
            <title>{`${params.slug} | Dog Breeds Explorer`}</title>
            {/* Not exactly best practice, but wasn't sure how to do this. */}

            {images.map((image, index) => (
                <img key={index} src={image} alt={params.slug} />
            ))}
        </div>
    );
}