"use client";

import { useShopStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Star, X, ShoppingCart } from "lucide-react";

export default function ComparisonTable() {
  const comparison = useShopStore((s) => s.comparison);
  const removeFromComparison = useShopStore((s) => s.removeFromComparison);
  const clearComparison = useShopStore((s) => s.clearComparison);
  const addToCart = useShopStore((s) => s.addToCart);

  if (comparison.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-4">
        <div className="text-center">
          <p className="text-3xl mb-2">⚖️</p>
          <p className="text-sm">Add products to compare</p>
          <p className="text-xs mt-1">Click the compare button on product cards</p>
        </div>
      </div>
    );
  }

  // Gather all spec keys across compared products
  const allSpecs = new Set<string>();
  comparison.forEach((p) => {
    Object.keys(p.specs).forEach((k) => allSpecs.add(k));
  });

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">
          Comparing {comparison.length} products
        </h3>
        <Button size="xs" variant="ghost" onClick={clearComparison}>
          Clear all
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left py-1 pr-2 text-muted-foreground font-medium w-20">
                Feature
              </th>
              {comparison.map((p) => (
                <th key={p.id} className="text-center py-1 px-1 min-w-[100px]">
                  <div className="space-y-1">
                    <button
                      onClick={() => removeFromComparison(p.id)}
                      className="ml-auto block text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="text-2xl">{p.image}</div>
                    <p className="font-semibold text-[11px] leading-tight">
                      {p.name}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-1.5 pr-2 text-muted-foreground">Price</td>
              {comparison.map((p) => (
                <td key={p.id} className="text-center py-1.5 font-bold">
                  ${p.price}
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="py-1.5 pr-2 text-muted-foreground">Rating</td>
              {comparison.map((p) => (
                <td key={p.id} className="text-center py-1.5">
                  <span className="inline-flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {p.rating}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="py-1.5 pr-2 text-muted-foreground">Brand</td>
              {comparison.map((p) => (
                <td key={p.id} className="text-center py-1.5">
                  {p.brand}
                </td>
              ))}
            </tr>
            {[...allSpecs].map((spec) => (
              <tr key={spec} className="border-t">
                <td className="py-1.5 pr-2 text-muted-foreground">{spec}</td>
                {comparison.map((p) => (
                  <td key={p.id} className="text-center py-1.5">
                    {p.specs[spec] || "—"}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t">
              <td className="py-2 pr-2"></td>
              {comparison.map((p) => (
                <td key={p.id} className="text-center py-2">
                  <Button
                    size="xs"
                    disabled={!p.inStock}
                    onClick={() => addToCart(p, 1)}
                    className="text-[10px]"
                  >
                    <ShoppingCart className="h-3 w-3 mr-0.5" />
                    Add
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
