import React, { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
      <img
        src={images[index]}
        alt="Books Collection"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button className="btn btn-circle" onClick={prevSlide}>
          ❮
        </button>
        <button className="btn btn-circle" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
