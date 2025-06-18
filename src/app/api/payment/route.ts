import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Load and validate Stripe secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
}

// Use a valid Stripe API version
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-05-28.basil', // ✅ Official stable version
});

// Type for cart items
type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Handle POST request
export async function POST(request: Request) {
  try {
    const { cart }: { cart: CartItem[] } = await request.json();

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty or invalid' }, { status: 400 });
    }

    const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://food-website-lac-six.vercel.app';

    // Convert cart to Stripe line_items
    const line_items = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [
            item.image.startsWith('http')
              ? item.image
              : `${YOUR_DOMAIN}${item.image.startsWith('/') ? '' : '/'}${item.image}`,
          ],
        },
        unit_amount: Math.round(item.price * 100), // in cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `https://food-website-cln5.vercel.app//success`,
      cancel_url: `https://food-website-lac-six.vercel.app/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Stripe checkout error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    
  }
}
