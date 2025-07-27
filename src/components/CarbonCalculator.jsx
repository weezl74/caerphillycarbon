
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Zap, Car, Utensils, Trash2, Building, ShoppingBag, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import QuickCalculator from '@/components/QuickCalculator';
import DetailedCalculator from '@/components/DetailedCalculator';

const CarbonCalculator = ({ carbonData, setCarbonData }) => {
  const [calculatorType, setCalculatorType] = useState(null);
  const { toast } = useToast();

  const handleCalculatorSelect = (type) => {
    setCalculatorType(type);
    toast({
      title: "Calculator Selected",
      description: `Starting ${type} calculation mode`,
      duration: 2000
    });
  };

  const handleCalculationComplete = (newData) => {
    setCarbonData({
      ...newData,
      lastCalculated: new Date().toISOString()
    });
    
    toast({
      title: "Calculation Complete! 🌱",
      description: `Your carbon footprint: ${newData.totalFootprint.toFixed(1)} kg CO₂/year`,
      duration: 5000
    });
    
    setCalculatorType(null);
  };

  if (calculatorType === 'quick') {
    return (
      <QuickCalculator 
        onComplete={handleCalculationComplete}
        onBack={() => setCalculatorType(null)}
        currentData={carbonData}
      />
    );
  }

  if (calculatorType === 'detailed') {
    return (
      <DetailedCalculator 
        onComplete={handleCalculationComplete}
        onBack={() => setCalculatorType(null)}
        currentData={carbonData}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 eco-gradient rounded-full flex items-center justify-center mx-auto">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Carbon Footprint Calculator</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose your calculation method to get started. Quick mode provides estimates based on general questions, 
          while detailed mode offers precise calculations with specific data.
        </p>
      </motion.div>

      {/* Calculator Type Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="category-card rounded-xl p-8 text-center space-y-6 cursor-pointer group"
          onClick={() => handleCalculatorSelect('quick')}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <Zap className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">Quick Calculator</h3>
            <p className="text-gray-600">
              Get a fast estimate of your carbon footprint with simple questions about your lifestyle.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>5-10 minutes</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>General lifestyle questions</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Approximate results</span>
            </div>
          </div>

          <Button className="w-full eco-button text-white group-hover:shadow-lg">
            Start Quick Calculation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="category-card rounded-xl p-8 text-center space-y-6 cursor-pointer group"
          onClick={() => handleCalculatorSelect('detailed')}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">Detailed Calculator</h3>
            <p className="text-gray-600">
              Get precise calculations by providing specific data about your energy usage, travel, and consumption.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>15-20 minutes</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Specific data inputs</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Accurate results</span>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white group-hover:shadow-lg">
            Start Detailed Calculation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Categories Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="category-card rounded-xl p-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">What We'll Calculate</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: Zap, label: 'Energy', color: 'from-yellow-400 to-orange-500' },
            { icon: Car, label: 'Transport', color: 'from-blue-400 to-indigo-500' },
            { icon: Utensils, label: 'Food', color: 'from-green-400 to-emerald-500' },
            { icon: Trash2, label: 'Waste', color: 'from-gray-400 to-slate-500' },
            { icon: Building, label: 'Buildings', color: 'from-purple-400 to-violet-500' },
            { icon: ShoppingBag, label: 'Consumption', color: 'from-pink-400 to-rose-500' }
          ].map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center space-y-3"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">{category.label}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Current Footprint Display */}
      {carbonData.totalFootprint > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="category-card rounded-xl p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Current Footprint</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {carbonData.totalFootprint.toFixed(1)} kg CO₂/year
          </div>
          <p className="text-gray-600">
            Last calculated: {new Date(carbonData.lastCalculated).toLocaleDateString()}
          </p>
          <Button
            onClick={() => handleCalculatorSelect('quick')}
            variant="outline"
            className="mt-4"
          >
            Recalculate
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CarbonCalculator;
