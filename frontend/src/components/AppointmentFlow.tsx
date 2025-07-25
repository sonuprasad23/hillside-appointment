import React, { useEffect, useState } from 'react';
import ClinicSelector from './ClinicSelector';
import AppointmentForm from './AppointmentForm';
import AppointmentConfirmation from './AppointmentConfirmation';
import { UserIcon } from 'lucide-react';
type Step = 'clinic' | 'form' | 'confirmation';
type Clinic = 'universal' | 'womens' | 'psychiatry' | null;
const AppointmentFlow = () => {
  const [step, setStep] = useState<Step>('clinic');
  const [selectedClinic, setSelectedClinic] = useState<Clinic>(null);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
    location: '',
    doctor: '',
    date: '',
    time: ''
  });
  const [showIcon, setShowIcon] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const handleClinicSelect = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setStep('form');
  };
  const handleFormSubmit = (data: typeof formData) => {
    setFormData(data);
    setStep('confirmation');
  };
  const resetFlow = () => {
    setStep('clinic');
    setSelectedClinic(null);
    setFormData({
      name: '',
      dob: '',
      phone: '',
      email: '',
      location: '',
      doctor: '',
      date: '',
      time: ''
    });
  };
  return <div className="py-8">
      <div className="relative mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 inline-flex items-center justify-center">
          <span className={`transition-opacity duration-1000 ${showIcon ? 'opacity-100' : 'opacity-0'} absolute -left-12`}>
            <span role="img" aria-label="Doctor" className="text-2xl">
              👨‍⚕️
            </span>
          </span>
          Your Appointment, Simplified
          <span className={`transition-opacity duration-1000 ${!showIcon ? 'opacity-100' : 'opacity-0'} absolute -right-12`}>
            <span role="img" aria-label="Nurse" className="text-2xl">
              👩‍⚕️
            </span>
          </span>
        </h1>
        <div className="h-1 w-48 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
      </div>
      {step === 'clinic' && <ClinicSelector onSelect={handleClinicSelect} />}
      {step === 'form' && <AppointmentForm clinic={selectedClinic} initialData={formData} onSubmit={handleFormSubmit} onBack={() => setStep('clinic')} />}
      {step === 'confirmation' && <AppointmentConfirmation clinic={selectedClinic} formData={formData} onReset={resetFlow} />}
    </div>;
};
export default AppointmentFlow;