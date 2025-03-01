'use client';

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { bubblegum, tomorrow } from './fonts/fonts';
import OutfitContextForm, { OutfitContext } from './components/OutfitContextForm';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function RatingPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [outfitContext, setOutfitContext] = useState<OutfitContext>({
    age: '',
    occasion: '',
    country: '',
    specialNotes: ''
  });

  useEffect(() => {
    localStorage.removeItem('outfitImage');
    localStorage.removeItem('outfitContext');
    localStorage.removeItem('outfitRatings');
  }, []); 

  const handleContextChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOutfitContext(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGetRating = () => {
    if (image) {
      // Store data in localStorage for the next page
      console.log(outfitContext);
      localStorage.setItem('outfitImage', image);
      localStorage.setItem('outfitContext', JSON.stringify(outfitContext));
      router.push('/rating');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      
      // 1. Get presigned URL from your backend
      const { presignedUrl, objectUrl } = await fetch(`${process.env.OUTFIT_BE_URL}/api/get-upload-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileType: "png" })
      }).then(r => r.json());

      // 2. Upload directly to R2 with presigned URL
      await fetch(presignedUrl, {
        method: 'PUT',
        mode: 'cors',
        body: file
      });

      console.log(objectUrl);

      // 3. Save the final URL
      setImage(objectUrl);
      localStorage.setItem('outfitImage', objectUrl);
    }
  });

  return (
    <main className={`min-h-screen p-8 background ${bubblegum.className}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white text-center mb-12 r">
          Rate My Fit
        </h1>
        
        <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 ${tomorrow.className}`}>
          <div className="space-y-8">
            
            {!image && (
              <div {...getRootProps()}>
                <motion.div
                  className={`border-4 border-dashed rounded-xl p-8 text-center cursor-pointer
                  ${isDragActive ? 'border-white' : 'border-gray-300'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input {...getInputProps()} />
                <p className="text-white text-xl">
                  Drop your fit pic here or click to upload
                </p>
                <p className="text-white/60 mt-2">
                  Supports JPG, PNG and WebP
                </p>
                </motion.div>
              </div>
            )}

            {image && (
              <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt="Uploaded outfit"
                  className="w-full h-auto object-contain"
                />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Remove Image
                </button>
              </div>
              
            )}

            <OutfitContextForm 
              context={outfitContext}
              onChange={handleContextChange}
            />

            {image && (
              <motion.button
                onClick={handleGetRating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Rate
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 