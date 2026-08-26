"use client";

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { motion } from 'motion/react';

const AVATARS = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    fallback: 'JK',
    name: 'Jeeva K.',
    role: 'Lead Architect',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    fallback: 'AK',
    name: 'Arun K.',
    role: 'AI & Cloud Engineer',
  },
  {
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    fallback: 'PR',
    name: 'Priya R.',
    role: 'Senior Full-Stack',
  },
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
    fallback: 'KM',
    name: 'Kavya M.',
    role: 'UI/UX Design Lead',
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
    fallback: 'SV',
    name: 'Suresh V.',
    role: 'DevOps & Reliability',
  },
  {
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&h=160&q=80',
    fallback: 'DS',
    name: 'Deepak S.',
    role: 'Mobile Apps Lead',
  },
];

const AvatarGroup = ({ className = '', avatars = AVATARS, size = 'md' }) => {
  const sizeClasses = size === 'lg' 
    ? 'size-12 sm:size-14' 
    : size === 'sm' 
      ? 'size-8 sm:size-9' 
      : 'size-9 sm:size-11';

  return (
    <div className={`avatar-group-container flex items-center ${className}`}>
      {avatars.map((avatar, index) => (
        <motion.div
          key={index}
          className="group relative -ml-2 sm:-ml-2.5 first:ml-0 cursor-pointer shrink-0"
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          whileHover={{ y: -4, scale: 1.15, zIndex: 60 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: avatars.length - index }}
        >
          <Avatar className={`${sizeClasses} border-2 border-white shadow-md transition-shadow hover:shadow-xl`}>
            <AvatarImage src={avatar.src} alt={avatar.name || avatar.tooltip} loading="lazy" />
            <AvatarFallback>{avatar.fallback}</AvatarFallback>
          </Avatar>
          <AvatarGroupTooltip>
            <span className="font-semibold text-white">{avatar.name || avatar.tooltip}</span>
            {avatar.role && <span className="block text-[10px] text-teal-300 font-normal">{avatar.role}</span>}
          </AvatarGroupTooltip>
        </motion.div>
      ))}
    </div>
  );
};

const AvatarGroupTooltip = ({ children, ...props }) => {
  return (
    <span
      className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 z-50 border border-slate-700/60 text-center"
      {...props}
    >
      {children}
    </span>
  );
};

export { AvatarGroup, AvatarGroupTooltip };
export const AvatarGroupDemo = () => <AvatarGroup />;
export default AvatarGroup;
