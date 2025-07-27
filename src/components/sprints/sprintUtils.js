import React from 'react';

export const getDaysElapsed = (startTime, pausedAt = null) => {
  const start = new Date(startTime);
  const end = pausedAt ? new Date(pausedAt) : new Date();
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
};

export const getTimeRemaining = (startTime, targetDays) => {
  const start = new Date(startTime);
  const target = new Date(start.getTime() + targetDays * 24 * 60 * 60 * 1000);
  const now = new Date();
  const remaining = target - now;
  
  if (remaining <= 0) return { days: 0, hours: 0, minutes: 0 };
  
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};