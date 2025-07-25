import React from 'react';
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
const Header = () => {
  return <header className="border-b border-gray-200 py-4 bg-gradient-to-r from-blue-50 to-white">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2">
          <img src="/hsmg.png" alt="Hillside Medical Group Logo" className="h-12 w-auto" />
        </div>
        <nav className="ml-auto">
          <ul className="flex gap-6 items-center">
            <li>
              <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                Book an Appointment
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-blue-700 hover:text-blue-900 font-medium">
                Services
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="text-blue-700 hover:text-blue-900 font-medium">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-700 hover:text-blue-900 font-medium">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-700 hover:text-blue-900 font-medium">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>;
};
export default Header;