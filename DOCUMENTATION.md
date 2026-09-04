# ShopLens -- Technical Documentation

## Overview

ShopLens is a single-page web application that demonstrates the **WebMCP standard** -- an emerging protocol that allows websites to expose structured tools for AI agents to discover and use. The app simulates an e-commerce storefront with 40 products, and registers 10 tools that AI agents (like ChatGPT) can call to search, compare, review, and purchase products on behalf of a user.

Everything runs client-side. There is no backend, no database, no API. The product catalog, reviews, and deals are all bundled as TypeScript data. This makes the app instantly deployable to any static hosting platform.

---

## Architecture

```
Browser (client-side only)
├── WebMCP Layer
│   └── document.modelContext.registerTool()   <- AI agents discover tools here
│       ├── search_products
│       ├── get_product
│       ├── compare_products
│       ├── get_reviews
│       ├── find_similar
│       ├── add_to_cart
│       ├── remove_from_cart
│       ├── get_cart
│       ├── check_deals
│       └── apply_deal
│
├── State Layer (Zustand)
│   └── useShopStore
│       ├── products / filteredProducts / selectedProduct
│       ├── cart / appliedDeal
│       ├── comparison
│       ├── activeReviews
│       └── activityLog / searchQuery / activeCategory / rightPanel
│
├── Data Layer
│   └── lib/products.ts
│       ├── 40 products across 5 categories
│       ├── 100+ reviews (3-4 per product)
│       └── 8 deal/coupon codes
│
└── UI Layer (React + Tailwind + shadcn/ui)
    ├── 3-panel layout (sidebar, main, right panel)
    ├── 9 components
    └── Activity Log (real-time tool call visualization)
```

---

## WebMCP Integration

### What is WebMCP?

WebMCP (Model Context Protocol for the Web) is a standard that lets websites register tools that AI agents can discover and invoke. When an AI agent with browsing capability (like ChatGPT) visits a WebMCP-enabled page, it checks for `document.modelContext` and reads the registered tools. The agent can then call these tools to interact with the page programmatically.

### How ShopLens Registers Tools

The `WebMCPProvider` component (wrapping the entire app) runs on mount:

```typescript
// Simplified from components/WebMCPProvider.tsx
useEffect(() => {
  if (!("modelContext" in document) || !document.modelContext) return;

  const controller = new AbortController();
  const tools = getToolDefinitions(); // 10 tools from lib/tools.ts

  for (const tool of tools) {
    document.modelContext.registerTool(
      {
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
        execute: async (args) => tool.execute(args),
      },
      { signal: controller.signal }
    );
  }

  return () => controller.abort(); // Unregister all tools on unmount
}, []);
```

Each tool is a single `ModelContextTool` object with:
- **name** -- identifier the AI uses to call it
- **description** -- natural language explanation so the AI knows when to use it
- **inputSchema** -- JSON Schema describing accepted arguments
- **execute** -- async function that runs in the browser, manipulates state, returns results

Cleanup uses an `AbortController` signal -- calling `controller.abort()` unregisters all tools.

### Feature Detection

The app uses feature detection (`"modelContext" in document`) so it works normally in any browser. When no AI agent is present, it functions as a standard e-commerce UI. When an agent is present, tools become available.

---

## Tool Reference

### 1. search_products

Search the product catalog with filters.

**Parameters:**
- `query` (string, optional) -- Keyword search across name, brand, description, tags
- `category` (string, optional) -- Filter by category: Laptops, Headphones, Cameras, Smart Home, Accessories
- `min_price` (number, optional) -- Minimum price
- `max_price` (number, optional) -- Maximum price
- `min_rating` (number, optional) -- Minimum rating (1-5)

**Returns:** `{ count, products: [{ id, name, brand, category, price, rating, inStock }] }`

**Side effects:** Updates the product grid to show filtered results.

---

### 2. get_product

Get full details for a single product.

**Parameters:**
- `product_id` (string, required) -- e.g. "lap-01", "hp-03"

**Returns:** Full product object including specs, description, tags, stock status.

**Side effects:** Opens the product detail view in the main panel.

---

### 3. compare_products

Compare 2-4 products side by side.

**Parameters:**
- `product_ids` (string[], required) -- Array of 2-4 product IDs

**Returns:** `{ products: [{ id, name, brand, price, rating, specs }] }`

