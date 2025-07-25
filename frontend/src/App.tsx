import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AppointmentFlow from './components/AppointmentFlow';
import ComingSoon from './components/ComingSoon';
import About from './pages/About';
import Contact from './pages/Contact';
export function App() {
  return <Router>
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <Routes>
            <Route path="/" element={<AppointmentFlow />} />
            <Route path="/services" element={<ComingSoon title="Services" />} />
            <Route path="/doctors" element={<ComingSoon title="Doctors" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-200 py-6 bg-blue-50">
          <div className="container mx-auto px-4 text-center text-blue-700 text-sm">
            © {new Date().getFullYear()} Hillside Medical Group. All rights
            reserved.
          </div>
        </footer>
      </div>
    </Router>;
}