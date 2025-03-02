import { motion } from 'framer-motion';
import React from 'react';
import { OutfitContext } from '../components/outfitContextForm';
import { tomorrow } from '../fonts/fonts';
import type { RatingsResponse } from '../types/ratingResponse';


export default function RatingDisplay({ ratingResponse, outfitContext }: { ratingResponse: RatingsResponse, outfitContext: OutfitContext }) {
  const contextLabels = {
    occasion: {
      casual: "Casual",
      workWear: "Work Wear",
      dateNight: "Date Night",
      formal: "Formal Event",
      party: "Party",
      sports: "Sports",
      travel: "Travel",
      wedding: "Wedding",
      other: "Other"
    },
    country: {
      us: "United States",
      uk: "United Kingdom",
      fr: "France",
      jp: "Japan",
      kr: "South Korea",
      in: "India"
    }
  };


  if (!ratingResponse.isOutfitIdentifiable) {
    return (
      <div className={`space-y-6 ${tomorrow.className}`}>
        <motion.div className="bg-red-500/10 text-red-200 p-4 rounded-xl">
          Are you sure this is an outfit?
        </motion.div>
        <p className="text-white/80 text-sm">{ratingResponse.comment}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${tomorrow.className}`}>

      <motion.div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium text-lg">Overall Rating</h3>
          <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full">
            {ratingResponse.overallRating}/5
          </span>
        </div>
        <p className="text-white/80 text-sm">{ratingResponse.comment}</p>
      </motion.div>

      <motion.div
        className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-white font-medium text-lg mb-4">Outfit Context</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {outfitContext.age && (
            <div className="mt-4">
              <span className="text-white/60 text-sm">Age:</span>
              <p className="text-white text-sm mt-1">{outfitContext.age}</p>
            </div>
          )}
          {outfitContext.occasion && (
            <div>
              <span className="text-white/60">Occasion:</span>
              <span className="text-white ml-2">{contextLabels.occasion[outfitContext.occasion as keyof typeof contextLabels.occasion]}</span>
            </div>
          )}
          {outfitContext.country && (
            <div>
              <span className="text-white/60">Country:</span>
              <span className="text-white ml-2">{contextLabels.country[outfitContext.country as keyof typeof contextLabels.country]}</span>
            </div>
          )}
        </div>
        {outfitContext.specialNotes && (
          <div className="mt-4">
            <span className="text-white/60 text-sm">Special Notes:</span>
            <p className="text-white text-sm mt-1">{outfitContext.specialNotes}</p>
          </div>
        )}
      </motion.div>

      {ratingResponse.ratings.map((rating, index) => (
        <motion.div
          key={rating.criteria}
          className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/30 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-medium text-lg">{rating.criteria}</h3>
            <motion.span 
              className="text-white font-bold bg-white/10 px-3 py-1 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {rating.rating}/5
            </motion.span>
          </div>
          
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${rating.rating * 20}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 + 0.3 }}
            />
          </div>
          
          <motion.p
            className="text-white/80 mt-4 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {rating.comment}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
} 