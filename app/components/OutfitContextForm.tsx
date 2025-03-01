import React from 'react';
import { tomorrow } from '../fonts/fonts';

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

export default function OutfitContextForm({ context, onChange }: OutfitContextFormProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ${tomorrow.className}`}>
      <div>
        <label className="block text-white mb-2 text-sm">Age</label>
        <input
          type="text"
          name="age"
          value={context.age}
          onChange={onChange}
          placeholder="Enter Age"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
        />
      </div>
      
      <div>
        <label className="block text-white mb-2 text-sm">Occasion</label>
        <select
          name="occasion"
          value={context.occasion}
          onChange={onChange}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
        >
          <option value="" className="bg-gray-800">Select Occasion</option>
          <option value="casual" className="bg-gray-800">Casual</option>
          <option value="workWear" className="bg-gray-800">Work Wear</option>
          <option value="dateNight" className="bg-gray-800">Date Night</option>
          <option value="formal" className="bg-gray-800">Formal Event</option>
          <option value="party" className="bg-gray-800">Party</option>
          <option value="sports" className="bg-gray-800">Sports</option>
          <option value="travel" className="bg-gray-800">Travel</option>
          <option value="wedding" className="bg-gray-800">Wedding</option>
          <option value="other" className="bg-gray-800">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-white mb-2 text-sm">Country</label>
        <select
          name="country"
          value={context.country}
          onChange={onChange}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
        >
          <option value="" className="bg-gray-800">Select Country</option>
          <option value="in" className="bg-gray-800">India</option>
          <option value="us" className="bg-gray-800">United States</option>
          <option value="uk" className="bg-gray-800">United Kingdom</option>
          <option value="fr" className="bg-gray-800">France</option>
          <option value="jp" className="bg-gray-800">Japan</option>
          <option value="kr" className="bg-gray-800">South Korea</option>
        </select>
      </div>

      <div>
        <label className="block text-white mb-2 text-sm">Any special notes?</label>
        <textarea
          name="specialNotes"
          value={context.specialNotes}
          onChange={onChange}
          placeholder="clubbing with friends..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 h-[11px] resize-none"
          style={{ height: 'auto', overflow: 'hidden' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
      </div>
    </div>
  );
} 