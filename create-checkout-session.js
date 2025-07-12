
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { type, userId } = req.body;

  const price = type === 'rent' ? 50 : 200;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gel',
          product_data: {
            name: `GeoHome.ge - Property ${type.toUpperCase()} Listing`
          },
          unit_amount: price * 100
        },
        quantity: 1
      }
    ],
    metadata: {
      userId,
      purpose: type
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/post-success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/post-cancel`
  });

  res.status(200).json({ id: session.id });
}
