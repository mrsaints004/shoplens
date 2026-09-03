"use client";

import { useShopStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, GitCompare } from "lucide-react";
import type { Product } from "@/lib/products";

function ProductCard({ product }: { product: Product }) {
  const addToCart = useShopStore((s) => s.addToCart);
  const setSelectedProduct = useShopStore((s) => s.setSelectedProduct);
  const addToComparison = useShopStore((s) => s.addToComparison);
  const setRightPanel = useShopStore((s) => s.setRightPanel);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div
      className="group border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer bg-card"
      onClick={() => setSelectedProduct(product)}
    >
      <div className="text-4xl text-center py-3">{product.image}</div>

      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-medium text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-xs text-muted-foreground">{product.brand}</p>

        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-base">${product.price}</span>
          {hasDiscount && (
            <>
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
              <Badge variant="destructive" className="text-[10px] px-1 py-0">
                -{discountPct}%
              </Badge>
            </>
          )}
        </div>

        {!product.inStock && (
          <Badge variant="secondary" className="text-[10px]">
            Out of stock
          </Badge>
        )}

        <div className="flex gap-1 pt-1">
          <Button
            size="xs"
            className="flex-1 text-xs"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
              setRightPanel("cart");
            }}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              addToComparison(product);
              setRightPanel("compare");
            }}
          >
            <GitCompare className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const filteredProducts = useShopStore((s) => s.filteredProducts);

  if (filteredProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <p className="text-4xl mb-2">🔍</p>
          <p className="font-medium">No products found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 p-1">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
