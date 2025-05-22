import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual publishable key from the Stripe dashboard
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');