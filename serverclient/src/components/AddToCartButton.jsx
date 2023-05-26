import React from 'react';

export default function AddToCartButton({ elementId }) {
    const addToCart = async () => {
      try {
        const response = await fetch('/api/addToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ elementId: elementId }),
        });
  
        if (response.ok) {
          console.log('Product added to cart!');
        } else {
          console.error('Failed to add product to cart.');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <button className='btn' onClick={addToCart}>
        Add to Cart
      </button>
    );
  }

