import React from 'react';

export default function OrderNowButton({ cart, totalPrice }) {
  console.log(totalPrice);

  const orderNow = async () => {
    try {
      const response = await fetch('/api/orderNow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: cart, totalPrice: totalPrice }),
      });

      if (response.ok) {
        console.log('Product(s) ordered!');
      } else {
        console.error('Failed to order product.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className='btn' onClick={orderNow}>
      Order Now
    </button>
  );
}
