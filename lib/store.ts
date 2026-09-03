import { create } from "zustand";
import { products as allProducts, reviews as allReviews, type Product, type Review, type Deal } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LogEntry {
  timestamp: Date;
  tool: string;
  args: string;
  result: string;
}

interface ShopStore {
  // Product state
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;

  // Cart state
  cart: CartItem[];
  appliedDeal: Deal | null;

  // Comparison state
  comparison: Product[];

  // Reviews state
  activeReviews: Review[];

  // UI state
  activityLog: LogEntry[];
  searchQuery: string;
  activeCategory: string | null;
  rightPanel: "cart" | "compare" | "reviews" | "deals";

  // Product actions
  setFilteredProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  searchProducts: (query: string, category?: string | null, minPrice?: number, maxPrice?: number, minRating?: number) => Product[];
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string | null) => void;

  // Cart actions
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { subtotal: number; discount: number; total: number };
  setAppliedDeal: (deal: Deal | null) => void;

  // Comparison actions
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  setComparison: (products: Product[]) => void;

  // Reviews actions
  setActiveReviews: (reviews: Review[]) => void;
  getReviewsForProduct: (productId: string) => Review[];

  // UI actions
  addLogEntry: (entry: LogEntry) => void;
  setRightPanel: (panel: "cart" | "compare" | "reviews" | "deals") => void;
}

export const useShopStore = create<ShopStore>((set, get) => ({
  // Initial state
  products: allProducts,
  filteredProducts: allProducts,
  selectedProduct: null,
  cart: [],
  appliedDeal: null,
  comparison: [],
  activeReviews: [],
  activityLog: [],
  searchQuery: "",
  activeCategory: null,
  rightPanel: "cart",

  // Product actions
  setFilteredProducts: (products) => set({ filteredProducts: products }),

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  searchProducts: (query, category, minPrice, maxPrice, minRating) => {
    const { products } = get();
    let results = [...products];

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category) {
      results = results.filter((p) => p.category === category);
    }

    if (minPrice !== undefined) {
      results = results.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      results = results.filter((p) => p.price <= maxPrice);
    }

    if (minRating !== undefined) {
      results = results.filter((p) => p.rating >= minRating);
    }

    set({ filteredProducts: results, searchQuery: query || "", activeCategory: category || null });
    return results;
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setActiveCategory: (category) => {
    const { products } = get();
    const filtered = category
      ? products.filter((p) => p.category === category)
      : products;
    set({ activeCategory: category, filteredProducts: filtered });
  },

  // Cart actions
  addToCart: (product, quantity) =>
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),

  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ cart: [], appliedDeal: null }),

  getCartTotal: () => {
    const { cart, appliedDeal } = get();
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    let discount = 0;
    if (appliedDeal) {
      discount = subtotal * (appliedDeal.discountPercent / 100);
    }
    return { subtotal, discount, total: subtotal - discount };
  },

  setAppliedDeal: (deal) => set({ appliedDeal: deal }),

  // Comparison actions
  addToComparison: (product) =>
    set((state) => {
      if (state.comparison.length >= 4) return state;
      if (state.comparison.find((p) => p.id === product.id)) return state;
      return { comparison: [...state.comparison, product] };
    }),

  removeFromComparison: (productId) =>
    set((state) => ({
      comparison: state.comparison.filter((p) => p.id !== productId),
    })),

  clearComparison: () => set({ comparison: [] }),

  setComparison: (products) => set({ comparison: products.slice(0, 4) }),

  // Reviews actions
  setActiveReviews: (reviews) => set({ activeReviews: reviews }),

  getReviewsForProduct: (productId) => {
    return allReviews.filter((r) => r.productId === productId);
  },

  // UI actions
  addLogEntry: (entry) =>
    set((state) => ({ activityLog: [...state.activityLog, entry] })),

  setRightPanel: (panel) => set({ rightPanel: panel }),
}));
