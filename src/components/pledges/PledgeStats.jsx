
import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, TrendingDown } from 'lucide-react';

const PledgeStats = ({ activePledges, completedPledges }) => {
  const totalImpact = completedPledges.reduce((sum, pledge) => sum + (pledge.impact || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="category-card rounded-xl p-6 text-center"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{activePledges.length}</h3>
        <p className="text-gray-600">Active Pledges</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="category-card rounded-xl p-6 text-center"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{completedPledges.length}</h3>
        <p className="text-gray-600">Completed</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="category-card rounded-xl p-6 text-center"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingDown className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{totalImpact}</h3>
        <p className="text-gray-600">kg CO₂ Saved</p>
      </motion.div>
    </div>
  );
};

export default PledgeStats;
