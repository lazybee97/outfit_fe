import React from 'react';
import { tomorrow } from '../fonts/fonts';
import { motion } from 'framer-motion';

export type OutfitContext = {
  age: string;
  occasion: string;
  country: string;
  specialNotes: string;
};

type OutfitContextFormProps = {
  context: OutfitContext;
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => void;
};

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
    },
  }),
};

export default function OutfitContextForm({ context, onChange }: OutfitContextFormProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ${tomorrow.className}`}>
      <motion.div 
        className="form-control"
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <label className="block text-white mb-2 text-sm">Age</label>
        <input
          type="text"
          name="age"
          value={context.age}
          onChange={onChange}
          placeholder="Enter Age"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
        />
      </motion.div>
      
      <motion.div 
        className="form-control"
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <label className="block text-white mb-2 text-sm">Occasion</label>
        <select
          name="occasion"
          value={context.occasion}
          onChange={onChange}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
        >
          <option value="" className="bg-gray-800">Select Occasion</option>
          <option value="casual" className="bg-gray-800">Casual</option>
          <option value="formal" className="bg-gray-800">Formal</option>
          <option value="business" className="bg-gray-800">Business</option>
          <option value="party" className="bg-gray-800">Party</option>
          <option value="date" className="bg-gray-800">Date</option>
          <option value="wedding" className="bg-gray-800">Wedding</option>
          <option value="other" className="bg-gray-800">Other</option>
        </select>
      </motion.div>

      <motion.div 
        className="form-control"
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <label className="block text-white mb-2 text-sm">Country</label>
        <select
          name="country"
          value={context.country}
          onChange={onChange}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
        >
          <option value="" className="bg-gray-800">Select Country</option>
          <option value="us" className="bg-gray-800">United States</option>
          <option value="uk" className="bg-gray-800">United Kingdom</option>
          <option value="ca" className="bg-gray-800">Canada</option>
          <option value="au" className="bg-gray-800">Australia</option>
          <option value="fr" className="bg-gray-800">France</option>
          <option value="jp" className="bg-gray-800">Japan</option>
          <option value="kr" className="bg-gray-800">South Korea</option>
          <option value="in" className="bg-gray-800">India</option>
          <option value="other" className="bg-gray-800">Other</option>
        </select>
      </motion.div>

      <motion.div 
        className="form-control"
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <label className="block text-white mb-2 text-sm">Any special notes?</label>
        <textarea
          name="specialNotes"
          value={context.specialNotes}
          onChange={onChange}
          placeholder="e.g. clubbing with friends..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 min-h-[80px]"
        />
      </motion.div>
    </div>
  );
} 