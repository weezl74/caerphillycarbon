
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle, Plus, TrendingDown, Award, Leaf, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PledgeManager = ({ pledges, setPledges, carbonData, setCarbonData }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPledge, setNewPledge] = useState({
    title: '',
    description: '',
    category: 'energy',
    impact: '',
    difficulty: 'easy'
  });
  const { toast } = useToast();

  const predefinedPledges = [
    {
      title: 'Switch to LED Bulbs',
      description: 'Replace all incandescent bulbs with LED alternatives',
      category: 'energy',
      impact: 200,
      difficulty: 'easy',
      emoji: '💡'
    },
    {
      title: 'Reduce Meat Consumption',
      description: 'Eat meat only 3 days per week instead of daily',
      category: 'food',
      impact: 800,
      difficulty: 'medium',
      emoji: '🥗'
    },
    {
      title: 'Use Public Transportation',
      description: 'Take public transport for 50% of your commutes',
      category: 'transport',
      impact: 1200,
      difficulty: 'medium',
      emoji: '🚌'
    },
    {
      title: 'Install Smart Thermostat',
      description: 'Optimize heating and cooling with smart temperature control',
      category: 'energy',
      impact: 600,
      difficulty: 'easy',
      emoji: '🌡️'
    },
    {
      title: 'Start Composting',
      description: 'Compost organic waste instead of throwing it away',
      category: 'waste',
      impact: 300,
      difficulty: 'easy',
      emoji: '🌱'
    },
    {
      title: 'Buy Second-Hand First',
      description: 'Check second-hand options before buying new items',
      category: 'consumption',
      impact: 500,
      difficulty: 'medium',
      emoji: '♻️'
    },
    {
      title: 'Solar Panel Installation',
      description: 'Install solar panels to generate renewable energy',
      category: 'energy',
      impact: 2500,
      difficulty: 'hard',
      emoji: '☀️'
    },
    {
      title: 'Go Car-Free',
      description: 'Use only walking, cycling, and public transport',
      category: 'transport',
      impact: 3000,
      difficulty: 'hard',
      emoji: '🚲'
    },
    {
      title: 'Zero Waste Lifestyle',
      description: 'Eliminate all non-recyclable waste from daily life',
      category: 'waste',
      impact: 1000,
      difficulty: 'hard',
      emoji: '🗑️'
    }
  ];

  const difficultyColors = {
    easy: 'from-green-400 to-emerald-500',
    medium: 'from-yellow-400 to-orange-500',
    hard: 'from-red-400 to-pink-500'
  };

  const categoryIcons = {
    energy: '⚡',
    transport: '🚗',
    food: '🍽️',
    waste: '♻️',
    consumption: '🛍️',
    buildings: '🏠'
  };

  const makePledge = (pledgeData) => {
    const newPledgeObj = {
      id: Date.now().toString(),
      ...pledgeData,
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null
    };

    setPledges(prev => [...prev, newPledgeObj]);
    
    toast({
      title: "Pledge Made! 🎯",
      description: `You've committed to "${pledgeData.title}"`,
      duration: 3000
    });

    if (showCreateForm) {
      setShowCreateForm(false);
      setNewPledge({
        title: '',
        description: '',
        category: 'energy',
        impact: '',
        difficulty: 'easy'
      });
    }
  };

  const completePledge = (pledgeId) => {
    const pledge = pledges.find(p => p.id === pledgeId);
    if (!pledge) return;

    setPledges(prev => 
      prev.map(p => 
        p.id === pledgeId 
          ? { ...p, completed: true, completedAt: new Date().toISOString() }
          : p
      )
    );

    // Update carbon footprint
    const impactReduction = pledge.impact || 0;
    setCarbonData(prev => ({
      ...prev,
      totalFootprint: Math.max(0, prev.totalFootprint - impactReduction),
      categories: {
        ...prev.categories,
        [pledge.category]: Math.max(0, prev.categories[pledge.category] - impactReduction)
      }
    }));

    toast({
      title: "Pledge Completed! 🌟",
      description: `Amazing! You've reduced your footprint by ${impactReduction} kg CO₂/year`,
      duration: 5000
    });
  };

  const removePledge = (pledgeId) => {
    setPledges(prev => prev.filter(p => p.id !== pledgeId));
    
    toast({
      title: "Pledge Removed",
      description: "Pledge has been deleted",
      duration: 2000
    });
  };

  const activePledges = pledges.filter(p => !p.completed);
  const completedPledges = pledges.filter(p => p.completed);
  const totalImpact = completedPledges.reduce((sum, pledge) => sum + (pledge.impact || 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Eco Pledges</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Make commitments to reduce your carbon footprint. Each pledge shows the potential CO₂ savings when completed.
        </p>
      </motion.div>

      {/* Stats */}
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

      {/* Active Pledges */}
      {activePledges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-gray-900">Your Active Pledges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePledges.map((pledge) => (
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removePledge(pledge.id)}
                  >
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
                  <Button
                    onClick={() => completePledge(pledge.id)}
                    className="eco-button text-white"
                    size="sm"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Available Pledges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Available Pledges</h3>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="eco-button text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Pledge
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predefinedPledges
            .filter(pledge => !pledges.some(p => p.title === pledge.title))
            .map((pledge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="category-card rounded-xl p-6 space-y-4 cursor-pointer group hover:shadow-lg"
              onClick={() => makePledge(pledge)}
            >
              <div className="text-center space-y-3">
                <span className="text-4xl">{pledge.emoji}</span>
                <h4 className="font-bold text-gray-900">{pledge.title}</h4>
                <p className="text-sm text-gray-600">{pledge.description}</p>
                
                <div className="flex items-center justify-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${difficultyColors[pledge.difficulty]} text-white`}>
                    {pledge.difficulty}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    -{pledge.impact} kg CO₂
                  </div>
                </div>
              </div>
              
              <Button className="w-full eco-button text-white group-hover:shadow-md">
                Make This Pledge
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Custom Pledge Form */}
      <AnimatePresence>
        {showCreateForm && (
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
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => makePledge(newPledge)}
                disabled={!newPledge.title || !newPledge.description}
                className="eco-button text-white"
              >
                Make Pledge
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completed Pledges */}
      {completedPledges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-gray-900">Completed Pledges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedPledges.map((pledge) => (
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
      )}
    </div>
  );
};

export default PledgeManager;
