import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const { data: clientSecret } = await fetch('/your-server-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000, // Change this to the actual amount
        // Add any other necessary parameters
      }),
    }).then((res) => res.json());
  
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: event.target.cardholderName.value,
        },
      },
    });
  
    if (result.error) {
      setPaymentError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', result.paymentIntent);
      }
    }
  };
  


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <label htmlFor="cardholderName" className="block mb-2 font-semibold">Cardholder Name</label>
      <input id="cardholderName" name="cardholderName" type="text" className="w-full p-2 border border-gray-300 rounded mb-4" />

      <label htmlFor="card-element" className="block mb-2 font-semibold">Card Details</label>
      <div className="bg-white p-4 rounded border border-gray-300 mb-4">
        <CardElement id="card-element" className="w-full p-2 border border-gray-300 rounded" />
      </div>

      {/* <label htmlFor="cvv" className="block mb-2 font-semibold">CVV</label>
      <input id="cvv" name="cvv" type="text" className="w-full p-2 border border-gray-300 rounded mb-4" /> */}

      {paymentError && <div className="text-red-500 mt-2">{paymentError}</div>}
      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed">
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
