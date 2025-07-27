
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Target, Timer, Calculator, Award, Zap, Car, Utensils, Trash2, Building, ShoppingBag, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = ({ carbonData, sprints, pledges, onNavigate }) => {
  const { toast } = useToast();

  const categoryIcons = {
    energy: Zap,
    transport: Car,
    food: Utensils,
    waste: Trash2,
    buildings: Building,
    consumption: ShoppingBag
  };

  const categoryColors = {
    energy: 'from-yellow-400 to-orange-500',
    transport: 'from-blue-400 to-indigo-500',
    food: 'from-green-400 to-emerald-500',
    waste: 'from-gray-400 to-slate-500',
    buildings: 'from-purple-400 to-violet-500',
    consumption: 'from-pink-400 to-rose-500'
  };

  const activeSprints = sprints.filter(sprint => sprint.isActive).length;
  const completedPledges = pledges.filter(pledge => pledge.completed).length;
  
  const getFootprintLevel = (footprint) => {
    if (footprint < 5000) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (footprint < 10000) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (footprint < 15000) return { level: 'Average', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const footprintLevel = getFootprintLevel(carbonData.totalFootprint);

  const handleQuickAction = (action) => {
    toast({
      title: "Quick Action",
      description: `${action} feature coming soon! 🚀`,
      duration: 3000
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold text-gray-900">Welcome to Your Eco Dashboard</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your environmental impact, set sustainable goals, and make a positive difference for our planet.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="category-card rounded-xl p-6 text-center"
        >
          <div className="w-12 h-12 eco-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{carbonData.totalFootprint.toFixed(1)}</h3>
          <p className="text-gray-600">kg CO₂/year</p>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${footprintLevel.bg} ${footprintLevel.color}`}>
            {footprintLevel.level}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="category-card rounded-xl p-6 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{activeSprints}</h3>
          <p className="text-gray-600">Active Sprints</p>
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
          <h3 className="text-2xl font-bold text-gray-900">{completedPledges}</h3>
          <p className="text-gray-600">Pledges Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="category-card rounded-xl p-6 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {Math.max(0, 15000 - carbonData.totalFootprint).toFixed(0)}
          </h3>
          <p className="text-gray-600">kg CO₂ Saved</p>
        </motion.div>
      </div>

      {/* Carbon Footprint Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="category-card rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Carbon Footprint Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(carbonData.categories).map(([category, value]) => {
            const Icon = categoryIcons[category];
            const colorClass = categoryColors[category];
            const percentage = carbonData.totalFootprint > 0 ? (value / carbonData.totalFootprint * 100) : 0;
            
            return (
              <div key={category} className="text-center space-y-3">
                <div className={`w-16 h-16 bg-gradient-to-r ${colorClass} rounded-full flex items-center justify-center mx-auto`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 capitalize">{category}</h4>
                  <p className="text-sm text-gray-600">{value.toFixed(1)} kg CO₂</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`bg-gradient-to-r ${colorClass} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="category-card rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => onNavigate('calculator')}
            className="eco-button text-white h-auto p-4 flex flex-col items-center space-y-2"
          >
            <Calculator className="w-6 h-6" />
            <span>Calculate Footprint</span>
          </Button>
          
          <Button
            onClick={() => onNavigate('sprints')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-auto p-4 flex flex-col items-center space-y-2"
          >
            <Timer className="w-6 h-6" />
            <span>Start Sprint</span>
          </Button>
          
          <Button
            onClick={() => onNavigate('pledges')}
            className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white h-auto p-4 flex flex-col items-center space-y-2"
          >
            <Target className="w-6 h-6" />
            <span>Make Pledge</span>
          </Button>
          
          <Button
            onClick={() => handleQuickAction('Share Progress')}
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white h-auto p-4 flex flex-col items-center space-y-2"
          >
            <Award className="w-6 h-6" />
            <span>Share Progress</span>
          </Button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="category-card rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {carbonData.lastCalculated && (
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Calculator className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Carbon footprint calculated</p>
                <p className="text-sm text-gray-600">
                  {new Date(carbonData.lastCalculated).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
          
          {activeSprints > 0 && (
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Timer className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{activeSprints} eco sprint{activeSprints > 1 ? 's' : ''} active</p>
                <p className="text-sm text-gray-600">Keep up the great work!</p>
              </div>
            </div>
          )}
          
          {completedPledges > 0 && (
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">{completedPledges} pledge{completedPledges > 1 ? 's' : ''} completed</p>
                <p className="text-sm text-gray-600">Amazing commitment to sustainability!</p>
              </div>
            </div>
          )}
          
          {!carbonData.lastCalculated && activeSprints === 0 && completedPledges === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Home className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start your eco journey by calculating your carbon footprint!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
