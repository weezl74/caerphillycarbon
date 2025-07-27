import React from 'react';

export const difficultyColors = {
  easy: 'from-green-400 to-emerald-500',
  medium: 'from-yellow-400 to-orange-500',
  hard: 'from-red-400 to-pink-500'
};

export const categoryIcons = {
  energy: '⚡',
  transport: '🚗',
  food: '🍽️',
  waste: '♻️',
  consumption: '🛍️',
  buildings: '🏠',
  lifestyle: '🧑‍🤝‍🧑'
};

export const predefinedPledges = [
  {
    title: 'Switch to a Green Energy Tariff',
    description: 'Choose a supplier providing 100% renewable energy.',
    category: 'energy',
    impact: 1500,
    difficulty: 'easy',
    emoji: '💨',
    link: 'https://www.uswitch.com/gas-electricity/green-energy/'
  },
  {
    title: 'Install Solar Panels',
    description: 'Generate your own zero-emission electricity.',
    category: 'energy',
    impact: 2500,
    difficulty: 'hard',
    emoji: '☀️',
    link: 'https://energysavingtrust.org.uk/advice/solar-panels/'
  },
  {
    title: 'Adopt Renewable Heating',
    description: 'Replace fossil fuel boilers with a heat pump.',
    category: 'energy',
    impact: 2000,
    difficulty: 'hard',
    emoji: '♨️',
    link: 'https://energysavingtrust.org.uk/advice/heat-pumps/'
  },
  {
    title: 'Reduce Meat Consumption',
    description: 'Eat meat only 3 days per week instead of daily',
    category: 'food',
    impact: 800,
    difficulty: 'medium',
    emoji: '🥗'
  },
  {
    title: 'Use Public Transportation',
    description: 'Take public transport for 50% of your commutes',
    category: 'transport',
    impact: 1200,
    difficulty: 'medium',
    emoji: '🚌'
  },
  {
    title: 'Start Composting',
    description: 'Compost organic waste instead of throwing it away.',
    category: 'waste',
    impact: 300,
    difficulty: 'easy',
    emoji: '🌱',
    link: 'https://www.rhs.org.uk/advice/profile?pid=444'
  },
  {
    title: 'Buy Second-Hand First',
    description: 'Check second-hand options before buying new items.',
    category: 'consumption',
    impact: 500,
    difficulty: 'medium',
    emoji: '♻️',
    link: 'https://www.moneysavingexpert.com/shopping/charity-shop-shopping-tips/'
  },
  {
    title: 'Go Car-Free',
    description: 'Use only walking, cycling, and public transport',
    category: 'transport',
    impact: 3000,
    difficulty: 'hard',
    emoji: '🚲'
  },
  {
    title: 'Zero Waste Lifestyle',
    description: 'Eliminate all non-recyclable waste from daily life',
    category: 'waste',
    impact: 1000,
    difficulty: 'hard',
    emoji: '🗑️'
  },
  {
    title: "Use a Food Caddy",
    description: "Dispose of food waste that can't be composted via anaerobic digestion.",
    category: 'waste',
    impact: 150,
    difficulty: 'easy',
    emoji: '🥕',
    link: 'https://www.recyclenow.com/re-cycle-and-repeat/food-waste-caddy-liners'
  },
  {
    title: 'Go Paperless',
    description: 'Sign up for paperless billing and correspondence for all your accounts.',
    category: 'consumption',
    impact: 50,
    difficulty: 'easy',
    emoji: '🧾'
  },
  {
    title: 'Get Chickens',
    description: 'A bigger commitment, chickens turn kitchen scraps into eggs and compost.',
    category: 'lifestyle',
    impact: 250,
    difficulty: 'hard',
    emoji: '🐔',
    link: 'https://www.omlet.co.uk/guide/chickens/should_i_get_chickens/is_it_hard_to_keep_chickens/'
  },
  {
    title: 'Carry a Reusable Water Bottle',
    description: 'Refill a reusable bottle to reduce single-use plastic waste.',
    category: 'consumption',
    impact: 100,
    difficulty: 'easy',
    emoji: '💧'
  }
];