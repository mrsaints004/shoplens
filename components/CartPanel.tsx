"use client";

import { useShopStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, Tag } from "lucide-react";

export default function CartPanel() {
  const cart = useShopStore((s) => s.cart);
  const appliedDeal = useShopStore((s) => s.appliedDeal);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const updateCartQuantity = useShopStore((s) => s.updateCartQuantity);
  const getCartTotal = useShopStore((s) => s.getCartTotal);
  const setAppliedDeal = useShopStore((s) => s.setAppliedDeal);

  const { subtotal, discount, total } = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-4">
        <div className="text-center">
          <p className="text-3xl mb-2">🛒</p>
          <p className="text-sm">Your cart is empty</p>
          <p className="text-xs mt-1">Add products to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-3 flex flex-col h-full">
      <h3 className="font-semibold text-sm">
        Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
      </h3>

      <div className="flex-1 overflow-y-auto space-y-2">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="border rounded-md p-2 flex gap-2"
          >
            <span className="text-2xl shrink-0">{item.product.image}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium leading-tight truncate">
                {item.product.name}
              </p>
              <p className="text-xs text-muted-foreground">
                ${item.product.price}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Button
                  size="xs"
                  variant="outline"
                  className="h-5 w-5 p-0"
                  onClick={() =>
                    item.quantity > 1
                      ? updateCartQuantity(item.product.id, item.quantity - 1)
                      : removeFromCart(item.product.id)
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-xs font-medium w-5 text-center">
                  {item.quantity}
                </span>
                <Button
                  size="xs"
                  variant="outline"
                  className="h-5 w-5 p-0"
                  onClick={() =>
                    updateCartQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <span className="text-xs font-medium ml-auto">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  size="xs"
                  variant="ghost"
                  className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 pt-2">
        <Separator />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600">
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {appliedDeal?.code}
            </span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        {appliedDeal && (
          <button
            onClick={() => setAppliedDeal(null)}
            className="text-[10px] text-muted-foreground hover:text-destructive"
          >
            Remove coupon
          </button>
        )}
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
