'use client';

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { bubblegum, tomorrow } from './fonts/fonts';
import OutfitContextForm, { OutfitContext } from './components/OutfitContextForm';
import React from 'react';
import { useRouter } from 'next/navigation';
import FashionItems from './components/fashionItems';

export default function RatingPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [outfitContext, setOutfitContext] = useState<OutfitContext>({
    age: '',
    occasion: '',
    country: '',
    specialNotes: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      // Store data in localStorage for the next page
      localStorage.setItem('outfitImage', image);
      localStorage.setItem('outfitContext', JSON.stringify(outfitContext));
      
      // Add a small delay for animation effect
      setTimeout(() => {
        router.push('/rating');
      }, 500);
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
      setIsLoading(true);
      const file = acceptedFiles[0];
      
      // 1. Get presigned URL from your backend
      const { presignedUrl, objectUrl } = await fetch(`${process.env.NEXT_PUBLIC_OUTFIT_BE_URL}/api/get-upload-url`, {
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

      // 3. Save the final URL
      setImage(objectUrl);
      localStorage.setItem('outfitImage', objectUrl);
      setIsLoading(false);
    }
  });

  return (
    <main className={`min-h-screen p-8 background ${bubblegum.className}`}>
      {/* Floating fashion items */}
      <FashionItems />

      <div className={`max-w-4xl mx-auto`}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white text-center mb-12"
          style={{ zIndex: 10 }}
        >
          Rate My Fit
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-container rounded-2xl p-8"
        >
          <div className="space-y-8">
            
            {!image && (
              <div {...getRootProps()} className="upload-area">
                <motion.div
                  className={`border border-dashed rounded-xl p-16 text-center cursor-pointer
                  ${isDragActive ? 'border-white' : 'border-gray-300'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input {...getInputProps()} />
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="mx-auto w-10 h-10 border-t-2 border-white rounded-full"
                    />
                  ) : (
                    <>
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`text-3xl mb-3`}
                      >
                        📸
                      </motion.div>
                      <p className={`text-white text-xl ${tomorrow.className}`}>
                        Drop your fit pic here or click to upload
                      </p>
                      <p className={`text-white/60 mt-2 ${tomorrow.className}`}>
                        Supports JPG, PNG and WebP
                      </p>
                    </>
                  )}
                </motion.div>
              </div>
            )}

            <AnimatePresence>
              {image && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden"
                  style={{ zIndex: 10 }}
                >
                  <img
                    src={image}
                    alt="Uploaded outfit"
                    className="w-full h-auto object-contain opacity-100"
                  />
                  <motion.button 
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Remove Image
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <OutfitContextForm 
              context={outfitContext}
              onChange={handleContextChange}
            />

            {image && (
              <motion.button
                onClick={handleGetRating}
                className="w-full action-button text-white font-bold py-3 px-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 
                  <span className={`flex items-center justify-center`}>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-5 h-5 border-t-2 border-white rounded-full mr-2"
                    />
                    Processing...
                  </span> : 
                  "Let's Rate"
                }
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 