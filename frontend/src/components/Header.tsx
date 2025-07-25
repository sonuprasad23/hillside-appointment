// src/components/Header.tsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/services", text: "Services" },
    { to: "/doctors", text: "Doctors" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  return (
    <header className="border-b border-gray-200 py-4 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
          <img src="/hsmg.png" alt="Hillside Medical Group Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              {link.text}
            </NavLink>
          ))}
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm transition-all duration-200">
            Book an Appointment
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Slide-in) */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg text-blue-700">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md text-base font-semibold shadow-sm text-center">
                Book an Appointment
            </Link>
            {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `px-5 py-3 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                {link.text}
                </NavLink>
            ))}
        </nav>
      </div>
      
      {/* Overlay for when mobile menu is open */}
      {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden" />}
    </header>
  );
};

export default Header;