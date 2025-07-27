import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Calculator, Target, Timer, TrendingDown, Home, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import CarbonCalculator from '@/components/CarbonCalculator';
import SprintTracker from '@/components/sprints/SprintTracker';
import PledgeManager from '@/components/pledges/PledgeManager';
import Dashboard from '@/components/Dashboard';
import AdviceCentre from '@/components/advice/AdviceCentre';
import EnergyCentre from '@/components/advice/EnergyCentre';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [carbonData, setCarbonData] = useState(() => {
    const saved = localStorage.getItem('carbonFootprintData');
    return saved ? JSON.parse(saved) : {
      totalFootprint: 0,
      categories: {
        energy: 0,
        transport: 0,
        food: 0,
        waste: 0,
        buildings: 0,
        consumption: 0
      },
      lastCalculated: null
    };
  });
  
  const [sprints, setSprints] = useState(() => {
    const saved = localStorage.getItem('ecoSprints');
    return saved ? JSON.parse(saved) : [];
  });

  const [pledges, setPledges] = useState(() => {
    const saved = localStorage.getItem('ecoPledges');
    return saved ? JSON.parse(saved) : [];
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('carbonFootprintData', JSON.stringify(carbonData));
  }, [carbonData]);

  useEffect(() => {
    localStorage.setItem('ecoSprints', JSON.stringify(sprints));
  }, [sprints]);

  useEffect(() => {
    localStorage.setItem('ecoPledges', JSON.stringify(pledges));
  }, [pledges]);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'energy', label: 'Energy Hub', icon: Zap },
    { id: 'sprints', label: 'Eco Sprints', icon: Timer },
    { id: 'pledges', label: 'Pledges', icon: Target },
    { id: 'advice', label: 'Advice Centre', icon: Lightbulb }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    toast({
      title: "Navigation",
      description: `Switched to ${navigationItems.find(item => item.id === tabId)?.label}`,
      duration: 2000
    });
  };

  return (
    <>
      <Helmet>
        <title>EcoTracker - Carbon Footprint Calculator & Sustainability Tracker</title>
        <meta name="description" content="Track your carbon footprint, set eco-friendly goals, and monitor your environmental impact with our comprehensive sustainability calculator." />
      </Helmet>
      
      <div className="min-h-screen nature-pattern">
        {/* Header */}
        <header className="glass-effect border-b border-green-200/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 eco-gradient rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">EcoTracker</h1>
                  <p className="text-xs text-gray-600">Carbon Footprint Calculator</p>
                </div>
              </motion.div>

              <nav className="hidden md:flex space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      onClick={() => handleTabChange(item.id)}
                      className={`flex items-center space-x-2 ${
                        activeTab === item.id 
                          ? 'eco-button text-white' 
                          : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  );
                })}
              </nav>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {carbonData.totalFootprint.toFixed(1)} kg CO₂
                  </p>
                  <p className="text-xs text-gray-600">Annual footprint</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="md:hidden glass-effect border-b border-green-200/30 sticky bottom-0 z-50">
          <div className="flex justify-around py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTabChange(item.id)}
                  className={`flex flex-col items-center space-y-1 h-auto ${
                    activeTab === item.id 
                      ? 'text-green-600' 
                      : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (
                <Dashboard 
                  carbonData={carbonData}
                  sprints={sprints}
                  pledges={pledges}
                  onNavigate={setActiveTab}
                />
              )}
              
              {activeTab === 'calculator' && (
                <CarbonCalculator 
                  carbonData={carbonData}
                  setCarbonData={setCarbonData}
                />
              )}

              {activeTab === 'energy' && (
                <EnergyCentre />
              )}
              
              {activeTab === 'sprints' && (
                <SprintTracker 
                  sprints={sprints}
                  setSprints={setSprints}
                />
              )}
              
              {activeTab === 'pledges' && (
                <PledgeManager 
                  pledges={pledges}
                  setPledges={setPledges}
                  carbonData={carbonData}
                  setCarbonData={setCarbonData}
                />
              )}

              {activeTab === 'advice' && (
                <AdviceCentre />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="glass-effect border-t border-green-200/30 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                  <span className="font-bold text-gray-900">EcoTracker</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Empowering individuals to track and reduce their carbon footprint for a sustainable future.
                </p>
              </div>
              
              <div>
                <span className="font-semibold text-gray-900 mb-4 block">Categories</span>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Energy & Utilities</p>
                  <p>Transportation</p>
                  <p>Food & Diet</p>
                  <p>Waste Management</p>
                </div>
              </div>
              
              <div>
                <span className="font-semibold text-gray-900 mb-4 block">Impact</span>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Track your progress</p>
                  <p>Set eco-friendly goals</p>
                  <p>Make sustainable choices</p>
                  <p>Reduce environmental impact</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-green-200/30 mt-8 pt-8 text-center">
              <p className="text-gray-600 text-sm">
                © 2024 EcoTracker. Building a sustainable future, one calculation at a time.
              </p>
            </div>
          </div>
        </footer>

        <Toaster />
      </div>
    </>
  );
}

export default App;