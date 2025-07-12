import { loadStripe } from '@stripe/stripe-js';

export default function PostProperty() {
  const handleCheckout = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'rent',
        userId: 'test-user-123'
      })
    });

    const { id } = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pay to Post Rent Listing (50 GEL)
      </button>
    </div>
  );
}
<button
  onClick={async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'rent', // or 'sale'
        userId: 'test-user-123' // replace later with real user id
      })
    });
    const { id } = await response.json();
    const stripe = await (await import('@stripe/stripe-js')).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: id });
  }}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Pay to Post Rent Listing (50 GEL)
</button>
