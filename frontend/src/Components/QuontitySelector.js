import React, { useState } from "react";

const QuantitySelector = ({ initial = 1, onChange }) => {
  const [quantity, setQuantity] = useState(initial);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (onChange) onChange(newQty);
    }
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (onChange) onChange(newQty);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-2">
      <button
        onClick={handleDecrease}
        className="px-3 py-1 rounded hover:bg-gray-300 transition"
      >
        -
      </button>
      <span className="px-4 py-1 border rounded text-center min-w-[30px]">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        className="px-3 py-1 rounded hover:bg-gray-300 transition"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
