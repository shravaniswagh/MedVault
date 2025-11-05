import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Stethoscope, User, ShieldCheck, Activity, Heart } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'doctor' | 'patient' | 'admin', action: 'signup' | 'login') => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl animate-pulse opacity-75"></div>
            <div className="relative">
              <Activity className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-4xl mb-4">MedRecords Platform</h1>
          <p className="text-gray-600 text-lg">
            Secure Medical History Retrieval System
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Select your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Doctor Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500">
            <CardHeader className="text-center pb-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Doctor</CardTitle>
              <CardDescription className="text-base">
                Access patient medical records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                <p>Search patient records via Aadhaar</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                <p>Emergency "Break Glass" access</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                <p>Generate downloadable reports</p>
              </div>
              <div className="space-y-2 mt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => onRoleSelect('doctor', 'signup')}
                >
                  Sign Up as Doctor
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => onRoleSelect('doctor', 'login')}
                >
                  Login as Doctor
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Patient Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-500">
            <CardHeader className="text-center pb-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Patient</CardTitle>
              <CardDescription className="text-base">
                View your medical records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                <p>Access your medical history</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                <p>View prescriptions and reports</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                <p>Download medical documents</p>
              </div>
              <div className="space-y-2 mt-4">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => onRoleSelect('patient', 'signup')}
                >
                  Sign Up as Patient
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => onRoleSelect('patient', 'login')}
                >
                  Login as Patient
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500">
            <CardHeader className="text-center pb-4">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Admin</CardTitle>
              <CardDescription className="text-base">
                Manage emergency access requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-3"></div>
                <p>Review access requests</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-3"></div>
                <p>Approve/reject doctor requests</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-3"></div>
                <p>Monitor audit logs</p>
              </div>
              <Button 
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => onRoleSelect('admin', 'login')}
              >
                Login as Admin
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-gray-900 mb-2">Security & Compliance Notice</h3>
              <p className="text-sm text-gray-600">
                This platform uses industry-standard encryption and follows HIPAA guidelines for protecting patient data. 
                All access is logged and monitored. This is a demonstration prototype using mock data for testing purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
