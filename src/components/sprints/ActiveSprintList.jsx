import React from 'react';
import { motion } from 'framer-motion';
import { Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sprintCategories } from '@/components/sprints/sprintData';
import { getDaysElapsed, getTimeRemaining } from '@/components/sprints/sprintUtils';

const ActiveSprintList = ({ sprints, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-gray-900">Active Sprints</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sprints.map((sprint) => {
          const daysElapsed = getDaysElapsed(sprint.startTime);
          const timeRemaining = getTimeRemaining(sprint.startTime, sprint.targetDays);
          const progress = Math.min((daysElapsed / sprint.targetDays) * 100, 100);
          const category = sprintCategories.find(cat => cat.value === sprint.category);

          return (
            <motion.div
              key={sprint.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sprint-card rounded-xl p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category?.emoji || '🌱'}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{sprint.title}</h4>
                    <p className="text-sm text-gray-600">{sprint.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAction('pause', sprint.id)}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAction('reset', sprint.id)}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                      className="text-green-500 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{daysElapsed}</span>
                    <span className="text-xs text-gray-600">of {sprint.targetDays} days</span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Time Remaining</p>
                    <div className="flex justify-end space-x-2 text-sm text-gray-600">
                      <span>{timeRemaining.days}d</span>
                      <span>{timeRemaining.hours}h</span>
                      <span>{timeRemaining.minutes}m</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Personal Best</p>
                    <p className="text-lg font-bold text-purple-600">{sprint.bestStreak} days</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ActiveSprintList;