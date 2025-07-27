import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Sun, Snowflake, Home, Zap, CheckCircle, Link as LinkIcon, Briefcase } from 'lucide-react';
import { adviceData } from '@/components/advice/adviceData';
import AdviceSection from '@/components/advice/AdviceSection';
import * as Tabs from '@radix-ui/react-tabs';
import { RefreshCw, Recycle, Wrench, Package, Repeat } from 'lucide-react';

const reduceCategories = [
  { value: 'Reduce', icon: RefreshCw },
  { value: 'Reuse', icon: Repeat },
  { value: 'Repair', icon: Wrench },
  { value: 'Repurpose', icon: Package },
  { value: 'Recycle', icon: Recycle },
];

const AdviceCentre = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Eco Advice Centre</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover realistic, non-judgemental, and achievable tips to reduce your energy use and save money. Every small action adds up!
        </p>
      </motion.div>

      <AdviceSection 
        title="Quick Wins" 
        icon={Home} 
        color="from-blue-500 to-indigo-600"
        tips={adviceData.quickWins}
        delay={0.2}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AdviceSection 
          title="Seasonal Energy Tips" 
          icon={Sun} 
          color="from-amber-500 to-orange-600"
          tips={adviceData.seasonal.summer}
          subtitle="Summer Tips"
          subtitleIcon={Sun}
          delay={0}
        />
        <div className="mt-8">
            <AdviceSection 
                icon={Snowflake} 
                color="from-sky-400 to-cyan-500"
                tips={adviceData.seasonal.winter}
                subtitle="Winter Tips"
                subtitleIcon={Snowflake}
                delay={0}
            />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="category-card rounded-xl p-6"
      >
        <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center`}>
                <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Waste Reduction Habits</h3>
        </div>
        <Tabs.Root defaultValue="Reduce" className="w-full">
            <Tabs.List className="flex space-x-1 border-b border-gray-200">
                {reduceCategories.map(({ value, icon: Icon }) => (
                    <Tabs.Trigger key={value} value={value} className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 outline-none flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{value}</span>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
            {reduceCategories.map(({value}) => (
                <Tabs.Content key={value} value={value} className="pt-6">
                    <AdviceSection tips={adviceData.habits.filter(tip => tip.category === value)} delay={0} />
                </Tabs.Content>
            ))}
        </Tabs.Root>
      </motion.div>
      
      <AdviceSection 
        title="For Businesses" 
        icon={Briefcase} 
        color="from-gray-500 to-gray-700"
        tips={adviceData.forBusiness}
        delay={0.5}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="category-card rounded-xl p-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Supporting Your Journey</h3>
            <p className="text-gray-600 mb-4">
              We're here to help you succeed. The app offers personalized tips, goal tracking, and seasonal prompts to keep you motivated.
            </p>
            <button className="eco-button text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center space-x-2">
              <LinkIcon className="w-4 h-4" />
              <span>Find Local Support</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdviceCentre;