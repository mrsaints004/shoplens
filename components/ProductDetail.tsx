"use client";

import { useShopStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Star, GitCompare, MessageSquare } from "lucide-react";

export default function ProductDetail() {
  const product = useShopStore((s) => s.selectedProduct);
  const setSelectedProduct = useShopStore((s) => s.setSelectedProduct);
  const addToCart = useShopStore((s) => s.addToCart);
  const addToComparison = useShopStore((s) => s.addToComparison);
  const setRightPanel = useShopStore((s) => s.setRightPanel);
  const setActiveReviews = useShopStore((s) => s.setActiveReviews);
  const getReviewsForProduct = useShopStore((s) => s.getReviewsForProduct);

  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  function handleShowReviews() {
    const reviews = getReviewsForProduct(product!.id);
    setActiveReviews(reviews);
    setRightPanel("reviews");
  }

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => setSelectedProduct(null)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </button>

      <div className="flex gap-6">
        <div className="text-7xl shrink-0 flex items-center justify-center w-32 h-32 bg-muted/50 rounded-xl">
          {product.image}
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.brand} · {product.category}
            </p>
            <h2 className="text-xl font-bold">{product.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <button
              onClick={handleShowReviews}
              className="text-sm text-primary hover:underline"
            >
              {product.reviewCount} reviews
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${product.price}</span>
            {hasDiscount && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <Badge variant="destructive">-{discountPct}%</Badge>
              </>
            )}
          </div>

          {!product.inStock && (
            <Badge variant="secondary">Out of stock</Badge>
          )}

          <div className="flex gap-2 pt-1">
            <Button
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product, 1);
                setRightPanel("cart");
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                addToComparison(product);
                setRightPanel("compare");
              }}
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare
            </Button>
            <Button variant="outline" onClick={handleShowReviews}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Reviews
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Specifications</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm py-1 border-b border-border/50">
              <span className="text-muted-foreground">{key}</span>
              <span className="font-medium text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {product.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