**Side effects:** Populates the comparison table and switches the right panel to the Compare tab.

---

### 4. get_reviews

Get reviews for a product with sentiment analysis.

**Parameters:**
- `product_id` (string, required)

**Returns:** `{ product, reviewCount, averageRating, sentiment, reviews: [...] }`

Sentiment is derived from average rating: Very Positive (4.5+), Positive (3.5+), Mixed (2.5+), Negative (<2.5).

**Side effects:** Shows reviews in the right panel.

---

### 5. find_similar

Find products similar to a given one, scored by category match, price proximity, and shared tags.

**Parameters:**
- `product_id` (string, required)
- `limit` (number, optional, default 5)

**Returns:** `{ basedOn, similar: [{ id, name, brand, price, rating }] }`

**Side effects:** Updates the product grid to show similar products.

---

### 6. add_to_cart

Add a product to the shopping cart.

**Parameters:**
- `product_id` (string, required)
- `quantity` (number, optional, default 1)

**Returns:** `{ added, quantity, price, cartItemCount }`

**Side effects:** Updates cart, switches right panel to Cart tab. Returns error if product is out of stock.

---

### 7. remove_from_cart

Remove a product from the cart.

**Parameters:**
- `product_id` (string, required)

**Returns:** `{ removed, cartItemCount }`

---

### 8. get_cart

Get current cart contents and totals.

**Parameters:** None

**Returns:** `{ items, itemCount, subtotal, discount, appliedDeal, total }`

**Side effects:** Switches right panel to Cart tab.

---

### 9. check_deals

Find available deals and coupon codes.

**Parameters:**
- `category` (string, optional) -- Filter deals by applicable category

**Returns:** `{ deals: [{ code, description, discountPercent, minPurchase, applicableCategories }] }`

**Side effects:** Switches right panel to Deals tab.

---

### 10. apply_deal

Apply a coupon code to the cart.

**Parameters:**
- `code` (string, required) -- Coupon code (case-insensitive)

**Returns:** `{ applied, code, description, discountPercent, discountAmount, newTotal }`

**Validation:** Checks that the code exists, the cart meets the minimum purchase amount, and the cart contains items from applicable categories.

**Side effects:** Applies discount to cart totals, switches to Cart tab.

---

## Data Model

### Product

```typescript
interface Product {
  id: string;           // e.g. "lap-01", "hp-03"
  name: string;
  brand: string;        // e.g. "TechNova", "SoundWave"
  category: string;     // One of 5 categories
  price: number;
  originalPrice?: number; // If set and > price, shows discount badge
  rating: number;       // 1-5
  reviewCount: number;
  image: string;        // Emoji (e.g. "💻", "🎧")
  description: string;
  specs: Record<string, string>;
  tags: string[];
  inStock: boolean;
}
```

### Categories

Laptops, Headphones, Cameras, Smart Home, Accessories

### Review

```typescript
interface Review {
  productId: string;
  author: string;
  rating: number;       // 1-5
  text: string;
  date: string;
  helpful: number;      // "X found helpful" count
}
```

### Deal

```typescript
interface Deal {
  code: string;              // e.g. "TECH20"
  description: string;
  discountPercent: number;
  minPurchase: number;
  applicableCategories: string[];
}
```

Available deal codes: TECH20, AUDIO15, SMARTHOME10, BUNDLE25, SAVE10, CAMERA20, ACCESSORY5, WELCOME15

---

## State Management

The app uses a single Zustand store (`useShopStore`) with the following state:

| State | Type | Description |
|-------|------|-------------|
| `products` | `Product[]` | Full catalog (40 products) |
| `filteredProducts` | `Product[]` | Currently displayed products |
| `selectedProduct` | `Product \| null` | Product shown in detail view |
| `cart` | `CartItem[]` | Shopping cart items |
| `appliedDeal` | `Deal \| null` | Active coupon |
| `comparison` | `Product[]` | Products in comparison (max 4) |
| `activeReviews` | `Review[]` | Reviews shown in panel |
| `activityLog` | `LogEntry[]` | WebMCP tool call history |
| `searchQuery` | `string` | Current search text |
| `activeCategory` | `string \| null` | Selected category filter |
| `rightPanel` | `string` | Active right panel tab |

The store is accessed from both UI components and WebMCP tool handlers. Tool handlers use `useShopStore.getState()` (outside React) while components use the `useShopStore()` hook.

