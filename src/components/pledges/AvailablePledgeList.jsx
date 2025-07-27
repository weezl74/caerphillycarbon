import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { difficultyColors } from '@/components/pledges/pledgeData';
import { Link } from 'lucide-react';

const AvailablePledgeList = ({ pledges, onPledge }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pledges.map((pledge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="category-card rounded-xl p-6 flex flex-col justify-between space-y-4 group"
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
          
          <div className="flex flex-col space-y-2">
            {pledge.link && (
              <a 
                href={pledge.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-blue-600 hover:underline text-center flex items-center justify-center space-x-1"
              >
                <Link className="w-3 h-3"/>
                <span>Learn how</span>
              </a>
            )}
            <Button className="w-full eco-button text-white group-hover:shadow-md" onClick={() => onPledge(pledge)}>
              Make This Pledge
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AvailablePledgeList;