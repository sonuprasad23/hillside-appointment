import React, { useState, useEffect } from 'react';
import { User, Calendar, Phone, Mail, MapPin, UserCircle, Clock } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { universalClinics, womensWellnessLocations, psychiatryLocations } from '../data/clinicData';

interface AppointmentFormProps {
  clinic: 'universal' | 'womens' | 'psychiatry' | null;
  initialData: {
    name: string;
    dob: string;
    phone: string;
    email: string;
    location: string;
    doctor: string;
    date: string;
    time: string;
  };
  onSubmit: (data: any) => void;
  onBack: () => void;
}

interface Location {
  name: string;
  address: string;
  doctors: string[];
}

const AppointmentForm = ({ clinic, initialData, onSubmit, onBack }: AppointmentFormProps) => {
  const [formData, setFormData] = useState(initialData);
  const [step, setStep] = useState(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [doctors, setDoctors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clinicNames = {
    universal: 'Universal Section Clinics',
    womens: "Women's Wellness of SA",
    psychiatry: 'Psychiatry of SA',
  };

  useEffect(() => {
    let currentLocations: Location[] = [];
    if (clinic === 'universal') {
      currentLocations = universalClinics;
    } else if (clinic === 'womens') {
      currentLocations = womensWellnessLocations;
    } else if (clinic === 'psychiatry') {
      currentLocations = psychiatryLocations;
    }
    setLocations(currentLocations);
    setFormData(prev => ({ ...prev, location: '', doctor: '' }));
    setDoctors([]);
  }, [clinic]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'location') {
      const selectedLocation = locations.find(loc => loc.address === value);
      setDoctors(selectedLocation ? selectedLocation.doctors : []);
      setFormData(prev => ({ ...prev, doctor: '' }));
    }
  };
  
  const handleNextStep = () => {
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const fullLocationData = locations.find(loc => loc.address === formData.location);

    const submissionData = {
      ...formData,
      clinic: clinic, // Add clinic type to the submission
      location: `${fullLocationData?.name} - ${fullLocationData?.address}`,
    };
    
    try {
      // Use the environment variable for the live API URL, with a fallback for local development
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/appointments';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to schedule appointment. Please try again.');
      }

      // If successful, proceed to the confirmation screen
      onSubmit(submissionData);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center text-blue-600 mb-6 hover:text-blue-800">
        ← Back to clinic selection
      </button>
      <Card variant="outlined" className="mb-6 border-2 border-blue-100">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            {clinicNames[clinic || 'universal']}
          </h2>
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Clinic Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin size={18} className="text-blue-500" />
                    </div>
                    <select name="location" value={formData.location} onChange={handleChange} className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" required>
                      <option value="">Select a location</option>
                      {locations.map(loc => (
                        <option key={loc.address} value={loc.address}>
                          {loc.name} - {loc.address}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-blue-500" />
                    </div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" placeholder="Enter your full name" required />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar size={18} className="text-blue-500" />
                    </div>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone size={18} className="text-blue-500" />
                      </div>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" placeholder="(123) 456-7890" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail size={18} className="text-blue-500" />
                      </div>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" placeholder="your@email.com" required />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button type="button" onClick={handleNextStep} disabled={!formData.name || !formData.dob || !formData.phone || !formData.email || !formData.location} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Next Step
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Select Doctor</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UserCircle size={18} className="text-blue-500" />
                    </div>
                    <select name="doctor" value={formData.doctor} onChange={handleChange} className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" required>
                      <option value="">Select a doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Appointment Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar size={18} className="text-blue-500" />
                      </div>
                      <input type="date" name="date" value={formData.date} onChange={handleChange} className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Appointment Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock size={18} className="text-blue-500" />
                      </div>
                      <select name="time" value={formData.time} onChange={handleChange} className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" required>
                        <option value="">Select a time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                <div className="flex items-center justify-between mt-8">
                  <button type="button" onClick={() => setStep(1)} className="text-blue-600 hover:text-blue-800" disabled={isSubmitting}>
                    ← Back
                  </button>
                  <Button type="submit" disabled={!formData.doctor || !formData.date || !formData.time || isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
};
export default AppointmentForm;