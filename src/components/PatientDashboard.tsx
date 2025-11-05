import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
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
  FileText
} from 'lucide-react';

interface PatientDashboardProps {
  userInfo: any;
  onLogout: () => void;
}

// Mock patient data - in production this would come from the database
const patientData = {
  id: 'P001',
  aadhaar: '1234-5678-9012',
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
    { date: '2024-09-05', hospital: 'Fortis Hospital', doctor: 'Dr. Singh', reason: 'General Checkup' },
    { date: '2024-07-20', hospital: 'Manipal Hospital', doctor: 'Dr. Kumar', reason: 'Allergy Testing' }
  ],
  labResults: [
    { test: 'Complete Blood Count', value: 'Normal', date: '2024-10-15', range: 'Within normal limits' },
    { test: 'Spirometry', value: 'FEV1: 82%', date: '2024-10-15', range: 'Mild obstruction' },
    { test: 'Allergy Panel', value: 'Positive for peanuts', date: '2024-07-20', range: 'See allergies' }
  ]
};

export function PatientDashboard({ userInfo, onLogout }: PatientDashboardProps) {
  const handleDownloadRecords = () => {
    alert('Your complete medical records would be downloaded as a PDF document in production.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">MedRecords - Patient Portal</h1>
                <p className="text-sm text-gray-500">Welcome, {patientData.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Shield className="h-4 w-4" />
                <span>Secure Access</span>
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
        {/* Patient Info Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl text-gray-900">{patientData.name}</h2>
                  <p className="text-gray-600">Patient ID: {patientData.id}</p>
                  <p className="text-gray-600">Aadhaar: {patientData.aadhaar}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{patientData.age} years old</span>
                    <span>•</span>
                    <span>{patientData.gender}</span>
                    <span>•</span>
                    <span>Blood Type: {patientData.bloodType}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <Button onClick={handleDownloadRecords} className="mb-2 bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download My Records
                </Button>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  {patientData.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-1" />
                  {patientData.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {patientData.address}
                </div>
              </div>
            </div>

            {/* Alert for allergies */}
            {patientData.allergies.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-red-900">Your Allergies:</span>
                  <div className="flex space-x-2">
                    {patientData.allergies.map((allergy, index) => (
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
                    {patientData.conditions.map((condition, index) => (
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
                        <p className="text-sm">Last visit: {patientData.lastVisit}</p>
                        <p className="text-xs text-gray-500">{patientData.recentVisits[0]?.hospital}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm">Lab results updated</p>
                        <p className="text-xs text-gray-500">Recent tests available</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm">Medication refill</p>
                        <p className="text-xs text-gray-500">Check with your doctor</p>
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
                <CardDescription>Your recent medical visits and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientData.recentVisits.map((visit, index) => (
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
                  {patientData.medications.map((med, index) => (
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
                <CardTitle>Lab Results</CardTitle>
                <CardDescription>Your latest laboratory test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientData.labResults.map((lab, index) => (
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
    </div>
  );
}
