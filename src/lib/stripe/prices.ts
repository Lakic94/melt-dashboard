// Product display information for the Buy tab — one-time purchases

export interface ProductDisplay {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  stripePriceId: string; // one-time Stripe price ID
  features: string[];
}

export const products: ProductDisplay[] = [
  {
    id: "12-case-pack",
    name: "12 Case Pack",
    description: "288 bottles of MELT",
    priceLabel: "$XXX.XX", // update with real price
    stripePriceId: "price_1SpcCM2FRPamAUDp9wyY9PQW",
    features: [
      "288 bottles",
      "Free shipping",
      "$0.75/bottle donated to charity",
    ],
  },
];
