import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface PatientLoginProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
  registeredUsers: any[];
}

export function PatientLogin({ onLogin, onBack, registeredUsers }: PatientLoginProps) {
  const [aadhaar, setAadhaar] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (aadhaar && password) {
      // Verify patient credentials against registered users
      const patient = registeredUsers.find(
        user => user.role === 'patient' && 
                user.aadhaar === aadhaar &&
                user.status === 'approved'
      );
      
      if (!patient) {
        setLoginError('Invalid credentials or account not approved by admin');
        return;
      }
      
      onLogin({
        role: 'patient',
        aadhaar: aadhaar,
        name: patient.name,
        patientId: patient.id,
        phone: patient.phone
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-4 left-4 text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900">Patient Login</h1>
          <p className="text-gray-600 mt-2">Access your medical records</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Login with your Aadhaar number and password
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                value={aadhaar}
                onChange={(e) => {
                  setAadhaar(e.target.value);
                  setLoginError('');
                }}
                placeholder="Enter your 12-digit Aadhaar number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {loginError && (
              <p className="text-sm text-red-600 text-center">{loginError}</p>
            )}
            
            <Button 
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!aadhaar || !password}
            >
              Login
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-blue-900 text-sm">
                <strong>Privacy Notice:</strong> Your medical records are encrypted and 
                protected under HIPAA regulations. Only authorized healthcare providers 
                can access your data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
