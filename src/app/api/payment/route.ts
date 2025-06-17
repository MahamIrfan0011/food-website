import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, 
 
);

export async function POST(request: Request) {
  try {
    const { cart } = await request.json();

    // Your domain - CHANGE this to your deployed domain!
    const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://food-website-lac-six.vercel.app/';

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          // Stripe requires full https URLs for images
          images: [
            item.image.startsWith('http')
              ? item.image
              : `${YOUR_DOMAIN}${item.image}`
          ],
        },
        unit_amount: Math.round(item.price * 100), // in cents
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
  } catch (error: any) {
    console.error('Stripe checkout error:', error.message);
    return NextResponse.json({ error: error.message });
  }
}
