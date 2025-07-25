import React from 'react';
import { Card } from '../components/Card';
import { Phone, Mail, MapPin } from 'lucide-react';
const Contact = () => {
  return <div className="py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
        Contact Us
      </h1>
      <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8"></div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card variant="outlined">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Get In Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-600">210-742-6555</p>
                  <p className="text-gray-600">210-858-9756</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600">
                    office@hillsidemedicalgroup.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    12881 I-35, Live Oak, TX 78233, United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card variant="outlined">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input type="text" className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input type="email" className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea className="border border-gray-300 rounded-md px-4 py-2 w-full h-32 focus:ring-1 focus:ring-blue-400 focus:border-blue-400" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </Card>
      </div>
      <Card variant="outlined">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Our Location</h2>
          <div className="border-2 border-dashed border-gray-300 h-64 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MapPin size={40} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Map Placeholder</p>
              <p className="text-gray-600 mt-2">
                12881 I-35, Live Oak, TX 78233
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>;
};
export default Contact;