"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define the Artwork type
type Artwork = {
  _id: string;
  title: string;
  description?: string;
  image?: SanityImageSource; // can later refine with proper Sanity Image type
};

async function getArtworks() {
  const query = '*[_type == "artwork"]{ _id, title, description, image }';
  return await client.fetch(query);
}

export default function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Load artworks from Sanity
  useEffect(() => {
    getArtworks().then(setArtworks);
  }, []);

  const handlePrev = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + artworks.length) % artworks.length);
    }
  };

  // Close on ESC key
  useEffect(() => {const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurrentIndex(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % artworks.length);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-20">
      <h1 className="text-5xl font-bold mb-4">Art by Nina</h1>
      <p className="text-lg text-gray-600 max-w-2xl">
        Willkommen in meiner Online-Galerie – eine Sammlung meiner Werke und
        kreativen Projekte.
      </p>
    
      {/* Grid of artworks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {artworks.map((art, index) => (
          <div
            key={art._id}
            className="shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden bg-white cursor-pointer"
            onClick={() => setCurrentIndex(index)}
          >
            {art.image && (
              <img
                src={urlFor(art.image).width(200).height(300).url()}
                alt={art.title}
                className="w-full h-110 object-contain bg-white"
              />
            )}
            {/*<div className="p-2 text-center">{art.title}</div>*/}
          </div>
        ))}
      </div>

   {/* Modal / Lightbox */}
{currentIndex !== null && (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-2"
    onClick={() => setCurrentIndex(null)}
  >
    <div
      className="relative w-full max-w-3xl bg-transparent flex flex-col items-center text-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-white text-2xl sm:text-3xl font-bold z-50"
        onClick={() => setCurrentIndex(null)}
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-white text-xl sm:text-2xl font-bold mb-2">
        {artworks[currentIndex].title}
      </h2>

      {/* Image */}
      {artworks[currentIndex].image ? (
        <img
          src={urlFor(artworks[currentIndex].image).width(1000).url()}
          alt={artworks[currentIndex].title}
          className="w-full max-h-[70vh] object-contain mx-auto"
        />
        ) : (
        <p className="text-gray-400 italic">No image available</p>
      )}

      {/* Description */}
      <p className="text-gray-200 text-sm sm:text-base mt-3 px-2">
        {artworks[currentIndex].description}
      </p>

      {/* Left Arrow */}
      <button
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl z-50 bg-black/40 p-2 rounded-full hover:bg-black/70"
        onClick={handlePrev}
      >
        ⟨
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl z-50 bg-black/40 p-2 rounded-full hover:bg-black/70"
        onClick={handleNext}
      >
        ⟩
      </button>
    </div>
  </div>
)}
    </div>
  );
}