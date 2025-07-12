import { loadStripe } from '@stripe/stripe-js';

export default function PostProperty() {
  const handleCheckout = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'rent',
        userId: 'test-user-123', // Replace with actual logic
      }),
    });

    const { id } = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4">Post Your Property</h1>
      <p className="mb-6 text-gray-700">Pay 50 GEL to post your rental listing</p>
      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Pay to Post Rent Listing (50 GEL)
      </button>
    </div>
  );
}
