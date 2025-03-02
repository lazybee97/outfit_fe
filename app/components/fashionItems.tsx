import { motion } from 'framer-motion';


// Use fixed seed values instead of random generation
const fashionItems = [
    { icon: '👕', size: '2rem', left: '10%', top: '15%', delay: 0, duration: 4 },
    { icon: '👗', size: '2.5rem', left: '75%', top: '20%', delay: 1, duration: 5 },
    { icon: '👠', size: '2rem', left: '20%', top: '70%', delay: 2, duration: 6 },
    { icon: '👜', size: '2.2rem', left: '85%', top: '75%', delay: 0.5, duration: 7 },
    { icon: '🧥', size: '2.4rem', left: '45%', top: '10%', delay: 1.5, duration: 5.5 },
    { icon: '👢', size: '1.8rem', left: '80%', top: '40%', delay: 2.5, duration: 4.5 },
    { icon: '🧢', size: '1.6rem', left: '15%', top: '40%', delay: 3, duration: 6.5 },
    { icon: '👓', size: '1.5rem', left: '60%', top: '60%', delay: 1.8, duration: 5.8 },
    { icon: '🧣', size: '2.1rem', left: '30%', top: '25%', delay: 0.7, duration: 5.2 },
    { icon: '🥾', size: '1.9rem', left: '55%', top: '80%', delay: 1.3, duration: 4.8 },
    { icon: '👔', size: '2.3rem', left: '40%', top: '50%', delay: 2.2, duration: 5.3 },
    { icon: '👚', size: '1.7rem', left: '5%', top: '85%', delay: 0.8, duration: 6.2 },
    { icon: '👕', size: '2.2rem', left: '70%', top: '5%', delay: 1.9, duration: 4.9 },
    { icon: '👗', size: '2.4rem', left: '25%', top: '60%', delay: 2.7, duration: 5.7 },
    { icon: '👠', size: '1.6rem', left: '90%', top: '30%', delay: 3.2, duration: 5.1 },
    { icon: '👜', size: '2.0rem', left: '35%', top: '90%', delay: 2.1, duration: 6.3 },
    { icon: '🧥', size: '1.8rem', left: '50%', top: '35%', delay: 1.2, duration: 5.9 },
    { icon: '👢', size: '2.1rem', left: '65%', top: '45%', delay: 0.3, duration: 4.7 },
    { icon: '🧢', size: '1.9rem', left: '75%', top: '65%', delay: 1.7, duration: 6.1 },
    { icon: '👓', size: '2.3rem', left: '15%', top: '55%', delay: 2.4, duration: 5.4 },
    { icon: '🧣', size: '1.7rem', left: '95%', top: '15%', delay: 0.9, duration: 4.6 },
    { icon: '🥾', size: '2.2rem', left: '45%', top: '75%', delay: 1.6, duration: 6.4 },
    { icon: '👔', size: '1.8rem', left: '85%', top: '85%', delay: 2.8, duration: 5.0 },
    { icon: '👚', size: '2.0rem', left: '5%', top: '5%', delay: 0.4, duration: 5.6 }
  ];
  

export default function FashionItems() {
  return (
    <div className="fashion-items" style={{ zIndex: 0 }}>
      {fashionItems.map((item, index) => (
        <motion.div
          key={index}
          className="fashion-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          style={{
            fontSize: item.size,
            left: item.left,
            top: item.top,
          }}
          transition={{
            delay: item.delay,
            duration: 1,
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
} 