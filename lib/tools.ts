import { useShopStore } from "./store";
import { products as allProducts, reviews as allReviews, deals as allDeals, type Product } from "./products";

type ToolDef = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => unknown;
};

function log(tool: string, args: string, result: string) {
  useShopStore.getState().addLogEntry({
    timestamp: new Date(),
    tool,
    args,
    result,
  });
}

export function getToolDefinitions(): ToolDef[] {
  return [
    // 1. search_products
    {
      name: "search_products",
      description:
        "Search for products by keyword, category, price range, and minimum rating. Returns matching products with name, price, rating, and availability.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search keyword (matches name, brand, description, tags)" },
          category: { type: "string", description: "Filter by category: Laptops, Headphones, Cameras, Smart Home, Accessories" },
          min_price: { type: "number", description: "Minimum price" },
          max_price: { type: "number", description: "Maximum price" },
          min_rating: { type: "number", description: "Minimum rating (1-5)" },
        },
      },
      execute: (args) => {
        const store = useShopStore.getState();
        const results = store.searchProducts(
          args.query as string || "",
          args.category as string || null,
          args.min_price as number | undefined,
          args.max_price as number | undefined,
          args.min_rating as number | undefined
        );
        const summary = results.map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          category: p.category,
          price: p.price,
          originalPrice: p.originalPrice,
          rating: p.rating,
          reviewCount: p.reviewCount,
          inStock: p.inStock,
        }));
        const argParts: string[] = [];
        if (args.query) argParts.push(`q:"${args.query}"`);
        if (args.category) argParts.push(`cat:"${args.category}"`);
        if (args.min_price) argParts.push(`min:$${args.min_price}`);
        if (args.max_price) argParts.push(`max:$${args.max_price}`);
        if (args.min_rating) argParts.push(`rating≥${args.min_rating}`);
        log("search_products", argParts.join(", "), `${results.length} found`);
        return { count: results.length, products: summary };
      },
    },

    // 2. get_product
    {
      name: "get_product",
      description:
        "Get full details for a single product by ID, including specs, description, and stock status.",
      parameters: {
        type: "object",
        properties: {
          product_id: { type: "string", description: "The product ID (e.g. 'lap-01', 'hp-03')" },
        },
        required: ["product_id"],
      },
      execute: (args) => {
        const product = allProducts.find((p) => p.id === args.product_id);
        if (!product) {
          log("get_product", `id:${args.product_id}`, "not found");
          return { error: `Product "${args.product_id}" not found` };
        }
        useShopStore.getState().setSelectedProduct(product);
        log("get_product", product.name, "details loaded");
        return product;
      },
    },

    // 3. compare_products
    {
      name: "compare_products",
      description:
        "Compare 2-4 products side-by-side. Renders a comparison table in the UI showing specs, prices, and ratings.",
      parameters: {
        type: "object",
        properties: {
          product_ids: {
            type: "array",
            description: "Array of 2-4 product IDs to compare",
            items: { type: "string" },
          },
        },
        required: ["product_ids"],
      },
      execute: (args) => {
        const ids = args.product_ids as string[];
        if (ids.length < 2 || ids.length > 4) {
          return { error: "Please provide 2-4 product IDs to compare" };
        }
        const found: Product[] = [];
        const notFound: string[] = [];
        for (const id of ids) {
          const p = allProducts.find((prod) => prod.id === id);
          if (p) found.push(p);
          else notFound.push(id);
        }
        if (found.length < 2) {
          return { error: "Need at least 2 valid products to compare", notFound };
        }
        const store = useShopStore.getState();
        store.setComparison(found);
        store.setRightPanel("compare");
        log(
          "compare_products",
          `ids:[${ids.join(",")}]`,
          `${found.length} products compared`
        );
        return {
          products: found.map((p) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            price: p.price,
            rating: p.rating,
            specs: p.specs,
          })),
          ...(notFound.length > 0 ? { notFound } : {}),
        };
      },
    },

    // 4. get_reviews
    {
      name: "get_reviews",
      description:
        "Get reviews for a product. Shows reviews in the UI panel. Returns reviews with ratings and average sentiment.",
      parameters: {
        type: "object",
        properties: {
          product_id: { type: "string", description: "The product ID" },
        },
        required: ["product_id"],
      },
      execute: (args) => {
        const productId = args.product_id as string;
        const product = allProducts.find((p) => p.id === productId);
        if (!product) {
          log("get_reviews", `id:${productId}`, "product not found");
          return { error: `Product "${productId}" not found` };
        }
        const productReviews = allReviews.filter((r) => r.productId === productId);
        const store = useShopStore.getState();
        store.setActiveReviews(productReviews);
        store.setRightPanel("reviews");
        const avgRating =
          productReviews.length > 0
            ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
            : 0;
        const sentiment =
          avgRating >= 4.5 ? "Very Positive" : avgRating >= 3.5 ? "Positive" : avgRating >= 2.5 ? "Mixed" : "Negative";
        log(
          "get_reviews",
          product.name,
          `${productReviews.length} reviews (avg ${avgRating.toFixed(1)})`
        );
        return {
          product: product.name,
          reviewCount: productReviews.length,
          averageRating: Math.round(avgRating * 10) / 10,
          sentiment,
          reviews: productReviews,
        };
      },
    },

    // 5. find_similar
    {
      name: "find_similar",
      description:
        "Find products similar to a given product — same category, similar price range and features.",
      parameters: {
        type: "object",
        properties: {
          product_id: { type: "string", description: "The product ID to find similar products for" },
          limit: { type: "number", description: "Max results (default 5)" },
        },
        required: ["product_id"],
      },
      execute: (args) => {
        const productId = args.product_id as string;
        const product = allProducts.find((p) => p.id === productId);
        if (!product) {
          return { error: `Product "${productId}" not found` };
        }
        const limit = (args.limit as number) || 5;
        const sameCat = allProducts.filter(
          (p) => p.category === product.category && p.id !== product.id
        );
        // Score by price proximity and shared tags
        const scored = sameCat.map((p) => {
          const priceDiff = Math.abs(p.price - product.price) / product.price;
          const sharedTags = p.tags.filter((t) => product.tags.includes(t)).length;
          const score = sharedTags * 2 - priceDiff * 3;
          return { product: p, score };
        });
        scored.sort((a, b) => b.score - a.score);
        const similar = scored.slice(0, limit).map((s) => s.product);
        useShopStore.getState().setFilteredProducts(similar);
        log("find_similar", product.name, `${similar.length} similar products`);
        return {
          basedOn: product.name,
          similar: similar.map((p) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            price: p.price,
            rating: p.rating,
          })),
        };
      },
    },

    // 6. add_to_cart
    {
      name: "add_to_cart",
      description:
        "Add a product to the shopping cart with a specified quantity. Updates the cart UI.",
      parameters: {
        type: "object",
        properties: {
          product_id: { type: "string", description: "The product ID to add" },
          quantity: { type: "number", description: "Quantity to add (default 1)" },
        },
        required: ["product_id"],
      },
      execute: (args) => {
        const productId = args.product_id as string;
        const product = allProducts.find((p) => p.id === productId);
        if (!product) {
          return { error: `Product "${productId}" not found` };
        }
        if (!product.inStock) {
          log("add_to_cart", product.name, "out of stock");
          return { error: `"${product.name}" is currently out of stock` };
        }
        const qty = (args.quantity as number) || 1;
        const store = useShopStore.getState();
        store.addToCart(product, qty);
        store.setRightPanel("cart");
        const cartTotal = useShopStore.getState().cart.reduce((s, i) => s + i.quantity, 0);
        log("add_to_cart", `${product.name} ×${qty}`, `cart: ${cartTotal} items`);
        return {
          added: product.name,
          quantity: qty,
          price: product.price,
          cartItemCount: cartTotal,
        };
      },
    },

    // 7. remove_from_cart
    {
      name: "remove_from_cart",
      description: "Remove a product from the shopping cart by product ID.",
      parameters: {
        type: "object",
        properties: {
          product_id: { type: "string", description: "The product ID to remove" },
        },
        required: ["product_id"],
      },
      execute: (args) => {
        const productId = args.product_id as string;
        const store = useShopStore.getState();
        const item = store.cart.find((i) => i.product.id === productId);
        if (!item) {
          return { error: `Product "${productId}" is not in the cart` };
        }
        store.removeFromCart(productId);
        const cartTotal = useShopStore.getState().cart.reduce((s, i) => s + i.quantity, 0);
        log("remove_from_cart", item.product.name, `cart: ${cartTotal} items`);
        return { removed: item.product.name, cartItemCount: cartTotal };
      },
    },

    // 8. get_cart
    {
      name: "get_cart",
      description:
        "Get current shopping cart contents, including items, quantities, subtotal, applied discounts, and total.",
      parameters: {
        type: "object",
        properties: {},
      },
      execute: () => {
        const store = useShopStore.getState();
        const { subtotal, discount, total } = store.getCartTotal();
        store.setRightPanel("cart");
        const items = store.cart.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          lineTotal: i.product.price * i.quantity,
        }));
        log(
          "get_cart",
          "",
          `${items.length} items, $${total.toFixed(2)}`
        );
        return {
          items,
          itemCount: store.cart.reduce((s, i) => s + i.quantity, 0),
          subtotal: Math.round(subtotal * 100) / 100,
          discount: Math.round(discount * 100) / 100,
          appliedDeal: store.appliedDeal?.code || null,
          total: Math.round(total * 100) / 100,
        };
      },
    },

    // 9. check_deals
    {
      name: "check_deals",
      description:
        "Find available deals and coupons. Can filter by category or show deals applicable to current cart.",
      parameters: {
        type: "object",
        properties: {
          category: { type: "string", description: "Filter deals by category (optional)" },
        },
      },
      execute: (args) => {
        const category = args.category as string | undefined;
        let applicableDeals = allDeals;
        if (category) {
          applicableDeals = allDeals.filter((d) =>
            d.applicableCategories.includes(category)
          );
        }
        useShopStore.getState().setRightPanel("deals");
        log(
          "check_deals",
          category ? `category: ${category}` : "all",
          `${applicableDeals.length} deals found`
        );
        return { deals: applicableDeals };
      },
    },

    // 10. apply_deal
    {
      name: "apply_deal",
      description:
        "Apply a coupon code to the shopping cart. Validates the code and applies the discount.",
      parameters: {
        type: "object",
        properties: {
          code: { type: "string", description: "The coupon code to apply" },
        },
        required: ["code"],
      },
      execute: (args) => {
        const code = (args.code as string).toUpperCase();
        const deal = allDeals.find((d) => d.code === code);
        if (!deal) {
          log("apply_deal", code, "invalid code");
          return { error: `Coupon code "${code}" is not valid` };
        }
        const store = useShopStore.getState();
        const { subtotal } = store.getCartTotal();
        if (subtotal < deal.minPurchase) {
          log("apply_deal", code, `min purchase $${deal.minPurchase} not met`);
          return {
            error: `Minimum purchase of $${deal.minPurchase} required for code "${code}". Current subtotal: $${subtotal.toFixed(2)}`,
          };
        }
        // Check if cart has items from applicable categories
        const cartCategories = new Set(store.cart.map((i) => i.product.category));
        const hasApplicable = deal.applicableCategories.some((c) => cartCategories.has(c));
        if (!hasApplicable && store.cart.length > 0) {
          log("apply_deal", code, "no applicable items in cart");
          return {
            error: `Code "${code}" applies to: ${deal.applicableCategories.join(", ")}. No matching items in cart.`,
          };
        }
        store.setAppliedDeal(deal);
        store.setRightPanel("cart");
        const { discount, total } = useShopStore.getState().getCartTotal();
        log("apply_deal", `${code} (${deal.discountPercent}% off)`, `saved $${discount.toFixed(2)}`);
        return {
          applied: true,
          code: deal.code,
          description: deal.description,
          discountPercent: deal.discountPercent,
          discountAmount: Math.round(discount * 100) / 100,
          newTotal: Math.round(total * 100) / 100,
        };
      },
    },
  ];
}
