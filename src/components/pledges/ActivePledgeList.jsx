
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { difficultyColors, categoryIcons } from '@/components/pledges/pledgeData';

const ActivePledgeList = ({ pledges, onComplete, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-gray-900">Your Active Pledges</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pledges.map((pledge) => (
          <motion.div
            key={pledge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="category-card rounded-xl p-6 space-y-4 border-l-4 border-purple-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{categoryIcons[pledge.category] || '🌱'}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{pledge.title}</h4>
                  <p className="text-sm text-gray-600">{pledge.description}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => onRemove(pledge.id)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${difficultyColors[pledge.difficulty]} text-white`}>
                  {pledge.difficulty}
                </div>
                <div className="text-sm text-gray-600">
                  <TrendingDown className="w-4 h-4 inline mr-1" />
                  {pledge.impact} kg CO₂/year
                </div>
              </div>
              <Button onClick={() => onComplete(pledge.id)} className="eco-button text-white" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivePledgeList;
