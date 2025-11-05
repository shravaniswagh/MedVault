import React from 'react';
import { Button } from './ui/button';
import { Shield, FileText } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MedRecords</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#security" className="text-gray-600 hover:text-gray-900 transition-colors">
              Security
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>HIPAA Compliant</span>
            </div>
            <Button onClick={onLoginClick} className="bg-blue-600 hover:bg-blue-700">
              Doctor Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}