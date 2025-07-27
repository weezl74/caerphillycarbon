import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Trash2, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sprintCategories } from '@/components/sprints/sprintData';

const CompletedSprintList = ({ sprints, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-gray-900">Completed Sprints</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sprints.map((sprint) => {
          const category = sprintCategories.find(cat => cat.value === sprint.category);
          return (
            <motion.div
              key={sprint.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="category-card rounded-xl p-6 space-y-4 border-2 border-green-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category?.emoji || '🌱'}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{sprint.title}</h4>
                    <p className="text-sm text-gray-600">{sprint.description}</p>
                  </div>
                </div>
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{sprint.targetDays}</div>
                <div className="text-sm text-gray-600">Days Completed</div>
              </div>

              <div className="flex justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAction('reset', sprint.id)}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAction('delete', sprint.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CompletedSprintList;