import React from 'react';

export default function OrderNowButton({ cart, totalPrice }) {

  const orderNow = async () => {
    //console.log(cart)
    //console.log(totalPrice)
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
  //console.log(cart);

  return (
    <button className='btn' onClick={orderNow}>
      Order Now
    </button>
  );
}
