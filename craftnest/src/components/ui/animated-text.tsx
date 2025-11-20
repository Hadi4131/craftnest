"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedText() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Personal.", "Unique.", "Aesthetic.", "Yours."],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
      &nbsp;
      {titles.map((title, index) => (
        <motion.span
          key={index}
          className="absolute font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-deep to-brand-orange"
          initial={{ opacity: 0, y: 40 }} // Adjusted for smoother entrance
          animate={
            titleNumber === index
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: titleNumber > index ? -40 : 40, // Adjusted exit direction
                  opacity: 0,
                }
          }
          transition={{ type: "spring", stiffness: 50 }}
        >
          {title}
        </motion.span>
      ))}
    </span>
  );
}
