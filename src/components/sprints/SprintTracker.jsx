import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { sprintCategories, predefinedSprints } from '@/components/sprints/sprintData';
import { getDaysElapsed } from '@/components/sprints/sprintUtils';
import SprintStats from '@/components/sprints/SprintStats';
import ActiveSprintList from '@/components/sprints/ActiveSprintList';
import QuickStartSprintList from '@/components/sprints/QuickStartSprintList';
import SprintForm from '@/components/sprints/SprintForm';
import CompletedSprintList from '@/components/sprints/CompletedSprintList';

const SprintTracker = ({ sprints, setSprints }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSprint, setNewSprint] = useState({
    title: '',
    description: '',
    category: 'food',
    targetDays: 7
  });
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setSprints(prevSprints => 
        prevSprints.map(sprint => {
          if (sprint.isActive) {
            const elapsed = getDaysElapsed(sprint.startTime);
            if (elapsed >= sprint.targetDays) {
              if (!sprint.completed) {
                toast({
                  title: "Sprint Completed! 🎉",
                  description: `Congratulations! You completed "${sprint.title}"`,
                  duration: 5000
                });
              }
              return {
                ...sprint,
                isActive: false,
                completed: true,
                completedAt: new Date().toISOString(),
                currentStreak: elapsed,
                bestStreak: Math.max(sprint.bestStreak, elapsed)
              };
            }
          }
          return sprint;
        })
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [setSprints, toast]);

  const createSprint = (sprintData) => {
    const newSprintObj = {
      id: Date.now().toString(),
      ...sprintData,
      startTime: new Date().toISOString(),
      isActive: true,
      completed: false,
      currentStreak: 0,
      bestStreak: sprintData.bestStreak || 0,
      pausedAt: null,
      completedAt: null
    };

    setSprints(prev => [...prev, newSprintObj]);
    setShowCreateForm(false);
    setNewSprint({ title: '', description: '', category: 'food', targetDays: 7 });
    
    toast({
      title: "Sprint Started! 🚀",
      description: `"${sprintData.title}" is now active`,
      duration: 3000
    });
  };

  const handleSprintAction = (action, sprintId) => {
    setSprints(prevSprints => {
      return prevSprints.map(sprint => {
        if (sprint.id !== sprintId) return sprint;

        const daysElapsed = getDaysElapsed(sprint.startTime, sprint.pausedAt);
        const newBestStreak = Math.max(sprint.bestStreak, daysElapsed);

        switch (action) {
          case 'pause':
            toast({ title: "Sprint Paused", description: "You can resume this sprint anytime" });
            return { ...sprint, isActive: false, pausedAt: new Date().toISOString() };
          case 'resume':
            toast({ title: "Sprint Resumed! 💪", description: "Keep up the great work!" });
            return { ...sprint, isActive: true, pausedAt: null };
          case 'reset':
            toast({ title: "Sprint Reset! 🔄", description: "Starting fresh with renewed energy!" });
            return { 
              ...sprint,
              startTime: new Date().toISOString(),
              isActive: true,
              completed: false,
              currentStreak: 0,
              bestStreak: newBestStreak,
              pausedAt: null
            };
          case 'delete':
            toast({ title: "Sprint Deleted", description: "Sprint has been removed" });
            return null;
          default:
            return sprint;
        }
      }).filter(Boolean); // filter(Boolean) removes null values (deleted sprints)
    });
  };

  const activeSprints = sprints.filter(sprint => sprint.isActive);
  const completedSprints = sprints.filter(sprint => sprint.completed);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <Timer className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Eco Sprints</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Challenge yourself with time-based eco-friendly goals. Track your streaks and beat your personal best!
        </p>
      </motion.div>

      <SprintStats sprints={sprints} activeSprints={activeSprints} completedSprints={completedSprints} />

      {activeSprints.length > 0 && (
        <ActiveSprintList 
          sprints={activeSprints} 
          onAction={handleSprintAction} 
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Quick Start Sprints</h3>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="eco-button text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Sprint
          </Button>
        </div>
        <QuickStartSprintList 
          sprints={predefinedSprints} 
          onStart={createSprint} 
        />
      </motion.div>
      
      <AnimatePresence>
        {showCreateForm && (
          <SprintForm
            newSprint={newSprint}
            setNewSprint={setNewSprint}
            onCreate={createSprint}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </AnimatePresence>

      {completedSprints.length > 0 && (
        <CompletedSprintList 
          sprints={completedSprints} 
          onAction={handleSprintAction} 
        />
      )}
    </div>
  );
};

export default SprintTracker;