"use client";
import { motion } from "framer-motion";

const brandMessage = "FREE SHIPPING ON ORDERS OVER $100  •  HANDCRAFTED IN THE USA  •  SUSTAINABLE MATERIALS  •  LIFETIME WARRANTY  •  ";

export function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-brand-deep/10 bg-brand-cream/30 py-3">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap"
        >
          <span className="mr-4 text-sm font-bold tracking-widest text-brand-deep opacity-80">
            {brandMessage.repeat(4)}
          </span>
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap"
        >
          <span className="mr-4 text-sm font-bold tracking-widest text-brand-deep opacity-80">
            {brandMessage.repeat(4)}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
