import React from 'react';
import { Card } from './Card';
import { Clock, AlertCircle } from 'lucide-react';
interface ComingSoonProps {
  title: string;
}
const ComingSoon = ({
  title
}: ComingSoonProps) => {
  return <div className="py-12 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">{title}</h1>
      <Card variant="outlined" className="max-w-lg mx-auto">
        <div className="p-12 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center mb-6 animate-pulse">
            <Clock size={40} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're working hard to bring you amazing {title.toLowerCase()}.
            Please check back soon!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3 text-left">
            <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              We're constantly updating our website. If you need immediate
              assistance or information about our {title.toLowerCase()}, please
              contact us directly.
            </p>
          </div>
        </div>
      </Card>
    </div>;
};
export default ComingSoon;