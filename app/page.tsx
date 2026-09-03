"use client";

import { useShopStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/products";
import WebMCPProvider from "@/components/WebMCPProvider";
import SearchBar from "@/components/SearchBar";
import ProductGrid from "@/components/ProductGrid";
import ProductDetail from "@/components/ProductDetail";
import CartPanel from "@/components/CartPanel";
import ComparisonTable from "@/components/ComparisonTable";
import ReviewsPanel from "@/components/ReviewsPanel";
import DealsPanel from "@/components/DealsPanel";
import ActivityLog from "@/components/ActivityLog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from "lucide-react";

export default function Home() {
  const selectedProduct = useShopStore((s) => s.selectedProduct);
  const cart = useShopStore((s) => s.cart);
  const activeCategory = useShopStore((s) => s.activeCategory);
  const setActiveCategory = useShopStore((s) => s.setActiveCategory);
  const setSelectedProduct = useShopStore((s) => s.setSelectedProduct);
  const searchProducts = useShopStore((s) => s.searchProducts);
  const searchQuery = useShopStore((s) => s.searchQuery);
  const rightPanel = useShopStore((s) => s.rightPanel);
  const setRightPanel = useShopStore((s) => s.setRightPanel);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  function handleCategoryClick(cat: string) {
    const newCat = activeCategory === cat ? null : cat;
    setActiveCategory(newCat);
    searchProducts(searchQuery, newCat);
    setSelectedProduct(null);
  }

  return (
    <WebMCPProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-3 border-b bg-card shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-lg">
                🛍️
              </div>
              <h1 className="text-base font-semibold tracking-tight">
                ShopLens
              </h1>
            </div>
            <Badge
              variant="secondary"
              className="text-[10px] font-medium px-2 py-0"
            >
              WebMCP
            </Badge>
          </div>

          <div className="flex-1 max-w-lg mx-6 hidden md:block">
            <SearchBar />
          </div>

          <button
            onClick={() => setRightPanel("cart")}
            className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="text-[10px] px-1.5 py-0 min-w-[18px] text-center">
                {cartCount}
              </Badge>
            )}
          </button>
        </header>

        {/* Mobile search (visible on small screens) */}
        <div className="md:hidden px-4 py-2 border-b bg-card">
          <SearchBar />
        </div>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar — Categories */}
          <aside className="w-44 border-r flex flex-col bg-card shrink-0 overflow-hidden hidden lg:flex">
            <div className="p-3 space-y-1 overflow-y-auto flex-1">
              <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                Categories
              </h3>
              <button
                onClick={() => {
                  setActiveCategory(null);
                  searchProducts(searchQuery, null);
                  setSelectedProduct(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  activeCategory === null
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-accent"
                }`}
              >
                All Products
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Center — Product Grid or Detail */}
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto">
              {selectedProduct ? <ProductDetail /> : <ProductGrid />}
            </div>
          </main>

          {/* Right sidebar — Cart / Compare / Reviews / Deals */}
          <aside className="w-80 border-l flex flex-col shrink-0 overflow-hidden bg-card hidden md:flex">
            <Tabs
              value={rightPanel}
              onValueChange={(v) =>
                setRightPanel(v as typeof rightPanel)
              }
              className="flex flex-col h-full overflow-hidden"
            >
              <div className="px-3 pt-3 pb-2 shrink-0">
                <TabsList className="w-full">
                  <TabsTrigger value="cart" className="flex-1 text-xs">
                    Cart{cartCount > 0 ? ` (${cartCount})` : ""}
                  </TabsTrigger>
                  <TabsTrigger value="compare" className="flex-1 text-xs">
                    Compare
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1 text-xs">
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="deals" className="flex-1 text-xs">
                    Deals
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent
                value="cart"
                className="flex-1 overflow-y-auto m-0"
              >
                <CartPanel />
              </TabsContent>
              <TabsContent
                value="compare"
                className="flex-1 overflow-y-auto m-0"
              >
                <ComparisonTable />
              </TabsContent>
              <TabsContent
                value="reviews"
                className="flex-1 overflow-y-auto m-0"
              >
                <ReviewsPanel />
              </TabsContent>
              <TabsContent
                value="deals"
                className="flex-1 overflow-y-auto m-0"
              >
                <DealsPanel />
              </TabsContent>
            </Tabs>
          </aside>
        </div>

        {/* Bottom — Activity Log */}
        <div className="h-36 border-t bg-card flex flex-col shrink-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-1.5 border-b bg-muted/30 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                Activity Log
              </h3>
            </div>
            <Badge variant="outline" className="text-[10px] font-normal">
              WebMCP Tool Calls
            </Badge>
          </div>
          <div className="flex-1 overflow-hidden">
            <ActivityLog />
          </div>
        </div>
      </div>
    </WebMCPProvider>
  );
}
