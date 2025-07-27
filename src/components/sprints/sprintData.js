import React from 'react';

export const sprintCategories = [
  { value: 'food', label: 'Food & Diet', emoji: '🥗' },
  { value: 'transport', label: 'Transportation', emoji: '🚲' },
  { value: 'energy', label: 'Energy', emoji: '💡' },
  { value: 'waste', label: 'Waste', emoji: '♻️' },
  { value: 'consumption', label: 'Consumption', emoji: '🛍️' },
  { value: 'buildings', label: 'Buildings', emoji: '🏠' },
  { value: 'general', label: 'General', emoji: '🌱' }
];

export const predefinedSprints = [
  // Food
  {
    title: 'Meat-Free Challenge',
    description: 'Avoid eating meat for consecutive days',
    category: 'food',
    targetDays: 7,
    emoji: '🥗'
  },
  {
    title: 'Zero Food Waste',
    description: 'Avoid throwing away any food',
    category: 'food',
    targetDays: 10,
    emoji: '🍽️'
  },
  {
    title: 'Localvore Diet',
    description: 'Eat only locally sourced food items',
    category: 'food',
    targetDays: 14,
    emoji: '🧑‍🌾'
  },
  // Waste
  {
    title: 'Plastic-Free Shopping',
    description: 'Shop without single-use plastic items',
    category: 'waste',
    targetDays: 14,
    emoji: '♻️'
  },
  {
    title: 'Compost Champion',
    description: 'Compost all eligible organic waste',
    category: 'waste',
    targetDays: 30,
    emoji: '🗑️'
  },
  {
    title: 'Zero-Waste Lunches',
    description: 'Pack lunches with no disposable packaging',
    category: 'waste',
    targetDays: 5,
    emoji: '🍱'
  },
  // Buildings
  {
    title: 'Energy Hour Blackout',
    description: 'Turn off all non-essential electronics for one hour daily',
    category: 'buildings',
    targetDays: 7,
    emoji: '🔌'
  },
  {
    title: 'Thermostat Challenge',
    description: 'Adjust thermostat by 2°C/4°F to save energy',
    category: 'buildings',
    targetDays: 21,
    emoji: '🌡️'
  },
  {
    title: 'Natural Light User',
    description: 'Rely on natural light instead of artificial lighting during the day',
    category: 'buildings',
    targetDays: 15,
    emoji: '☀️'
  },
  // Transport
  {
    title: 'Car-Free Commute',
    description: 'Use public transport, bike, or walk instead of driving',
    category: 'transport',
    targetDays: 5,
    emoji: '🚲'
  },
  // Consumption
  {
    title: 'Buy Nothing New',
    description: 'Avoid purchasing new items (except essentials)',
    category: 'consumption',
    targetDays: 21,
    emoji: '🛍️'
  },
  // Energy
  {
    title: 'Unplug Standby Devices',
    description: 'Unplug devices from the wall when not in use',
    category: 'energy',
    targetDays: 10,
    emoji: '💡'
  }
];