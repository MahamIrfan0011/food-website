import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

// ✅ Type for each cart item
type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export async function POST(request: Request) {
  try {
    // ✅ Explicitly type cart
    const { cart }: { cart: CartItem[] } = await request.json();

    const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://food-website-lac-six.vercel.app';

    const line_items = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [
            item.image.startsWith('http')
              ? item.image
              : `${YOUR_DOMAIN}${item.image}`,
          ],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // ✅ Better error typing
    if (error instanceof Error) {
      console.error('Stripe checkout error:', error.message);
      return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ error: 'Unknown error' });
  }
}
