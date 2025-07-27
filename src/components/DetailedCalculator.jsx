
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, Car, Utensils, Trash2, Building, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DetailedCalculator = ({ onComplete, onBack, currentData }) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [formData, setFormData] = useState({
    energy: {
      electricityKwh: '',
      naturalGasTherm: '',
      heatingOil: '',
      propane: '',
      renewablePercent: ''
    },
    transport: {
      carMiles: '',
      carMpg: '',
      publicTransitMiles: '',
      flightHours: '',
      motorcycleMiles: ''
    },
    food: {
      meatMealsPerWeek: '',
      dairyServingsPerDay: '',
      localFoodPercent: '',
      organicPercent: '',
      foodWastePercent: ''
    },
    waste: {
      recyclingPercent: '',
      compostPercent: '',
      wastePerWeek: '',
      electronicWaste: ''
    },
    buildings: {
      homeSize: '',
      homeAge: '',
      insulationQuality: '',
      windowType: '',
      heatingSystem: ''
    },
    consumption: {
      clothingPurchases: '',
      electronicsPurchases: '',
      furniturePurchases: '',
      secondhandPercent: ''
    }
  });

  const { toast } = useToast();

  const categories = [
    {
      id: 'energy',
      title: 'Energy & Utilities',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      fields: [
        { key: 'electricityKwh', label: 'Monthly Electricity Usage (kWh)', type: 'number', placeholder: 'e.g., 800' },
        { key: 'naturalGasTherm', label: 'Monthly Natural Gas (Therms)', type: 'number', placeholder: 'e.g., 50' },
        { key: 'heatingOil', label: 'Annual Heating Oil (Gallons)', type: 'number', placeholder: 'e.g., 200' },
        { key: 'propane', label: 'Annual Propane (Gallons)', type: 'number', placeholder: 'e.g., 100' },
        { key: 'renewablePercent', label: 'Renewable Energy %', type: 'number', placeholder: 'e.g., 25' }
      ]
    },
    {
      id: 'transport',
      title: 'Transportation',
      icon: Car,
      color: 'from-blue-400 to-indigo-500',
      fields: [
        { key: 'carMiles', label: 'Annual Car Miles', type: 'number', placeholder: 'e.g., 12000' },
        { key: 'carMpg', label: 'Car Fuel Efficiency (MPG)', type: 'number', placeholder: 'e.g., 25' },
        { key: 'publicTransitMiles', label: 'Annual Public Transit Miles', type: 'number', placeholder: 'e.g., 2000' },
        { key: 'flightHours', label: 'Annual Flight Hours', type: 'number', placeholder: 'e.g., 10' },
        { key: 'motorcycleMiles', label: 'Annual Motorcycle Miles', type: 'number', placeholder: 'e.g., 1000' }
      ]
    },
    {
      id: 'food',
      title: 'Food & Diet',
      icon: Utensils,
      color: 'from-green-400 to-emerald-500',
      fields: [
        { key: 'meatMealsPerWeek', label: 'Meat Meals per Week', type: 'number', placeholder: 'e.g., 10' },
        { key: 'dairyServingsPerDay', label: 'Dairy Servings per Day', type: 'number', placeholder: 'e.g., 3' },
        { key: 'localFoodPercent', label: 'Local Food %', type: 'number', placeholder: 'e.g., 30' },
        { key: 'organicPercent', label: 'Organic Food %', type: 'number', placeholder: 'e.g., 20' },
        { key: 'foodWastePercent', label: 'Food Waste %', type: 'number', placeholder: 'e.g., 15' }
      ]
    },
    {
      id: 'waste',
      title: 'Waste Management',
      icon: Trash2,
      color: 'from-gray-400 to-slate-500',
      fields: [
        { key: 'recyclingPercent', label: 'Recycling %', type: 'number', placeholder: 'e.g., 70' },
        { key: 'compostPercent', label: 'Composting %', type: 'number', placeholder: 'e.g., 40' },
        { key: 'wastePerWeek', label: 'Waste per Week (lbs)', type: 'number', placeholder: 'e.g., 20' },
        { key: 'electronicWaste', label: 'Electronic Waste per Year (lbs)', type: 'number', placeholder: 'e.g., 10' }
      ]
    },
    {
      id: 'buildings',
      title: 'Buildings & Housing',
      icon: Building,
      color: 'from-purple-400 to-violet-500',
      fields: [
        { key: 'homeSize', label: 'Home Size (sq ft)', type: 'number', placeholder: 'e.g., 1500' },
        { key: 'homeAge', label: 'Home Age (years)', type: 'number', placeholder: 'e.g., 20' },
        { key: 'insulationQuality', label: 'Insulation Quality (1-10)', type: 'number', placeholder: 'e.g., 7' },
        { key: 'windowType', label: 'Window Efficiency (1-10)', type: 'number', placeholder: 'e.g., 6' },
        { key: 'heatingSystem', label: 'Heating System Efficiency (1-10)', type: 'number', placeholder: 'e.g., 8' }
      ]
    },
    {
      id: 'consumption',
      title: 'Consumption & Purchases',
      icon: ShoppingBag,
      color: 'from-pink-400 to-rose-500',
      fields: [
        { key: 'clothingPurchases', label: 'Clothing Items per Year', type: 'number', placeholder: 'e.g., 20' },
        { key: 'electronicsPurchases', label: 'Electronics per Year', type: 'number', placeholder: 'e.g., 2' },
        { key: 'furniturePurchases', label: 'Furniture Items per Year', type: 'number', placeholder: 'e.g., 3' },
        { key: 'secondhandPercent', label: 'Second-hand Purchases %', type: 'number', placeholder: 'e.g., 30' }
      ]
    }
  ];

  const handleInputChange = (categoryId, fieldKey, value) => {
    setFormData(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [fieldKey]: value
      }
    }));
  };

  const nextCategory = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      calculateDetailedFootprint();
    }
  };

  const prevCategory = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  const calculateDetailedFootprint = () => {
    // Detailed calculation factors
    const calculations = {
      energy: calculateEnergyFootprint(),
      transport: calculateTransportFootprint(),
      food: calculateFoodFootprint(),
      waste: calculateWasteFootprint(),
      buildings: calculateBuildingsFootprint(),
      consumption: calculateConsumptionFootprint()
    };

    const totalFootprint = Object.values(calculations).reduce((sum, value) => sum + value, 0);

    toast({
      title: "Detailed Calculation Complete! 🎯",
      description: "Your precise carbon footprint has been calculated",
      duration: 5000
    });

    onComplete({
      totalFootprint: Math.round(totalFootprint),
      categories: calculations,
      calculationType: 'detailed'
    });
  };

  const calculateEnergyFootprint = () => {
    const data = formData.energy;
    const electricityFactor = 0.92; // kg CO2 per kWh
    const gasFactor = 11.7; // kg CO2 per therm
    const oilFactor = 10.15; // kg CO2 per gallon
    const propaneFactor = 5.6; // kg CO2 per gallon

    const electricity = (parseFloat(data.electricityKwh) || 0) * 12 * electricityFactor;
    const gas = (parseFloat(data.naturalGasTherm) || 0) * 12 * gasFactor;
    const oil = (parseFloat(data.heatingOil) || 0) * oilFactor;
    const propane = (parseFloat(data.propane) || 0) * propaneFactor;
    
    const total = electricity + gas + oil + propane;
    const renewableReduction = (parseFloat(data.renewablePercent) || 0) / 100;
    
    return Math.round(total * (1 - renewableReduction));
  };

  const calculateTransportFootprint = () => {
    const data = formData.transport;
    const carFactor = 8.89; // kg CO2 per gallon
    const transitFactor = 0.33; // kg CO2 per mile
    const flightFactor = 90; // kg CO2 per hour
    const motorcycleFactor = 0.3; // kg CO2 per mile

    const carMiles = parseFloat(data.carMiles) || 0;
    const carMpg = parseFloat(data.carMpg) || 25;
    const carEmissions = (carMiles / carMpg) * carFactor;
    
    const transitEmissions = (parseFloat(data.publicTransitMiles) || 0) * transitFactor;
    const flightEmissions = (parseFloat(data.flightHours) || 0) * flightFactor;
    const motorcycleEmissions = (parseFloat(data.motorcycleMiles) || 0) * motorcycleFactor;

    return Math.round(carEmissions + transitEmissions + flightEmissions + motorcycleEmissions);
  };

  const calculateFoodFootprint = () => {
    const data = formData.food;
    const meatFactor = 6.61; // kg CO2 per meal
    const dairyFactor = 1.9; // kg CO2 per serving
    
    const meatEmissions = (parseFloat(data.meatMealsPerWeek) || 0) * 52 * meatFactor;
    const dairyEmissions = (parseFloat(data.dairyServingsPerDay) || 0) * 365 * dairyFactor;
    
    const localReduction = (parseFloat(data.localFoodPercent) || 0) / 100 * 0.1;
    const organicReduction = (parseFloat(data.organicPercent) || 0) / 100 * 0.05;
    const wasteIncrease = (parseFloat(data.foodWastePercent) || 0) / 100 * 0.3;
    
    const total = meatEmissions + dairyEmissions;
    return Math.round(total * (1 - localReduction - organicReduction + wasteIncrease));
  };

  const calculateWasteFootprint = () => {
    const data = formData.waste;
    const wasteFactor = 0.57; // kg CO2 per lb
    const electronicFactor = 4.0; // kg CO2 per lb
    
    const wastePerYear = (parseFloat(data.wastePerWeek) || 0) * 52;
    const recyclingReduction = (parseFloat(data.recyclingPercent) || 0) / 100 * 0.5;
    const compostReduction = (parseFloat(data.compostPercent) || 0) / 100 * 0.3;
    
    const wasteEmissions = wastePerYear * wasteFactor * (1 - recyclingReduction - compostReduction);
    const electronicEmissions = (parseFloat(data.electronicWaste) || 0) * electronicFactor;
    
    return Math.round(wasteEmissions + electronicEmissions);
  };

  const calculateBuildingsFootprint = () => {
    const data = formData.buildings;
    const sizeFactor = 0.05; // kg CO2 per sq ft
    const ageFactor = 1 + ((parseFloat(data.homeAge) || 0) / 100);
    const insulationFactor = 1 - ((parseFloat(data.insulationQuality) || 5) / 10 * 0.3);
    const windowFactor = 1 - ((parseFloat(data.windowType) || 5) / 10 * 0.2);
    const heatingFactor = 1 - ((parseFloat(data.heatingSystem) || 5) / 10 * 0.25);
    
    const baseEmissions = (parseFloat(data.homeSize) || 0) * sizeFactor * 365;
    return Math.round(baseEmissions * ageFactor * insulationFactor * windowFactor * heatingFactor);
  };

  const calculateConsumptionFootprint = () => {
    const data = formData.consumption;
    const clothingFactor = 8.1; // kg CO2 per item
    const electronicsFactor = 300; // kg CO2 per item
    const furnitureFactor = 85; // kg CO2 per item
    
    const clothingEmissions = (parseFloat(data.clothingPurchases) || 0) * clothingFactor;
    const electronicsEmissions = (parseFloat(data.electronicsPurchases) || 0) * electronicsFactor;
    const furnitureEmissions = (parseFloat(data.furniturePurchases) || 0) * furnitureFactor;
    
    const secondhandReduction = (parseFloat(data.secondhandPercent) || 0) / 100 * 0.7;
    const total = clothingEmissions + electronicsEmissions + furnitureEmissions;
    
    return Math.round(total * (1 - secondhandReduction));
  };

  const currentCategoryData = categories[currentCategory];
  const Icon = currentCategoryData.icon;
  const progress = ((currentCategory + 1) / categories.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Detailed Calculator</h2>
          <p className="text-sm text-gray-600">Category {currentCategory + 1} of {categories.length}</p>
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

      {/* Category Form */}
      <motion.div
        key={currentCategory}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="category-card rounded-xl p-8 space-y-6"
      >
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${currentCategoryData.color} rounded-full flex items-center justify-center mx-auto`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{currentCategoryData.title}</h3>
          <p className="text-gray-600">Please provide specific data for accurate calculations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentCategoryData.fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formData[currentCategoryData.id][field.key]}
                onChange={(e) => handleInputChange(currentCategoryData.id, field.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevCategory}
          disabled={currentCategory === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={nextCategory}
          className="eco-button text-white"
        >
          {currentCategory === categories.length - 1 ? 'Calculate' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DetailedCalculator;
