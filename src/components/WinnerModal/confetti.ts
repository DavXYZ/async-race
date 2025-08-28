export const CONFETTI_COUNT = 20;
export const MAX_LEFT = 100;
export const MAX_DELAY = 2;
export const HUE_MAX = 360;
export const CLOSE_DELAY = 300;

export const createConfetti = (): { left: string; delay: string; color: string }[] =>
  Array.from({ length: CONFETTI_COUNT }, () => ({
    left: `${Math.random() * MAX_LEFT}%`,
    delay: `${Math.random() * MAX_DELAY}s`,
    color: `hsl(${Math.random() * HUE_MAX}, 70%, 60%)`,
  }));
