'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { tomorrow } from '../fonts/fonts';
import { useRouter } from 'next/navigation';
import type { OutfitContext } from '../components/OutfitContextForm';
import type { RatingsResponse } from '../types/ratingResponse';
import FashionItems from '../components/fashionItems';
import RatingDisplay from './RatingDisplay';

export default function RatingResult() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [ratingResponse, setRatingResponse] = useState<RatingsResponse | null>(null);
  const [outfitContext, setOutfitContext] = useState<OutfitContext | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const storedImage = localStorage.getItem('outfitImage');
      const storedContext = localStorage.getItem('outfitContext');
      const storedRatings = localStorage.getItem('outfitRatings');

      if (storedRatings && storedImage && storedContext) {
        setImage(storedImage);
        setOutfitContext(JSON.parse(storedContext));
        setRatingResponse(JSON.parse(storedRatings));
        setIsLoading(false);
        return;
      }

      if (!storedImage || !storedContext) {
        router.push('/');
        return;
      }

      const parsedContext = JSON.parse(storedContext);
      setImage(storedImage);
      setOutfitContext(parsedContext);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_OUTFIT_BE_URL}/api/evaluate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image_url: storedImage,
            country: parsedContext.country,
            occasion: parsedContext.occasion,
            age: parsedContext.age,
            additonalContext: parsedContext.specialNotes
          }),
          signal: AbortSignal.timeout(45000)
        });

        if (!response || response.status !== 200) {
          setIsLoading(false);
          setIsError(true);
          throw new Error('Failed to get ratings');
        }

        const data = await response.json();
        setRatingResponse(data);
        localStorage.setItem('outfitRatings', JSON.stringify(data));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  return (
    <main className={`min-h-screen p-8 background ${tomorrow.className}`}>
      <div className="max-w-4xl mx-auto">
        <FashionItems />
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          {image && (
            <div className="space-y-8">
              <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden" style={{ zIndex: 10 }}>
                {!imageLoaded && (
                  <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}
                <img
                  src={image}
                  alt="Uploaded outfit"
                  className={`object-cover w-full h-auto object-contain ${!imageLoaded ? 'hidden' : 'block'}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {imageLoaded && (
                <>
                  {isLoading ? (
                    <div className="space-y-4">
                      <LoadingBar />
                      <LoadingBar delay={0.2} />
                      <LoadingBar delay={0.4} />
                    </div>
                  ) : isError ? (
                    <div className="space-y-4">
                      <p className="text-red-500">Error loading ratings. Please try again.</p>
                    </div>
                  ) : ratingResponse && outfitContext ? (
                    <RatingDisplay ratingResponse={ratingResponse} outfitContext={outfitContext} />
                  ) : null}
                </>
              )}

              <motion.button
                onClick={() => router.push('/')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Rate Another Outfit
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const LoadingBar = ({ delay = 0 }) => (
  <motion.div
    className="h-4 bg-white/10 rounded-full overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <motion.div
      className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
      initial={{ width: "0%" }}
      animate={{ width: ["0%", "100%", "0%"] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
); 