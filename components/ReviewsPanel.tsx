"use client";

import { useShopStore } from "@/lib/store";
import { Star, ThumbsUp } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPanel() {
  const activeReviews = useShopStore((s) => s.activeReviews);

  if (activeReviews.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-4">
        <div className="text-center">
          <p className="text-3xl mb-2">💬</p>
          <p className="text-sm">No reviews loaded</p>
          <p className="text-xs mt-1">Click &quot;Reviews&quot; on a product to see them</p>
        </div>
      </div>
    );
  }

  const avg =
    activeReviews.reduce((sum, r) => sum + r.rating, 0) / activeReviews.length;

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-sm">Reviews</h3>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{avg.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">
            ({activeReviews.length})
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {activeReviews.map((review, i) => (
          <div key={i} className="border rounded-md p-2.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{review.author}</span>
                <StarRating rating={review.rating} />
              </div>
              <span className="text-[10px] text-muted-foreground">
                {review.date}
              </span>
            </div>
            <p className="text-xs leading-relaxed">{review.text}</p>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <ThumbsUp className="h-3 w-3" />
              {review.helpful} found helpful
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
