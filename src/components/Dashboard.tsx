import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  AlertTriangle
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

// Mock patient data
const mockPatients = [
  {
    id: 'P001',
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    address: '123 Main St, Boston, MA 02101',
    lastVisit: '2024-08-20',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Shellfish'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
    ],
    recentVisits: [
      { date: '2024-08-20', hospital: 'Boston General Hospital', doctor: 'Dr. Smith', reason: 'Annual Checkup' },
      { date: '2024-07-15', hospital: 'City Medical Center', doctor: 'Dr. Davis', reason: 'Diabetes Follow-up' },
      { date: '2024-06-10', hospital: 'Boston General Hospital', doctor: 'Dr. Wilson', reason: 'Blood Pressure Check' }
    ],
    labResults: [
      { test: 'HbA1c', value: '7.2%', date: '2024-08-20', range: 'Normal: <7%' },
      { test: 'Total Cholesterol', value: '195 mg/dL', date: '2024-08-20', range: 'Normal: <200 mg/dL' },
      { test: 'Blood Pressure', value: '138/88 mmHg', date: '2024-08-20', range: 'Normal: <120/80 mmHg' }
    ]
  }
];

export function Dashboard({ onLogout }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);

  const handlePatientSearch = () => {
    if (searchQuery.toLowerCase().includes('sarah') || searchQuery.includes('P001')) {
      setSelectedPatient(mockPatients[0]);
    }
  };

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
                <h1 className="text-xl font-bold text-gray-900">MedRecords Dashboard</h1>
                <p className="text-sm text-gray-500">Dr. Johnson - Boston General Hospital</p>
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
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Patient Search</CardTitle>
            <CardDescription>
              Search by patient name, ID, phone number, or medical record number
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter patient name, ID, or phone number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button 
                onClick={handlePatientSearch}
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Try searching: "Sarah Johnson" or "P001"
            </p>
          </CardContent>
        </Card>

        {/* Patient Results */}
        {selectedPatient && (
          <div className="space-y-6">
            {/* Patient Info Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">Patient ID: {selectedPatient.id}</p>
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
                      <span className="font-medium text-red-900">Allergies:</span>
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
                            <p className="text-xs text-gray-500">Boston General Hospital</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="text-sm">Lab results updated</p>
                            <p className="text-xs text-gray-500">2 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div>
                            <p className="text-sm">Medication refill due</p>
                            <p className="text-xs text-gray-500">in 5 days</p>
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
                              <h4 className="font-medium text-gray-900">{visit.reason}</h4>
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
                              <h4 className="font-medium text-gray-900">{med.name}</h4>
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
                              <h4 className="font-medium text-gray-900">{lab.test}</h4>
                              <p className="text-sm text-gray-600">{lab.range}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{lab.value}</p>
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

        {/* Empty State */}
        {!selectedPatient && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Search for a Patient</h3>
              <p className="text-gray-600">
                Enter a patient's name, ID, or phone number to access their medical records.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}