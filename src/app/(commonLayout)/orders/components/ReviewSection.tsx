import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ReviewSection({ item, onReviewSubmit }: { item: any, onReviewSubmit: (rating: number, comment: string) => void }) {
    const [rating, setRating] = useState(item.reviewRating || "");
    const [comment, setComment] = useState(item.reviewComment || "");

    return (
        <div className="mt-3 p-3 bg-red-50/50 rounded-lg border border-red-100 space-y-2">
            <div className="flex gap-2">
                <input
                    type="number"
                    min={1} max={5}
                    placeholder="Rating (1-5)"
                    className="w-24 text-xs p-2 border border-red-200 rounded focus:ring-1 focus:ring-red-500 outline-none"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Share your experience..."
                    className="flex-1 text-xs p-2 border border-red-200 rounded focus:ring-1 focus:ring-red-500 outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <Button
                size="sm"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-[11px] h-8"
                onClick={() => onReviewSubmit(Number(rating), comment)}
            >
                Submit Review
            </Button>
        </div>
    );
};