
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { categoryIcons } from '@/components/pledges/pledgeData';

const CompletedPledgeList = ({ pledges }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-gray-900">Completed Pledges</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pledges.map((pledge) => (
          <motion.div
            key={pledge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="category-card rounded-xl p-6 space-y-4 border-2 border-green-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{categoryIcons[pledge.category] || '🌱'}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{pledge.title}</h4>
                  <p className="text-sm text-gray-600">{pledge.description}</p>
                </div>
              </div>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">-{pledge.impact}</div>
              <div className="text-sm text-gray-600">kg CO₂/year saved</div>
            </div>

            <div className="text-center text-xs text-gray-500">
              Completed: {new Date(pledge.completedAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CompletedPledgeList;
