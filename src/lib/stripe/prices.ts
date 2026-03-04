// Product display information for the Buy tab — one-time purchases
// Price IDs are set via env vars so the same code works for test and live

export interface ProductDisplay {
  id: string;
  name: string;
  description: string;
  price: number; // in dollars, for display
  bottles: number;
  stripePriceId: string; // one-time Stripe price ID
  features: string[];
  image: string;
}

// Live price IDs (fallbacks) — override with STRIPE_PRICE_* env vars for test
const priceIds = {
  "3-case": process.env.STRIPE_PRICE_3_CASE || "price_1SqGefCty1txgvNHgAfK9Juz",
  "6-case": process.env.STRIPE_PRICE_6_CASE || "price_1SqGciCty1txgvNHNS2cj3l6",
  "9-case": process.env.STRIPE_PRICE_9_CASE || "price_1SqGbZCty1txgvNHpiTHkFHt",
  "12-case": process.env.STRIPE_PRICE_12_CASE || "price_1SqGZpCty1txgvNHUSj1MekX",
  donation: process.env.STRIPE_PRICE_DONATION || "price_1Spco0Cty1txgvNH0sBmk3UR",
};

export const DONATION_PRICE_ID = priceIds.donation;

export const products: ProductDisplay[] = [
  {
    id: "3-case",
    name: "3 Cases of SOULdiers",
    description: "72 Bottles",
    price: 216,
    bottles: 72,
    stripePriceId: priceIds["3-case"],
    features: [
      "72 bottles",
      "$3.00 per bottle",
      "$0.75/bottle donated to Impact Fund",
    ],
    image: "https://cdn.prod.website-files.com/6998d0b89ccfc8b21a745a10/699c73f1ebafc884f9c7637d_image%20181.avif",
  },
  {
    id: "6-case",
    name: "6 Cases of SOULdiers",
    description: "144 Bottles",
    price: 432,
    bottles: 144,
    stripePriceId: priceIds["6-case"],
    features: [
      "144 bottles",
      "$3.00 per bottle",
      "$0.75/bottle donated to Impact Fund",
    ],
    image: "https://cdn.prod.website-files.com/6998d0b89ccfc8b21a745a10/699c73f1ebafc884f9c7636c_image%20180.avif",
  },
  {
    id: "9-case",
    name: "9 Cases of SOULdiers",
    description: "216 Bottles",
    price: 648,
    bottles: 216,
    stripePriceId: priceIds["9-case"],
    features: [
      "216 bottles",
      "$3.00 per bottle",
      "$0.75/bottle donated to Impact Fund",
    ],
    image: "https://cdn.prod.website-files.com/6998d0b89ccfc8b21a745a10/699c73f1ebafc884f9c76375_image%20181%20(1).avif",
  },
  {
    id: "12-case",
    name: "12 Cases of SOULdiers",
    description: "288 Bottles",
    price: 864,
    bottles: 288,
    stripePriceId: priceIds["12-case"],
    features: [
      "288 bottles",
      "$3.00 per bottle",
      "$0.75/bottle donated to Impact Fund",
    ],
    image: "https://cdn.prod.website-files.com/6998d0b89ccfc8b21a745a10/699c73f1ebafc884f9c76386_image%20181%20(2).avif",
  },
];
