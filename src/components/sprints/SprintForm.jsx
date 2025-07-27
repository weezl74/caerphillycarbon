import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { sprintCategories } from '@/components/sprints/sprintData';

const SprintForm = ({ newSprint, setNewSprint, onCreate, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="category-card rounded-xl p-8 space-y-6"
    >
      <h3 className="text-xl font-bold text-gray-900">Create Custom Sprint</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Sprint Title</label>
          <input
            type="text"
            value={newSprint.title}
            onChange={(e) => setNewSprint(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Zero Waste Week"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Target Days</label>
          <input
            type="number"
            value={newSprint.targetDays}
            onChange={(e) => setNewSprint(prev => ({ ...prev, targetDays: parseInt(e.target.value) }))}
            min="1"
            max="365"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={newSprint.category}
            onChange={(e) => setNewSprint(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {sprintCategories.map(category => (
              <option key={category.value} value={category.value}>
                {category.emoji} {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newSprint.description}
            onChange={(e) => setNewSprint(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your sprint goal..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={() => onCreate(newSprint)}
          disabled={!newSprint.title || !newSprint.description}
          className="eco-button text-white"
        >
          Create Sprint
        </Button>
      </div>
    </motion.div>
  );
};

export default SprintForm;