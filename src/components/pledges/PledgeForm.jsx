
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PledgeForm = ({ newPledge, setNewPledge, onCreate, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="category-card rounded-xl p-8 space-y-6"
    >
      <h3 className="text-xl font-bold text-gray-900">Create Custom Pledge</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Pledge Title</label>
          <input
            type="text"
            value={newPledge.title}
            onChange={(e) => setNewPledge(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Install Rain Water Collection"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Estimated Impact (kg CO₂/year)</label>
          <input
            type="number"
            value={newPledge.impact}
            onChange={(e) => setNewPledge(prev => ({ ...prev, impact: parseInt(e.target.value) || 0 }))}
            placeholder="e.g., 500"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={newPledge.category}
            onChange={(e) => setNewPledge(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="energy">⚡ Energy</option>
            <option value="transport">🚗 Transport</option>
            <option value="food">🍽️ Food</option>
            <option value="waste">♻️ Waste</option>
            <option value="consumption">🛍️ Consumption</option>
            <option value="buildings">🏠 Buildings</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Difficulty</label>
          <select
            value={newPledge.difficulty}
            onChange={(e) => setNewPledge(prev => ({ ...prev, difficulty: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newPledge.description}
            onChange={(e) => setNewPledge(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what you'll do to achieve this pledge..."
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
          onClick={() => onCreate(newPledge)}
          disabled={!newPledge.title || !newPledge.description}
          className="eco-button text-white"
        >
          Make Pledge
        </Button>
      </div>
    </motion.div>
  );
};

export default PledgeForm;
