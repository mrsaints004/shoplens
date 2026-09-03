"use client";

import { deals } from "@/lib/products";
import { useShopStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Check } from "lucide-react";

export default function DealsPanel() {
  const appliedDeal = useShopStore((s) => s.appliedDeal);
  const setAppliedDeal = useShopStore((s) => s.setAppliedDeal);
  const cart = useShopStore((s) => s.cart);
  const getCartTotal = useShopStore((s) => s.getCartTotal);
  const setRightPanel = useShopStore((s) => s.setRightPanel);
  const addLogEntry = useShopStore((s) => s.addLogEntry);

  function handleApply(deal: (typeof deals)[number]) {
    const { subtotal } = getCartTotal();
    if (cart.length === 0) return;
    if (subtotal < deal.minPurchase) return;
    setAppliedDeal(deal);
    setRightPanel("cart");
    addLogEntry({
      timestamp: new Date(),
      tool: "apply_deal",
      args: deal.code,
      result: `${deal.discountPercent}% discount applied`,
    });
  }

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Available Deals</h3>
      </div>

      <div className="space-y-2">
        {deals.map((deal) => {
          const isApplied = appliedDeal?.code === deal.code;
          return (
            <div
              key={deal.code}
              className={`border rounded-md p-2.5 space-y-1.5 ${
                isApplied ? "border-primary bg-primary/5" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <code className="text-xs font-bold bg-muted px-1.5 py-0.5 rounded">
                  {deal.code}
                </code>
                <Badge variant="secondary" className="text-[10px]">
                  {deal.discountPercent}% OFF
                </Badge>
              </div>
              <p className="text-xs">{deal.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">
                  {deal.minPurchase > 0 ? `Min. $${deal.minPurchase}` : "No minimum"}
                </span>
                {isApplied ? (
                  <span className="text-[10px] text-primary flex items-center gap-0.5">
                    <Check className="h-3 w-3" /> Applied
                  </span>
                ) : (
                  <Button
                    size="xs"
                    variant="outline"
                    className="text-[10px] h-5"
                    disabled={cart.length === 0}
                    onClick={() => handleApply(deal)}
                  >
                    Apply
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {deal.applicableCategories.map((cat) => (
                  <Badge key={cat} variant="outline" className="text-[9px] px-1 py-0">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
