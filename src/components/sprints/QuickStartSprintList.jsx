import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const QuickStartSprintList = ({ sprints, onStart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sprints.map((sprint, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="category-card rounded-xl p-6 space-y-4 cursor-pointer group hover:shadow-lg"
          onClick={() => onStart(sprint)}
        >
          <div className="text-center space-y-3">
            <span className="text-4xl">{sprint.emoji}</span>
            <h4 className="font-bold text-gray-900">{sprint.title}</h4>
            <p className="text-sm text-gray-600">{sprint.description}</p>
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {sprint.targetDays} days
            </div>
          </div>
          <Button className="w-full eco-button text-white group-hover:shadow-md">
            Start Sprint
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStartSprintList;