import React from 'react';
import { motion } from 'framer-motion';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown, Check, Link } from 'lucide-react';

const AdviceSection = ({ title, icon: Icon, color, tips, subtitle, subtitleIcon: SubtitleIcon, delay = 0 }) => {
  const [open, setOpen] = React.useState(true);
  
  if (!tips || tips.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`category-card rounded-xl p-6 ${!title && !subtitle ? 'pt-0' : ''}`}
    >
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        {(title || subtitle) && (
          <Collapsible.Trigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-4">
                {Icon && (
                  <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  {title && <h3 className="text-2xl font-bold text-gray-900">{title}</h3>}
                  {subtitle && (
                    <div className="flex items-center space-x-2">
                      {SubtitleIcon && <SubtitleIcon className="w-5 h-5 text-gray-600" />}
                      <h4 className="text-xl font-semibold text-gray-700">{subtitle}</h4>
                    </div>
                  )}
                </div>
              </div>
              <ChevronDown className={`w-6 h-6 text-gray-600 transition-transform ${open ? 'rotate-180' : ''}`} />
            </div>
          </Collapsible.Trigger>
        )}

        <Collapsible.Content>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${(title || subtitle) ? 'mt-6' : ''}`}>
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-start space-x-4 p-4 bg-green-50/50 rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{tip.title}</p>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                   {tip.link && (
                    <a href={tip.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 inline-flex items-center space-x-1">
                      <Link className="w-3 h-3"/>
                      <span>Learn more</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </motion.div>
  );
};

export default AdviceSection;