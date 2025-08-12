import React from 'react';
import { Shield, Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/WiVison_Secondary_Logo.png" 
                alt="WiVision" 
                className="h-12 w-auto mr-4"
              />
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-md">
              South Africa's premier WithSecure™ distributor, delivering enterprise-grade cybersecurity solutions with local expertise and global standards.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/wivision/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-slate-800 hover:bg-teal-600 transition-all duration-300 rounded-lg px-4 py-3 flex items-center space-x-3 group transform hover:scale-105"
              >
                <Linkedin className="h-6 w-6 text-white group-hover:text-white" />
                <span className="text-white font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#home" className="text-slate-300 hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-300 hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-teal-400 transition-colors">Services</a></li>
              <li><a href="#solutions" className="text-slate-300 hover:text-teal-400 transition-colors">Solutions</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-teal-400 mr-3" />
                <span className="text-slate-300">+27210653808</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-teal-400 mr-3" />
                <span className="text-slate-300">info@wivision.co.za</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 WiVision. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            <div className="flex items-center text-slate-400 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              <span>Authorized WithSecure™ Distributor</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;