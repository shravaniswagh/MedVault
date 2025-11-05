import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Shield, Fingerprint, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
  onCancel: () => void;
}

export function LoginForm({ onLogin, onCancel }: LoginFormProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    medicalId: '',
    password: '',
    hospitalId: '',
    biometricVerified: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onLogin();
    }
  };

  const simulateBiometric = () => {
    setFormData(prev => ({ ...prev, biometricVerified: true }));
    setTimeout(() => {
      handleNextStep();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="absolute top-4 left-4 text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Secure Doctor Login</h1>
          <p className="text-gray-600 mt-2">Step {step} of 3 - Identity Verification</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle>
              {step === 1 && "Medical Credentials"}
              {step === 2 && "Biometric Verification"}
              {step === 3 && "Access Granted"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Enter your medical license and hospital information"}
              {step === 2 && "Complete biometric identity verification"}
              {step === 3 && "Welcome to MedRecords Dashboard"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="medicalId">Medical License ID</Label>
                  <Input
                    id="medicalId"
                    value={formData.medicalId}
                    onChange={(e) => handleInputChange('medicalId', e.target.value)}
                    placeholder="Enter your medical license number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hospitalId">Hospital/Clinic ID</Label>
                  <Input
                    id="hospitalId"
                    value={formData.hospitalId}
                    onChange={(e) => handleInputChange('hospitalId', e.target.value)}
                    placeholder="Enter your hospital ID"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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
                
                <Button 
                  onClick={handleNextStep} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!formData.medicalId || !formData.hospitalId || !formData.password}
                >
                  Continue to Verification
                </Button>
              </>
            )}

            {step === 2 && (
              <div className="text-center space-y-6">
                <div className="bg-blue-50 rounded-xl p-8">
                  <Fingerprint className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Biometric Verification Required
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Place your finger on the scanner or look into the camera for facial recognition
                  </p>
                  
                  {!formData.biometricVerified ? (
                    <Button 
                      onClick={simulateBiometric}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Start Biometric Scan
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="animate-pulse">
                        <div className="h-2 bg-green-200 rounded-full">
                          <div className="h-2 bg-green-600 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-green-600 font-medium">Verifying identity...</p>
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Your biometric data is encrypted and never stored</p>
                  <p>• This verification ensures HIPAA compliance</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Identity Verified Successfully
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Welcome, Dr. Johnson. You now have secure access to patient medical records.
                  </p>
                  
                  <Button 
                    onClick={onLogin}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Access Dashboard
                  </Button>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Security Notice:</strong> Your session will automatically expire 
                    after 30 minutes of inactivity for patient data protection.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}