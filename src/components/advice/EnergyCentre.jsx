import React from 'react';
import { motion } from 'framer-motion';
import { Zap, User, Briefcase, Wind, SunDim as SolarPanel, Battery, Thermometer, Users, Leaf, Clock } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { energyData } from '@/components/advice/energyData';
import AdviceSection from '@/components/advice/AdviceSection';

const EnergyCentre = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Energy Hub</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore actions and educational resources to transition to cleaner energy, whether you're a resident or a business.
        </p>
      </motion.div>

      <Tabs.Root defaultValue="resident" className="w-full">
        <Tabs.List className="flex space-x-1 border-b border-gray-200 justify-center mb-8">
          <Tabs.Trigger value="resident" className="px-6 py-3 text-lg font-medium text-gray-600 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 outline-none flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>For Residents</span>
          </Tabs.Trigger>
          <Tabs.Trigger value="business" className="px-6 py-3 text-lg font-medium text-gray-600 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 outline-none flex items-center space-x-2">
            <Briefcase className="w-5 h-5" />
            <span>For Businesses</span>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="resident">
          <motion.div
            key="resident"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdviceSection 
              title="Energy Actions for Residents"
              icon={User}
              color="from-cyan-500 to-blue-500"
              tips={energyData.residentActions}
            />
          </motion.div>
        </Tabs.Content>

        <Tabs.Content value="business">
          <motion.div
            key="business"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdviceSection 
              title="Energy Actions for Businesses"
              icon={Briefcase}
              color="from-slate-500 to-gray-600"
              tips={energyData.businessActions}
            />
          </motion.div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default EnergyCentre;