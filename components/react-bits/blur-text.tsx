'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function BlurText({ text, className = '', delay = 90 }: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <p ref={ref} className={`blur-text ${className}`} aria-label={text}>
      {text.split(' ').map((word, index) => (
        <motion.span
          className="blur-text__word"
          key={`${word}-${index}`}
          initial={reducedMotion ? false : { filter: 'blur(10px)', opacity: 0, y: -24 }}
          animate={inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, delay: reducedMotion ? 0 : (index * delay) / 1000, ease: 'easeOut' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
