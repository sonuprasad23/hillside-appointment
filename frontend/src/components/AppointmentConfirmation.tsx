// src/components/AppointmentConfirmation.tsx
import React from 'react';
import { Button } from './Button';
import { Calendar, Download } from 'lucide-react';
import QRCode from './QRCode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AppointmentConfirmationProps {
  clinic: 'universal' | 'womens' | 'psychiatry' | null;
  formData: {
    name: string;
    dob: string;
    phone: string;
    email: string;
    location: string;
    doctor: string;
    date: string;
    time: string;
  };
  onReset: () => void;
}

const AppointmentConfirmation = ({ clinic, formData, onReset }: AppointmentConfirmationProps) => {
  const clinicNames = {
    universal: 'Universal Section Clinics',
    womens: "Women's Wellness of SA",
    psychiatry: 'Psychiatry of SA',
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    // Adjust for timezone to display the correct date selected by the user
    const date = new Date(dateString);
    const userTimezoneDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return userTimezoneDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formattedDate = formatDate(formData.date);
  const fullDateTime = `${formattedDate} at ${formData.time}`;

  const appointmentDetailsForQR = `BEGIN:VEVENT\nSUMMARY:Medical Appointment with ${formData.doctor}\nLOCATION:${formData.location}\nDESCRIPTION:Appointment for ${formData.name} at ${clinicNames[clinic || 'universal']}.\nDTSTART:${formData.date.replace(/-/g, '')}T${formData.time.split(' ')[0].replace(':', '')}00Z\nEND:VEVENT`;
  
  const handleDownloadPdf = () => {
    // Target the specific div that contains the visual card
    const input = document.getElementById('appointment-card-for-pdf');
    if (input) {
      html2canvas(input, {
        scale: 2, // Use a higher scale for a crisper, higher-resolution image
        useCORS: true, // This is important if your logo is hosted on another domain
      }).then((canvas) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // **THE FIX IS HERE:**
        // We create a PDF with the exact dimensions of our captured canvas image.
        // We use 'px' as units for a direct 1-to-1 mapping.
        const pdf = new jsPDF({
          orientation: canvasWidth > canvasHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [canvasWidth, canvasHeight],
        });

        // Add the captured image to the PDF, filling the entire custom page
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvasWidth, canvasHeight);
        
        // Save the perfectly formatted PDF
        pdf.save(`Hillside-Medical-Appointment-${formData.name.replace(/\s/g, '-')}.pdf`);
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* --- Top Section --- */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-blue-500 mb-4 bg-blue-50">
          <Calendar size={32} className="text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-blue-700">Appointment Confirmed</h2>
        <p className="text-gray-600 mt-2">Your appointment has been successfully scheduled.</p>
      </div>

      {/* --- Main Content Area --- */}
      <div className="w-full max-w-lg flex flex-col items-center gap-6">
        
        {/* This is the visual card that will be captured for the PDF. */}
        {/* The QR code and button are outside this div and will not be in the PDF. */}
        <div id="appointment-card-for-pdf" className="w-full bg-white rounded-lg shadow-lg border border-gray-200 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-no-repeat bg-center opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(/hsmg.png)`, backgroundSize: '250px' }}></div>
          <div className="relative z-10 flex flex-col text-center">
            <img src="/hsmg.png" alt="Hillside Medical Group Logo" className="h-14 mx-auto mb-2"/>
            <h3 className="font-semibold text-xl text-gray-800">
                {clinicNames[clinic || 'universal']}
            </h3>
            <hr className="my-4 border-gray-200"/>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-left text-sm">
                <div>
                    <p className="text-gray-500">Patient</p>
                    <p className="font-semibold text-gray-900 text-base">{formData.name}</p>
                </div>
                <div>
                    <p className="text-gray-500">Doctor</p>
                    <p className="font-semibold text-gray-900 text-base">{formData.doctor}</p>
                </div>
                <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-semibold text-gray-900 text-base">{fullDateTime}</p>
                </div>
                <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900 text-base">{formData.location}</p>
                </div>
            </div>
          </div>
        </div>
        
        {/* QR Code and Actions */}
        <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-md bg-white shadow-md border">
                <QRCode value={appointmentDetailsForQR} size={128}/>
            </div>
            <p className="text-sm text-gray-600">Scan to add to calendar</p>
        </div>

        <Button
            leftIcon={<Download size={18} />}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs"
            onClick={handleDownloadPdf}
        >
            Download Appointment
        </Button>
      </div>

      {/* --- Bottom Link --- */}
      <div className="border-t border-gray-200 mt-12 pt-6 w-full text-center">
        <button onClick={onReset} className="text-blue-600 hover:text-blue-800 font-medium">
          Schedule Another Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;