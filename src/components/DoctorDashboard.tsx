import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Label } from './ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { Textarea } from './ui/textarea';
import { 
  Search, 
  FileText, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  LogOut,
  Shield,
  Activity,
  Pill,
  Heart,
  AlertTriangle,
  Download,
  AlertCircle,
  Lock,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface DoctorDashboardProps {
  userInfo: any;
  onLogout: () => void;
  onEmergencyRequest: (request: any) => void;
  emergencyRequests: any[];
  registeredUsers: any[];
}

// Mock patient database with Aadhaar numbers
const mockPatientDatabase = [
  {
    id: 'P001',
    aadhaar: '1234-5678-9012',
    password: 'patient123', // In production, this would be hashed
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    address: 'MG Road, Bangalore, Karnataka 560001',
    lastVisit: '2024-10-15',
    bloodType: 'O+',
    allergies: ['Aspirin', 'Peanuts'],
    conditions: ['Asthma'],
    medications: [
      { name: 'Albuterol Inhaler', dosage: '90 mcg', frequency: 'As needed' },
      { name: 'Montelukast', dosage: '10mg', frequency: 'Once daily' }
    ],
    recentVisits: [
      { date: '2024-10-15', hospital: 'Apollo Hospital Bangalore', doctor: 'Dr. Mehta', reason: 'Asthma Follow-up' },
      { date: '2024-09-05', hospital: 'Fortis Hospital', doctor: 'Dr. Singh', reason: 'General Checkup' }
    ],
    labResults: [
      { test: 'Complete Blood Count', value: 'Normal', date: '2024-10-15', range: 'Within normal limits' },
      { test: 'Spirometry', value: 'FEV1: 82%', date: '2024-10-15', range: 'Mild obstruction' }
    ]
  },
  {
    id: 'P002',
    aadhaar: '9876-5432-1098',
    password: 'patient456',
    name: 'Amit Patel',
    age: 45,
    gender: 'Male',
    phone: '+91 91234 56789',
    email: 'amit.patel@email.com',
    address: 'Satellite Road, Ahmedabad, Gujarat 380015',
    lastVisit: '2024-10-28',
    bloodType: 'A+',
    allergies: ['Penicillin'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' }
    ],
    recentVisits: [
      { date: '2024-10-28', hospital: 'Sterling Hospital', doctor: 'Dr. Shah', reason: 'Diabetes Management' },
      { date: '2024-09-20', hospital: 'Civil Hospital', doctor: 'Dr. Desai', reason: 'BP Monitoring' }
    ],
    labResults: [
      { test: 'HbA1c', value: '7.8%', date: '2024-10-28', range: 'Target: <7%' },
      { test: 'Blood Pressure', value: '142/90 mmHg', date: '2024-10-28', range: 'Target: <130/80' }
    ]
  },
  {
    id: 'P003',
    aadhaar: '5555-6666-7777',
    password: 'patient789',
    name: 'Sneha Reddy',
    age: 32,
    gender: 'Female',
    phone: '+91 99887 76655',
    email: 'sneha.reddy@email.com',
    address: 'Banjara Hills, Hyderabad, Telangana 500034',
    lastVisit: '2024-11-01',
    bloodType: 'B+',
    allergies: [],
    conditions: ['Migraine'],
    medications: [
      { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed for migraine' }
    ],
    recentVisits: [
      { date: '2024-11-01', hospital: 'KIMS Hospital', doctor: 'Dr. Rao', reason: 'Migraine Treatment' }
    ],
    labResults: [
      { test: 'MRI Brain', value: 'No abnormalities', date: '2024-11-01', range: 'Normal' }
    ]
  }
];

export function DoctorDashboard({ 
  userInfo, 
  onLogout, 
  onEmergencyRequest, 
  emergencyRequests,
  registeredUsers 
}: DoctorDashboardProps) {
  const [patientAadhaar, setPatientAadhaar] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [showPatientPassword, setShowPatientPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [accessStep, setAccessStep] = useState(1); // 1: Aadhaar+Password, 2: OTP, 3: Access Granted
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatientDatabase[0] | null>(null);
  const [accessError, setAccessError] = useState('');
  
  const [emergencyPin, setEmergencyPin] = useState('');
  const [emergencyReason, setEmergencyReason] = useState('');
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [emergencySearchQuery, setEmergencySearchQuery] = useState('');
  const [showResubmitDialog, setShowResubmitDialog] = useState(false);
  const [additionalJustification, setAdditionalJustification] = useState('');

  const handleRequestAccess = () => {
    setAccessError('');
    
    // Normalize Aadhaar
    const normalizedAadhaar = patientAadhaar.replace(/\s+/g, '').replace(/-/g, '');
    
    // Check if patient exists and also check in registeredUsers
    const patient = mockPatientDatabase.find(p => 
      p.aadhaar.replace(/-/g, '') === normalizedAadhaar
    );
    
    const registeredPatient = registeredUsers.find(
      user => user.role === 'patient' && 
              user.aadhaar.replace(/-/g, '') === normalizedAadhaar &&
              user.status === 'approved'
    );
    
    if (!patient && !registeredPatient) {
      setAccessError('Patient not found in database');
      return;
    }
    
    // Verify password
    if (patient && patient.password !== patientPassword) {
      setAccessError('Invalid patient password');
      return;
    }
    
    // Send OTP
    setOtpSent(true);
    setAccessStep(2);
    alert(`OTP sent to patient's phone: ${patient?.phone || registeredPatient?.phone}`);
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      // Simulate OTP verification
      setAccessStep(3);
      
      const normalizedAadhaar = patientAadhaar.replace(/\s+/g, '').replace(/-/g, '');
      const patient = mockPatientDatabase.find(p => 
        p.aadhaar.replace(/-/g, '') === normalizedAadhaar
      );
      
      if (patient) {
        setSelectedPatient(patient);
      }
    }
  };

  const handleResetAccess = () => {
    setPatientAadhaar('');
    setPatientPassword('');
    setOtp('');
    setOtpSent(false);
    setAccessStep(1);
    setSelectedPatient(null);
    setAccessError('');
  };

  const handleEmergencySubmit = () => {
    if (emergencyPin && emergencyReason) {
      const request = {
        id: `REQ-${Date.now()}`,
        doctorId: doctorMedicalLicenseId,
        doctorName: userInfo.name,
        requestTime: new Date().toLocaleString(),
        reason: emergencyReason,
        status: 'pending' as const
      };
      
      onEmergencyRequest(request);
      setRequestSubmitted(true);
      setShowEmergencyDialog(false);
      
      // Reset form
      setEmergencyPin('');
      setEmergencyReason('');
      
      setTimeout(() => {
        setRequestSubmitted(false);
      }, 5000);
    }
  };

  const handleResubmitRequest = () => {
    if (emergencyPin && emergencyReason && additionalJustification) {
      const request = {
        id: `REQ-${Date.now()}`,
        doctorId: doctorMedicalLicenseId,
        doctorName: userInfo.name,
        requestTime: new Date().toLocaleString(),
        reason: emergencyReason,
        additionalJustification: additionalJustification,
        isResubmission: true,
        previousRequestId: doctorRequest?.id,
        status: 'pending' as const
      };
      
      onEmergencyRequest(request);
      setRequestSubmitted(true);
      setShowResubmitDialog(false);
      
      // Reset form
      setEmergencyPin('');
      setEmergencyReason('');
      setAdditionalJustification('');
      
      setTimeout(() => {
        setRequestSubmitted(false);
      }, 5000);
    }
  };

  const handleDownloadReport = () => {
    alert('Report download functionality would generate a PDF/Word document with patient details in production.');
  };

  // Check if this specific doctor's request was approved using their medical license ID from userInfo
  const doctorMedicalLicenseId = userInfo.medicalLicenseId;
  const doctorRequest = emergencyRequests.find(
    req => req.doctorId === doctorMedicalLicenseId
  );
  const hasApprovedAccess = doctorRequest?.status === 'approved';

  // Filter patients based on emergency search
  const filteredPatients = mockPatientDatabase.filter(patient => {
    if (!emergencySearchQuery) return true;
    const query = emergencySearchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.aadhaar.includes(query) ||
      patient.id.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">MedRecords - Doctor Portal</h1>
                <p className="text-sm text-gray-500">{userInfo.name} - {userInfo.specialization}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Shield className="h-4 w-4" />
                <span>Secure Session Active</span>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Access Alerts */}
        {requestSubmitted && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Emergency access request submitted. Waiting for admin approval...
            </AlertDescription>
          </Alert>
        )}

        {doctorRequest && doctorRequest.status === 'pending' && !requestSubmitted && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-900">
              Your emergency access request is pending admin approval. Request ID: {doctorRequest.id}
            </AlertDescription>
          </Alert>
        )}

        {doctorRequest && doctorRequest.status === 'rejected' && (
          <Card className="mb-6 border-red-300 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-900">
                <XCircle className="h-5 w-5 mr-2 text-red-600" />
                Emergency Access Request Denied
              </CardTitle>
              <CardDescription className="text-red-800">
                Your emergency access request has been rejected by the administrator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Request ID:</span>
                  <span className="text-gray-900">{doctorRequest.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="text-gray-900">{doctorRequest.requestTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Original Reason:</span>
                  <span className="text-gray-900">{doctorRequest.reason}</span>
                </div>
                {doctorRequest.rejectionReason && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Admin Feedback:</span>
                    <p className="text-sm text-gray-900 mt-1">{doctorRequest.rejectionReason}</p>
                  </div>
                )}
              </div>
              
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-900">
                  <strong>Access Restricted:</strong> You cannot access any patient data until your request is approved. You may resubmit a new request with additional justification.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={() => setShowResubmitDialog(true)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Resubmit Request with Additional Justification
              </Button>
            </CardContent>
          </Card>
        )}

        {hasApprovedAccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              <strong>Emergency access granted!</strong> You can now search and access all patient records below.
            </AlertDescription>
          </Alert>
        )}

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Normal Access Mode */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-blue-600" />
                Normal Access Mode
              </CardTitle>
              <CardDescription>
                Access patient records with patient's Aadhaar, password, and OTP verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              {accessStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientAadhaar">Patient's Aadhaar Number</Label>
                    <Input
                      id="patientAadhaar"
                      placeholder="XXXX-XXXX-XXXX"
                      value={patientAadhaar}
                      onChange={(e) => {
                        setPatientAadhaar(e.target.value);
                        setAccessError('');
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patientPassword">Patient's Password</Label>
                    <div className="relative">
                      <Input
                        id="patientPassword"
                        type={showPatientPassword ? 'text' : 'password'}
                        placeholder="Enter patient's password"
                        value={patientPassword}
                        onChange={(e) => {
                          setPatientPassword(e.target.value);
                          setAccessError('');
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPatientPassword(!showPatientPassword)}
                      >
                        {showPatientPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {accessError && (
                    <Alert className="bg-red-50 border-red-200">
                      <AlertDescription className="text-red-900">{accessError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    onClick={handleRequestAccess}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!patientAadhaar || !patientPassword}
                  >
                    Request Access & Send OTP
                  </Button>

                  <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
                    <p className="font-medium">Test Credentials:</p>
                    <p>Aadhaar: 1234-5678-9012 | Password: patient123</p>
                    <p>Aadhaar: 9876-5432-1098 | Password: patient456</p>
                    <p>Aadhaar: 5555-6666-7777 | Password: patient789</p>
                  </div>
                </div>
              )}

              {accessStep === 2 && (
                <div className="space-y-4">
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-blue-900">
                      OTP sent to patient's phone. Please ask the patient to provide the OTP.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <Label>Enter 6-digit OTP from Patient</Label>
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
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={otp.length !== 6}
                  >
                    Verify OTP & Access Records
                  </Button>

                  <Button
                    onClick={handleResetAccess}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    For demo: Enter any 6-digit code
                  </p>
                </div>
              )}

              {accessStep === 3 && (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-900">
                      <strong>Access Granted!</strong> Patient records are now visible below.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleResetAccess}
                    variant="outline"
                    className="w-full"
                  >
                    Access Another Patient
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Emergency Break Glass */}
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-900">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Emergency "Break Glass" Access
              </CardTitle>
              <CardDescription className="text-red-800">
                Use when patient cannot provide password/OTP (unconscious, emergency)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <p className="text-sm text-gray-700 mb-3">
                    This emergency access requires:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Doctor PIN verification</li>
                    <li>• Medical license ID</li>
                    <li>• Admin approval</li>
                    <li>• Full audit trail logging</li>
                  </ul>
                </div>
                
                <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      variant="destructive"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Request Emergency Access
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Emergency Access Request</DialogTitle>
                      <DialogDescription>
                        Enter your PIN and details to request emergency access to all patient records
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-900">
                          <strong>Your Doctor ID:</strong> {doctorMedicalLicenseId}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pin">Emergency PIN</Label>
                        <Input
                          id="pin"
                          type="password"
                          placeholder="Enter your 6-digit PIN"
                          value={emergencyPin}
                          onChange={(e) => setEmergencyPin(e.target.value)}
                          maxLength={6}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Emergency Access</Label>
                        <Input
                          id="reason"
                          placeholder="Brief description of emergency"
                          value={emergencyReason}
                          onChange={(e) => setEmergencyReason(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleEmergencySubmit}
                        className="w-full bg-red-600 hover:bg-red-700"
                        disabled={!emergencyPin || !emergencyReason}
                      >
                        Submit Request to Admin
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Resubmit Dialog */}
                <Dialog open={showResubmitDialog} onOpenChange={setShowResubmitDialog}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Resubmit Emergency Access Request</DialogTitle>
                      <DialogDescription>
                        Your previous request was denied. Please provide additional justification to support your resubmission.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {doctorRequest && (
                        <Alert className="bg-red-50 border-red-200">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-900">
                            <strong>Previous Request Denied:</strong> {doctorRequest.rejectionReason || 'No specific reason provided'}
                          </AlertDescription>
                        </Alert>
                      )}

                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-900">
                          <strong>Your Doctor ID:</strong> {doctorMedicalLicenseId}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resubmit-pin">Emergency PIN</Label>
                        <Input
                          id="resubmit-pin"
                          type="password"
                          placeholder="Enter your 6-digit PIN"
                          value={emergencyPin}
                          onChange={(e) => setEmergencyPin(e.target.value)}
                          maxLength={6}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resubmit-reason">Original Reason for Emergency Access</Label>
                        <Input
                          id="resubmit-reason"
                          placeholder="Brief description of emergency"
                          value={emergencyReason}
                          onChange={(e) => setEmergencyReason(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additional-justification">
                          Additional Justification/Supporting Information <span className="text-red-600">*</span>
                        </Label>
                        <Textarea
                          id="additional-justification"
                          placeholder="Provide additional details, verification documents, or reasons why this request should be reconsidered..."
                          value={additionalJustification}
                          onChange={(e) => setAdditionalJustification(e.target.value)}
                          className="min-h-[120px]"
                        />
                        <p className="text-xs text-gray-500">
                          Please be specific and include any supporting information that addresses the reason for denial.
                        </p>
                      </div>

                      <Alert className="bg-yellow-50 border-yellow-200">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-900 text-sm">
                          This resubmission will be flagged for priority review by the admin. Ensure all information is accurate and complete.
                        </AlertDescription>
                      </Alert>

                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleResubmitRequest}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          disabled={!emergencyPin || !emergencyReason || !additionalJustification}
                        >
                          Resubmit Request to Admin
                        </Button>
                        <Button 
                          onClick={() => setShowResubmitDialog(false)}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Records Display */}
        {selectedPatient && (
          <div className="space-y-6">
            {/* Patient Info Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">Patient ID: {selectedPatient.id}</p>
                      <p className="text-gray-600">Aadhaar: {selectedPatient.aadhaar}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{selectedPatient.age} years old</span>
                        <span>•</span>
                        <span>{selectedPatient.gender}</span>
                        <span>•</span>
                        <span>Blood Type: {selectedPatient.bloodType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <Button onClick={handleDownloadReport} className="mb-2 bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report (PDF/Word)
                    </Button>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-1" />
                      {selectedPatient.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-1" />
                      {selectedPatient.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedPatient.address}
                    </div>
                  </div>
                </div>

                {/* Alert for allergies */}
                {selectedPatient.allergies.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="text-red-900">Allergies:</span>
                      <div className="flex space-x-2">
                        {selectedPatient.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive">{allergy}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical Information Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="visits">Visit History</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="labs">Lab Results</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        Current Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedPatient.conditions.map((condition, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span>{condition}</span>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-blue-500" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm">Last visit: {selectedPatient.lastVisit}</p>
                            <p className="text-xs text-gray-500">{selectedPatient.recentVisits[0]?.hospital}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="text-sm">Lab results updated</p>
                            <p className="text-xs text-gray-500">Recent tests available</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="visits" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Visit History</CardTitle>
                    <CardDescription>Recent medical visits and consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.recentVisits.map((visit, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-gray-900">{visit.reason}</h4>
                              <p className="text-sm text-gray-600">{visit.doctor} - {visit.hospital}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                {visit.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Pill className="h-5 w-5 mr-2 text-green-500" />
                      Current Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.medications.map((med, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-gray-900">{med.name}</h4>
                              <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Active
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="labs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Lab Results</CardTitle>
                    <CardDescription>Latest laboratory test results and values</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.labResults.map((lab, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-gray-900">{lab.test}</h4>
                              <p className="text-sm text-gray-600">{lab.range}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-900">{lab.value}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {lab.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Emergency Access Patient List */}
        {hasApprovedAccess && !selectedPatient && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Emergency Access - All Patient Records
              </CardTitle>
              <CardDescription>
                You have been granted emergency access to all patient records. Search and select a patient below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by patient name, Aadhaar, or ID..."
                    value={emergencySearchQuery}
                    onChange={(e) => setEmergencySearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredPatients.map((patient) => (
                    <Card 
                      key={patient.id} 
                      className="cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-gray-900">{patient.name}</h4>
                              <p className="text-sm text-gray-600">Aadhaar: {patient.aadhaar}</p>
                              <p className="text-sm text-gray-600">ID: {patient.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{patient.age} years, {patient.gender}</p>
                            <p className="text-sm text-gray-600">Blood Type: {patient.bloodType}</p>
                            <Badge variant="outline" className="mt-1">
                              {patient.conditions.length} condition(s)
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPatients.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No patients found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!selectedPatient && !hasApprovedAccess && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">Access Patient Records</h3>
              <p className="text-gray-600">
                Enter patient's Aadhaar and password, verify with OTP to access medical records, or use emergency access if needed.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
