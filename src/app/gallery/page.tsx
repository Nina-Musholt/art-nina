"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getArtworks() {
  const query = '*[_type == "artwork"]{ _id, title, image }';
  return await client.fetch(query);
}

export default function Gallery() {
  const [artworks, setArtworks] = useState<any[]>([]);
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

  const handleNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % artworks.length);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>

      {/* Grid of artworks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {artworks.map((art, index) => (
          <div
            key={art._id}
            className="shadow hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setCurrentIndex(index)}
          >
            {art.image && (
              <img
                src={urlFor(art.image).width(400).url()}
                alt={art.title}
                className="w-full h-80 object-contain bg-white"
              />
            )}
            <div className="p-2 text-center">{art.title}</div>
          </div>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setCurrentIndex(null)}
          >
            ✕
          </button>

          <button
            className="absolute left-5 text-white text-4xl"
            onClick={handlePrev}
          >
            ⟨
          </button>

          <img
            src={urlFor(artworks[currentIndex].image).width(1200).url()}
            alt={artworks[currentIndex].title}
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />

          <button
            className="absolute right-5 text-white text-4xl"
            onClick={handleNext}
          >
            ⟩
          </button>
        </div>
      )}
    </div>
  );
}