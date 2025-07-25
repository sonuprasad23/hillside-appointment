import React from 'react';
import { Card } from './Card';
import { Stethoscope, Heart, Brain } from 'lucide-react';
type ClinicType = 'universal' | 'womens' | 'psychiatry' | null;
interface ClinicSelectorProps {
  onSelect: (clinic: ClinicType) => void;
}
const ClinicSelector = ({
  onSelect
}: ClinicSelectorProps) => {
  return <div className="space-y-6">
      <p className="text-center text-gray-600 mb-8">
        Please select the type of clinic for your appointment:
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <Card variant="outlined" isClickable className="transition-transform hover:-translate-y-1 border-2 border-blue-100" onClick={() => onSelect('universal')}>
          <div className="flex flex-col items-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center mb-4">
              <Stethoscope size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Universal Section Clinics
            </h3>
            <p className="text-gray-500 mt-2">
              General medical services for all patients
            </p>
          </div>
        </Card>
        <Card variant="outlined" isClickable className="transition-transform hover:-translate-y-1 border-2 border-blue-100" onClick={() => onSelect('womens')}>
          <div className="flex flex-col items-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center mb-4">
              <Heart size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Women's Wellness of SA
            </h3>
            <p className="text-gray-500 mt-2">
              Specialized care for women's health
            </p>
          </div>
        </Card>
        <Card variant="outlined" isClickable className="transition-transform hover:-translate-y-1 border-2 border-blue-100" onClick={() => onSelect('psychiatry')}>
          <div className="flex flex-col items-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center mb-4">
              <Brain size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Psychiatry of SA
            </h3>
            <p className="text-gray-500 mt-2">
              Mental health services and support
            </p>
          </div>
        </Card>
      </div>
    </div>;
};
export default ClinicSelector;