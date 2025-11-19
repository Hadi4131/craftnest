"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { useState } from "react";

interface Testimonial {
  id: number;
  testimonial: string;
  author: string;
  role: string;
  avatar: string;
}

interface CardProps extends Testimonial {
  handleShuffle: () => void;
  position: string;
}

export function TestimonialCard({ handleShuffle, testimonial, position, id, author, role, avatar }: CardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
        scale: position === "front" ? 1 : position === "middle" ? 0.95 : 0.9,
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e: any) => {
        if (dragRef.current - e.clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[400px] w-[320px] select-none place-content-center space-y-6 rounded-2xl border border-brand-peach/30 bg-white p-6 shadow-2xl shadow-brand-orange/10 ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div className="relative mx-auto h-24 w-24">
        <div className="absolute inset-0 rounded-full bg-brand-peach/20 blur-md"></div>
        <img
          src={avatar}
          alt={`Avatar of ${author}`}
          className="relative h-24 w-24 rounded-full border-2 border-white object-cover shadow-md"
        />
      </div>
      <span className="text-center text-lg font-light italic text-slate-600 leading-relaxed">"{testimonial}"</span>
      <div className="text-center">
        <span className="block text-base font-bold text-slate-900">{author}</span>
        <span className="block text-xs font-medium text-brand-deep uppercase tracking-wider">{role}</span>
      </div>
    </motion.div>
  );
};

// --- The Main Component ---

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    testimonial: "The quality of the wool is unmatched. I wear my sweater every single day. It feels like a warm hug.",
    author: "Sarah Jenkins",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    testimonial: "Finally, a brand that understands true minimalism. The packaging was biodegradable too!", 
    author: "Marcus Chen",
    role: "Art Director",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    testimonial: "Shipping was incredibly fast. I ordered the canvas tote for my studio and it fits everything perfectly.",
    author: "Emily R.",
    role: "Illustrator",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

export function TestimonialSection() {
  const [positions, setPositions] = useState(["front", "middle", "back"]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop()!);
    setPositions(newPositions);
  };

  return (
    <div className="grid place-content-center overflow-hidden py-10 w-full">
      {/* Mobile Instruction */}
      <p className="text-center text-xs text-brand-deep mb-8 md:hidden animate-pulse">
        ← Swipe cards to read more
      </p>
      
      <div className="relative -ml-[100px] h-[400px] w-[320px] md:-ml-[160px]">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            handleShuffle={handleShuffle}
            position={positions[index]}
          />
        ))}
      </div>
    </div>
  );
}
