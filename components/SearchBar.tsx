"use client";

import { useState } from "react";
import { useShopStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const activeCategory = useShopStore((s) => s.activeCategory);
  const searchProducts = useShopStore((s) => s.searchProducts);
  const setActiveCategory = useShopStore((s) => s.setActiveCategory);
  const setSelectedProduct = useShopStore((s) => s.setSelectedProduct);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    searchProducts(query, activeCategory);
    setSelectedProduct(null);
  }

  function handleCategoryClick(cat: string) {
    const newCat = activeCategory === cat ? null : cat;
    setActiveCategory(newCat);
    searchProducts(query, newCat);
    setSelectedProduct(null);
  }

  function handleClear() {
    setQuery("");
    searchProducts("", null);
    setSelectedProduct(null);
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-9 pr-8"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit" size="sm">
          Search
        </Button>
      </form>

      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="xs"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
}
