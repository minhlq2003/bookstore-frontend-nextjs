import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: Request) {
  try {
    const { amount, userId, addressId, email } = await request.json();

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'GreatBook Order Checkout Gate',
              description: 'Payment processor for your book order',
            },
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart/checkout/success?session_id={CHECKOUT_SESSION_ID}&type=CARD&userId=${userId.toString()}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart/checkout`,
      metadata: {
        userId: userId.toString(),
        addressId: addressId.toString(),
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}