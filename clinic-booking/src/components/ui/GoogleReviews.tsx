"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, ExternalLink } from 'lucide-react';

interface Review {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceDetails {
  rating?: number;
  user_ratings_total?: number;
  reviews?: Review[];
}

export default function GoogleReviews() {
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        setPlaceDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-300 text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-red-600">Unable to load reviews: {error}</p>
      </div>
    );
  }

  if (!placeDetails || !placeDetails.reviews || placeDetails.reviews.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            What Our Patients Say
          </h3>
          {placeDetails.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(Math.round(placeDetails.rating))}</div>
              <span className="text-2xl font-bold text-gray-800">
                {placeDetails.rating.toFixed(1)}
              </span>
              <span className="text-gray-600">
                ({placeDetails.user_ratings_total} reviews)
              </span>
            </div>
          )}
        </div>
        <a
          href={`https://search.google.com/local/writereview?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
        >
          Write a Review
          <ExternalLink className="ml-2 w-4 h-4" />
        </a>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeDetails.reviews.slice(0, 6).map((review, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
          >
            {/* Reviewer Info */}
            <div className="flex items-center space-x-3 mb-4">
              {review.profile_photo_url ? (
                <Image
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.author_name.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  {review.author_name}
                </h4>
                <p className="text-sm text-gray-500">
                  {review.relative_time_description}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex mb-3">{renderStars(review.rating)}</div>

            {/* Review Text */}
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
              {review.text}
            </p>

            {/* Google Link */}
            {review.author_url && (
              <a
                href={review.author_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-3"
              >
                View on Google
                <ExternalLink className="ml-1 w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-8">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
        >
          View All Reviews on Google
          <ExternalLink className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
}