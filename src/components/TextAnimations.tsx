"use client";

import { motion } from 'framer-motion';

export const SplitText = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  as: Component = 'div',
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: any;
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as any,
      }
    },
  };

  return (
    <Component className={className}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="flex flex-wrap"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.25em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </Component>
  );
};

export const BlurText = ({
  text,
  className = '',
  delay = 0,
  as: Component = 'p',
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: any;
}) => {
  return (
    <Component className={className}>
      <motion.span
        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </Component>
  );
};
