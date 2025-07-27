
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, Car, Utensils, Zap, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const QuickCalculator = ({ onComplete, onBack, currentData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const { toast } = useToast();

  const questions = [
    {
      id: 'homeSize',
      title: 'Home Size',
      icon: Home,
      question: 'What size is your home?',
      options: [
        { value: 'small', label: 'Small (< 1000 sq ft)', factor: 0.8 },
        { value: 'medium', label: 'Medium (1000-2000 sq ft)', factor: 1.0 },
        { value: 'large', label: 'Large (2000-3000 sq ft)', factor: 1.5 },
        { value: 'very-large', label: 'Very Large (> 3000 sq ft)', factor: 2.0 }
      ]
    },
    {
      id: 'energySource',
      title: 'Energy Source',
      icon: Zap,
      question: 'What is your primary energy source?',
      options: [
        { value: 'renewable', label: 'Renewable (Solar/Wind)', factor: 0.3 },
        { value: 'natural-gas', label: 'Natural Gas', factor: 1.0 },
        { value: 'electricity', label: 'Grid Electricity', factor: 1.2 },
        { value: 'coal', label: 'Coal/Oil', factor: 1.8 }
      ]
    },
    {
      id: 'transportation',
      title: 'Transportation',
      icon: Car,
      question: 'How do you primarily get around?',
      options: [
        { value: 'walk-bike', label: 'Walk/Bike/Public Transit', factor: 0.2 },
        { value: 'hybrid', label: 'Hybrid/Electric Car', factor: 0.5 },
        { value: 'efficient-car', label: 'Fuel-Efficient Car', factor: 1.0 },
        { value: 'suv-truck', label: 'SUV/Truck', factor: 1.8 }
      ]
    },
    {
      id: 'mileage',
      title: 'Annual Mileage',
      icon: Car,
      question: 'How many miles do you drive per year?',
      options: [
        { value: 'low', label: 'Less than 5,000 miles', factor: 0.5 },
        { value: 'medium', label: '5,000 - 15,000 miles', factor: 1.0 },
        { value: 'high', label: '15,000 - 25,000 miles', factor: 1.5 },
        { value: 'very-high', label: 'More than 25,000 miles', factor: 2.0 }
      ]
    },
    {
      id: 'diet',
      title: 'Diet',
      icon: Utensils,
      question: 'What best describes your diet?',
      options: [
        { value: 'vegan', label: 'Vegan', factor: 0.3 },
        { value: 'vegetarian', label: 'Vegetarian', factor: 0.5 },
        { value: 'pescatarian', label: 'Pescatarian', factor: 0.7 },
        { value: 'omnivore', label: 'Omnivore (meat regularly)', factor: 1.0 }
      ]
    },
    {
      id: 'consumption',
      title: 'Shopping Habits',
      icon: ShoppingBag,
      question: 'How would you describe your shopping habits?',
      options: [
        { value: 'minimal', label: 'Minimal - Buy only necessities', factor: 0.5 },
        { value: 'moderate', label: 'Moderate - Occasional purchases', factor: 1.0 },
        { value: 'frequent', label: 'Frequent - Regular shopping', factor: 1.5 },
        { value: 'heavy', label: 'Heavy - Love to shop', factor: 2.0 }
      ]
    },
    {
      id: 'waste',
      title: 'Waste Management',
      icon: Trash2,
      question: 'How do you handle waste?',
      options: [
        { value: 'excellent', label: 'Recycle everything, compost', factor: 0.3 },
        { value: 'good', label: 'Recycle most items', factor: 0.6 },
        { value: 'some', label: 'Recycle some items', factor: 1.0 },
        { value: 'minimal', label: 'Minimal recycling', factor: 1.5 }
      ]
    }
  ];

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
    
    toast({
      title: "Answer Recorded",
      description: `Selected: ${option.label}`,
      duration: 1500
    });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateFootprint();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateFootprint = () => {
    // Base emissions (average person)
    const baseEmissions = {
      energy: 3000,
      transport: 4000,
      food: 2000,
      waste: 500,
      buildings: 1000,
      consumption: 1500
    };

    // Apply factors based on answers
    const energy = baseEmissions.energy * 
      (answers.energySource?.factor || 1) * 
      (answers.homeSize?.factor || 1);

    const transport = baseEmissions.transport * 
      (answers.transportation?.factor || 1) * 
      (answers.mileage?.factor || 1);

    const food = baseEmissions.food * (answers.diet?.factor || 1);
    
    const consumption = baseEmissions.consumption * (answers.consumption?.factor || 1);
    
    const waste = baseEmissions.waste * (answers.waste?.factor || 1);
    
    const buildings = baseEmissions.buildings * (answers.homeSize?.factor || 1);

    const categories = {
      energy: Math.round(energy),
      transport: Math.round(transport),
      food: Math.round(food),
      waste: Math.round(waste),
      buildings: Math.round(buildings),
      consumption: Math.round(consumption)
    };

    const totalFootprint = Object.values(categories).reduce((sum, value) => sum + value, 0);

    onComplete({
      totalFootprint,
      categories,
      calculationType: 'quick'
    });
  };

  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion.icon;
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Quick Calculator</h2>
          <p className="text-sm text-gray-600">Step {currentStep + 1} of {questions.length}</p>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div 
          className="eco-gradient h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question Card */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="category-card rounded-xl p-8 space-y-6"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 eco-gradient rounded-full flex items-center justify-center mx-auto">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{currentQuestion.title}</h3>
          <p className="text-gray-600">{currentQuestion.question}</p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                answers[currentQuestion.id]?.value === option.value
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={nextStep}
          disabled={!answers[currentQuestion.id]}
          className="eco-button text-white"
        >
          {currentStep === questions.length - 1 ? 'Calculate' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default QuickCalculator;
