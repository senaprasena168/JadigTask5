import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for the caterpillar character
export const caterpillarVariants = {
  standby: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
  active: {
    scale: 1.1,
    rotate: 10,
    transition: {
      duration: 0.3,
    },
  },
  triggered: {
    scale: 1.2,
    rotate: 30,
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// Animation variants for buttons
export const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Animation variants for alarm items
export const alarmItemVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

// Animation variants for the alarm list
export const alarmListVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Animation variants for the caterpillar wiggle
export const wiggleVariants = {
  wiggle: {
    x: ['0%', '20%', '0%', '-20%', '0%'],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
