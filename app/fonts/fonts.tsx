import { Bubblegum_Sans, Tomorrow } from 'next/font/google';

const bubblegum = Bubblegum_Sans({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bubblegum',
});

const tomorrow = Tomorrow({ 
  weight: '200',
  subsets: ['latin'],
  variable: '--font-tomorrow',
});

export { bubblegum, tomorrow };