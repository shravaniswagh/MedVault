import React from 'react';
import { Button } from './ui/button';
import { Shield, Clock, Users, Database } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Instant Access to
              <span className="text-blue-600 block">Patient Medical History</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Securely retrieve comprehensive medical records from hospitals nationwide. 
              Make informed treatment decisions with complete patient history at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-3 border-gray-300"
              >
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Real-time Access</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1682706841478-88eb8995357b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwc3RldGhvc2NvcGV8ZW58MXx8fHwxNzU2Mzc5NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Medical professional with stethoscope"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Medical Record Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access patient history from multiple healthcare providers with our secure, 
              HIPAA-compliant platform designed for medical professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Multi-Hospital Integration
              </h3>
              <p className="text-gray-600">
                Access records from thousands of hospitals and clinics nationwide 
                through our secure integration network.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Identity Verification
              </h3>
              <p className="text-gray-600">
                Advanced biometric and credential verification ensures only 
                authorized medical professionals access patient data.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Better Patient Care
              </h3>
              <p className="text-gray-600">
                Make informed decisions with complete medical history, 
                improving treatment outcomes and patient safety.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div id="security" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Bank-Level Security for Medical Data
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform exceeds HIPAA requirements with military-grade encryption, 
                multi-factor authentication, and comprehensive audit trails.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">End-to-end encryption for all data transmission</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Biometric identity verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Complete access audit trails</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">HIPAA and SOC 2 compliant infrastructure</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVjb3JkcyUyMGhvc3BpdGFsfGVufDF8fHx8MTc1NjM3OTYyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Medical records and hospital equipment"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}