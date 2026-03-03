"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/stripe/prices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BuyProductTab() {
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
    <div className="space-y-6">
      {checkoutCancelled && (
        <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          Checkout was cancelled. You can try again whenever you&apos;re ready.
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold">Available Products</h2>
        <p className="text-sm text-muted-foreground">
          Browse MELT products. Each purchase includes a charitable donation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant="secondary">{product.priceLabel}</Badge>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleBuy(product.id)}
                disabled={loadingProduct !== null}
              >
                {loadingProduct === product.id ? "Redirecting..." : "Buy Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
