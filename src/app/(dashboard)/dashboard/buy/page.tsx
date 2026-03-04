"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/stripe/prices";
import { Button } from "@/components/ui/button";

const RESERVE_IMAGE =
  "https://cdn.prod.website-files.com/6998d0b89ccfc8b21a745a10/699fe40a26b1654683aca75b_Group%2046%20(3).svg";

function BuyProductContent() {
  const searchParams = useSearchParams();
  const checkoutCancelled = searchParams.get("checkout") === "cancelled";
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  async function handleBuy(productId: string) {
    setLoadingProduct(productId);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingProduct(null);
    }
  }

  return (
    <div className="space-y-8">
      {checkoutCancelled && (
        <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
          Checkout was cancelled. You can try again whenever you&apos;re ready.
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[2/1] overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="text-2xl font-bold tracking-tight">
                  ${product.price}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {product.bottles} bottles &middot; ${(product.price / product.bottles).toFixed(2)}/bottle &middot; $0.75 donated
              </p>

              <div className="mt-auto pt-5">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleBuy(product.id)}
                  disabled={loadingProduct !== null}
                >
                  {loadingProduct === product.id ? "Redirecting..." : "Buy Now"}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Reserve card */}
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg">
          <div className="relative flex aspect-[2/1] items-center justify-center overflow-hidden bg-muted p-8">
            <img
              src={RESERVE_IMAGE}
              alt="Reserve"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Reserve</h3>
              </div>
            </div>

            <div className="mt-auto pt-5">
              <Button className="w-full" size="lg" asChild>
                <a
                  href="https://calendly.com/z-meltbrands/melt-intro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuyProductTab() {
  return (
    <Suspense>
      <BuyProductContent />
    </Suspense>
  );
}
