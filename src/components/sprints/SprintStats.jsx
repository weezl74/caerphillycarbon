import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Target } from 'lucide-react';

const SprintStats = ({ sprints, activeSprints, completedSprints }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="category-card rounded-xl p-6 text-center"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{activeSprints.length}</h3>
        <p className="text-gray-600">Active Sprints</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="category-card rounded-xl p-6 text-center"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{completedSprints.length}</h3>
        <p className="text-gray-600">Completed</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="category-card rounded-xl p-6 text-center"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          {sprints.reduce((max, sprint) => Math.max(max, sprint.bestStreak || 0), 0)}
        </h3>
        <p className="text-gray-600">Best Streak (days)</p>
      </motion.div>
    </div>
  );
};

export default SprintStats;