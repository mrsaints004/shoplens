# ShopLens -- AI Shopping Assistant

**A WebMCP-powered shopping assistant where AI agents become your personal shopper.**

ShopLens is a web app that exposes 10 structured tools via the [WebMCP](https://webmcp.com) standard. When an AI agent (like ChatGPT) visits the site in its built-in browser, it discovers these tools and can autonomously search products, compare specs, read reviews, manage a cart, and apply coupons -- all while the user watches the UI update in real time.

Built for the **OpenAI WebMCP Challenge** hackathon.

---

## How It Works

```
User asks ChatGPT: "Find me a laptop under $1500 with good reviews"

ChatGPT opens ShopLens in its browser
    |
    v
ShopLens registers 10 tools via document.modelContext.registerTool()
    |
    v
ChatGPT discovers the tools and calls them:
  -> search_products({ category: "Laptops", max_price: 1500 })
  -> get_reviews({ product_id: "lap-01" })
  -> compare_products({ product_ids: ["lap-01", "lap-03"] })
  -> add_to_cart({ product_id: "lap-01" })
  -> apply_deal({ code: "TECH20" })
    |
    v
UI updates live. Activity Log shows every tool call with timestamps.
```

**WebMCP turns passive websites into interactive agent workspaces.** Instead of just reading a page, the AI takes structured actions through well-defined tools.

---

## 10 WebMCP Tools

| Tool | What it does |
|------|-------------|
| `search_products` | Search by keyword, category, price range, min rating |
| `get_product` | Get full product details (specs, description, stock) |
| `compare_products` | Side-by-side comparison of 2-4 products |
| `get_reviews` | Retrieve reviews with average sentiment |
| `find_similar` | Find products similar to a given one |
| `add_to_cart` | Add product to cart |
| `remove_from_cart` | Remove product from cart |
| `get_cart` | Get cart contents with totals |
| `check_deals` | Find available coupons and deals |
| `apply_deal` | Apply a coupon code to the cart |

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test with an AI agent, deploy to Vercel and open the URL in ChatGPT's browser.

---

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS + shadcn/ui**
- **Zustand** for state management
- **WebMCP** for AI tool registration
- 40 products, 100+ reviews, 8 deal codes -- all bundled client-side, no backend needed

---

## Project Structure

```
app/
  page.tsx              Main storefront (3-panel layout)
  layout.tsx            Root layout with metadata
  globals.css           Indigo color theme (light + dark)

components/
  WebMCPProvider.tsx     Registers 10 tools via document.modelContext
  SearchBar.tsx          Search input
  ProductGrid.tsx        Product card grid
  ProductDetail.tsx      Expanded product view with specs
  ComparisonTable.tsx    Side-by-side spec comparison
  ReviewsPanel.tsx       Reviews with star ratings
  CartPanel.tsx          Cart with quantity controls and totals
  DealsPanel.tsx         Available coupons
  ActivityLog.tsx        Real-time log of every WebMCP tool call

lib/
  products.ts            Product catalog, reviews, deals (data)
  store.ts               Zustand store
  tools.ts               10 WebMCP tool definitions + handlers
```

---

## Demo

1. Deploy to Vercel
2. Open ChatGPT (Plus/Pro with browsing enabled)
3. Paste your Vercel URL and ask: *"I need wireless headphones under $200. Compare a few options and find me the best deal."*
4. Watch the AI call tools and the UI update in real time

See [DOCUMENTATION.md](./DOCUMENTATION.md) for full technical details.

---

## License

MIT
