import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, User, Stethoscope, Eye, EyeOff, CheckCircle, Smartphone } from 'lucide-react';

interface SignUpProps {
  role: 'doctor' | 'patient';
  onSignUpComplete: (userData: any) => void;
  onBack: () => void;
  onGoToLogin: () => void;
  registeredUsers: any[];
}

export function SignUp({ role, onSignUpComplete, onBack, onGoToLogin, registeredUsers }: SignUpProps) {
  const [step, setStep] = useState(1); // 1: Details, 2: OTP Verification, 3: Success
  const [formData, setFormData] = useState({
    name: '',
    aadhaar: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Doctor specific fields
    medicalLicenseId: '',
    hospitalId: '',
    specialization: ''
  });
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear duplicate error when user modifies the form
    if (duplicateError && (field === 'aadhaar' || field === 'medicalLicenseId')) {
      setDuplicateError('');
    }
  };

  const handleSendOTP = () => {
    // Check for duplicate Aadhaar number
    const normalizedAadhaar = formData.aadhaar.replace(/\s+/g, '').replace(/-/g, '');
    const existingUser = registeredUsers.find(user => 
      user.aadhaar.replace(/\s+/g, '').replace(/-/g, '') === normalizedAadhaar
    );

    if (existingUser) {
      setDuplicateError(`An account with this Aadhaar number already exists. Status: ${existingUser.status}. Please login instead.`);
      return;
    }

    // Check for duplicate medical license (for doctors)
    if (role === 'doctor' && formData.medicalLicenseId) {
      const existingDoctor = registeredUsers.find(user => 
        user.role === 'doctor' && user.medicalLicenseId === formData.medicalLicenseId
      );

      if (existingDoctor) {
        setDuplicateError('A doctor with this Medical License ID already exists. Please login instead.');
        return;
      }
    }

    // Clear any previous errors
    setDuplicateError('');
    
    // Simulate sending OTP
    setOtpSent(true);
    alert(`OTP sent to Aadhaar-linked mobile number ending with ${formData.phone.slice(-4)}`);
  };

  const handleVerifyOTP = () => {
    // Simulate OTP verification
    if (otp.length === 6) {
      setTimeout(() => {
        setStep(3);
      }, 1000);
    }
  };

  const handleCompleteRegistration = () => {
    const userData = {
      id: `${role.toUpperCase()}-${Date.now()}`,
      role: role,
      aadhaar: formData.aadhaar,
      name: formData.name,
      phone: formData.phone,
      status: 'pending' as const,
      registrationDate: new Date().toLocaleString(),
      ...(role === 'doctor' && {
        medicalLicenseId: formData.medicalLicenseId,
        hospitalId: formData.hospitalId,
        specialization: formData.specialization
      })
    };
    
    onSignUpComplete(userData);
  };

  const isStep1Valid = () => {
    const basicValid = formData.name && formData.aadhaar && formData.phone && 
                      formData.password && formData.password === formData.confirmPassword;
    
    if (role === 'doctor') {
      return basicValid && formData.medicalLicenseId && formData.hospitalId && formData.specialization;
    }
    return basicValid;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-4 left-4 text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className={`${role === 'doctor' ? 'bg-blue-600' : 'bg-green-600'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            {role === 'doctor' ? (
              <Stethoscope className="h-8 w-8 text-white" />
            ) : (
              <User className="h-8 w-8 text-white" />
            )}
          </div>
          <h1 className="text-2xl text-gray-900">
            {role === 'doctor' ? 'Doctor Registration' : 'Patient Registration'}
          </h1>
          <p className="text-gray-600 mt-2">
            {step === 1 && 'Fill in your details to create an account'}
            {step === 2 && 'Verify your Aadhaar with OTP'}
            {step === 3 && 'Registration submitted successfully'}
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle>
              {step === 1 && 'Create Account'}
              {step === 2 && 'OTP Verification'}
              {step === 3 && 'Registration Complete'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Enter your details and create a secure password'}
              {step === 2 && 'Enter the 6-digit OTP sent to your Aadhaar-linked mobile'}
              {step === 3 && 'Your account is pending admin approval'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Registration Form */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Card Number</Label>
                  <Input
                    id="aadhaar"
                    value={formData.aadhaar}
                    onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={14}
                  />
                  <p className="text-xs text-gray-500">12-digit Aadhaar number</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {role === 'doctor' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="medicalLicenseId">Medical License ID</Label>
                      <Input
                        id="medicalLicenseId"
                        value={formData.medicalLicenseId}
                        onChange={(e) => handleInputChange('medicalLicenseId', e.target.value)}
                        placeholder="e.g., MCI-12345"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hospitalId">Hospital/Clinic ID</Label>
                      <Input
                        id="hospitalId"
                        value={formData.hospitalId}
                        onChange={(e) => handleInputChange('hospitalId', e.target.value)}
                        placeholder="e.g., HOSP-001"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => handleInputChange('specialization', e.target.value)}
                        placeholder="e.g., Emergency Medicine"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Create Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a strong password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Re-enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-600">Passwords do not match</p>
                  )}
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className={`w-full ${role === 'doctor' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                  disabled={!isStep1Valid()}
                >
                  Continue to Verification
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={onGoToLogin}
                      className={`${role === 'doctor' ? 'text-blue-600 hover:text-blue-700' : 'text-green-600 hover:text-green-700'}`}
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div className="text-center space-y-6">
                <div className="bg-blue-50 rounded-xl p-8">
                  <Smartphone className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg text-gray-900 mb-2">
                    Aadhaar Verification
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We'll send an OTP to your Aadhaar-linked mobile number
                  </p>

                  {duplicateError && (
                    <Alert className="bg-red-50 border-red-200 mb-4">
                      <AlertDescription className="text-red-900">
                        <strong>Registration Error:</strong> {duplicateError}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {!otpSent ? (
                    <div className="space-y-3">
                      <Button 
                        onClick={handleSendOTP}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Send OTP
                      </Button>
                      {duplicateError && (
                        <Button 
                          onClick={onGoToLogin}
                          variant="outline"
                          className="w-full"
                        >
                          Go to Login
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Alert className="bg-green-50 border-green-200">
                        <AlertDescription className="text-green-900">
                          OTP sent to mobile ending with {formData.phone.slice(-4)}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-3">
                        <Label>Enter 6-digit OTP</Label>
                        <div className="flex justify-center">
                          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </div>

                      <Button
                        onClick={handleVerifyOTP}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={otp.length !== 6}
                      >
                        Verify OTP
                      </Button>

                      <button
                        onClick={handleSendOTP}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your account has been created and is pending admin approval.
                  </p>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-900">
                    <strong>Next Steps:</strong>
                    <ul className="mt-2 space-y-1 text-left">
                      <li>• Your registration details have been sent to the admin</li>
                      <li>• Admin will verify your credentials</li>
                      <li>• You'll receive confirmation once approved</li>
                      <li>• You can try logging in after approval</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleCompleteRegistration}
                  className={`w-full ${role === 'doctor' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  Go to Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