---

## UI Layout

```
+-----------------------------------------------------+
| Header:  Logo  |  SearchBar  |  Cart icon with count |
+----------+----------------------+--------------------+
| Left     |                      |                    |
| Sidebar  |   Main Panel         |   Right Panel      |
|          |                      |   (Tabbed)         |
| Category |   ProductGrid        |   - Cart           |
| filters  |   or                 |   - Compare        |
| (5 cats) |   ProductDetail      |   - Reviews        |
|          |                      |   - Deals          |
+----------+----------------------+--------------------+
| Activity Log                                         |
| [timestamp] tool_name(args) -> result                |
+-----------------------------------------------------+
```

- **Left sidebar** (desktop only): Category filter buttons
- **Main panel**: Product grid or product detail view
- **Right panel**: Tabbed panel for Cart, Compare, Reviews, Deals
- **Activity Log**: Fixed bottom bar showing real-time WebMCP tool calls

---

## Deployment

### Vercel (recommended)

```bash
npm install
npx vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Any Static Host

```bash
npm run build
# Deploy the .next/ output
```

No environment variables are needed. No backend is required.

---

## Testing

### Option A: Chrome with WebMCP Flag (no ChatGPT account needed)

1. Update Chrome to version 146+
2. Navigate to `chrome://flags/#enable-webmcp-testing` and set to **Enabled**
3. Relaunch Chrome
4. Run `npm run dev` and open `http://localhost:3000`
5. Open DevTools Console and verify tools are registered:

```js
const tools = await document.modelContext.getTools()
console.log(tools) // Array of 10 tools
```

6. Call tools from the console to simulate an AI agent:

```js
const t = name => tools.find(x => x.name === name)

// Search for laptops
await document.modelContext.executeTool(t("search_products"), JSON.stringify({ category: "Laptops" }))

// Compare products
await document.modelContext.executeTool(t("compare_products"), JSON.stringify({ product_ids: ["lap-01", "lap-02", "lap-03"] }))

// Get reviews
await document.modelContext.executeTool(t("get_reviews"), JSON.stringify({ product_id: "lap-01" }))

// Add to cart
await document.modelContext.executeTool(t("add_to_cart"), JSON.stringify({ product_id: "lap-01" }))

// Check deals and apply coupon
await document.modelContext.executeTool(t("check_deals"), JSON.stringify({ category: "Laptops" }))
await document.modelContext.executeTool(t("apply_deal"), JSON.stringify({ code: "TECH20" }))
```

Each call updates the UI and appears in the Activity Log at the bottom of the page.

### Option B: ChatGPT In-App Browser

1. Deploy the app to a public URL (e.g. Vercel)
2. Open ChatGPT (Plus or Pro plan with browsing enabled)
3. Paste the URL into the chat
4. Ask the AI to interact with the store

**Example prompts:**
- "Find me wireless headphones under $200 with good reviews"
- "Compare the top 3 laptops and add the best value to my cart"
- "What deals are available for smart home products?"
- "I have $500 to spend on camera gear. What do you recommend?"

The AI will discover the 10 registered tools and use them to fulfill the request. Every tool call appears in the Activity Log at the bottom of the page.

---

## File Reference

| File | Lines | Purpose |
|------|-------|---------|
| `lib/products.ts` | ~1170 | Product catalog, reviews, deals data |
| `lib/store.ts` | ~200 | Zustand store with all state and actions |
| `lib/tools.ts` | ~415 | 10 WebMCP tool definitions and handlers |
| `components/WebMCPProvider.tsx` | ~73 | Registers tools via document.modelContext |
| `components/ProductGrid.tsx` | ~117 | Product card grid with add/compare buttons |
| `components/ProductDetail.tsx` | ~136 | Full product view with specs and tags |
| `components/ComparisonTable.tsx` | ~126 | Side-by-side comparison table |
| `components/CartPanel.tsx` | ~124 | Cart items, quantities, totals |
| `components/ReviewsPanel.tsx` | ~76 | Review list with star ratings |
| `components/DealsPanel.tsx` | ~90 | Coupon cards with apply buttons |
| `components/SearchBar.tsx` | ~76 | Search input with category chips |
| `components/ActivityLog.tsx` | ~44 | Real-time tool call log |
| `app/page.tsx` | ~200 | Main layout assembling all components |
