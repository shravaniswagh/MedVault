import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MedRecords</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Secure, HIPAA-compliant medical record retrieval platform trusted by 
              healthcare professionals nationwide.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <span>SOC 2 Certified</span>
              <span>•</span>
              <span>HIPAA Compliant</span>
              <span>•</span>
              <span>256-bit Encryption</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-MEDRECORDS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@medrecords.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Boston, MA 02101</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MedRecords. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">HIPAA Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}