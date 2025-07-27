import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { predefinedPledges } from '@/components/pledges/pledgeData';
import PledgeStats from '@/components/pledges/PledgeStats';
import ActivePledgeList from '@/components/pledges/ActivePledgeList';
import AvailablePledgeList from '@/components/pledges/AvailablePledgeList';
import PledgeForm from '@/components/pledges/PledgeForm';
import CompletedPledgeList from '@/components/pledges/CompletedPledgeList';

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

    const impactReduction = pledge.impact || 0;
    setCarbonData(prev => ({
      ...prev,
      totalFootprint: Math.max(0, prev.totalFootprint - impactReduction),
      categories: {
        ...prev.categories,
        [pledge.category]: Math.max(0, (prev.categories[pledge.category] || 0) - impactReduction)
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

  return (
    <div className="space-y-8">
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

      <PledgeStats activePledges={activePledges} completedPledges={completedPledges} />

      {activePledges.length > 0 && (
        <ActivePledgeList 
          pledges={activePledges} 
          onComplete={completePledge} 
          onRemove={removePledge} 
        />
      )}

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
        <AvailablePledgeList 
          pledges={predefinedPledges.filter(p => !pledges.some(ap => ap.title === p.title))} 
          onPledge={makePledge} 
        />
      </motion.div>

      <AnimatePresence>
        {showCreateForm && (
          <PledgeForm
            newPledge={newPledge}
            setNewPledge={setNewPledge}
            onCreate={makePledge}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </AnimatePresence>

      {completedPledges.length > 0 && (
        <CompletedPledgeList pledges={completedPledges} />
      )}
    </div>
  );
};

export default PledgeManager;