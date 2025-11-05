import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  ShieldCheck,
  LogOut,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  FileText,
  Activity
} from 'lucide-react';

interface AdminDashboardProps {
  userInfo: any;
  onLogout: () => void;
  emergencyRequests: any[];
  onRequestApproval: (requestId: string, approved: boolean) => void;
  registeredUsers: any[];
  onUserApproval: (userId: string, approved: boolean) => void;
}

export function AdminDashboard({ 
  userInfo, 
  onLogout, 
  emergencyRequests,
  onRequestApproval,
  registeredUsers,
  onUserApproval 
}: AdminDashboardProps) {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingRequests = emergencyRequests.filter(req => req.status === 'pending');
  const approvedRequests = emergencyRequests.filter(req => req.status === 'approved');
  const rejectedRequests = emergencyRequests.filter(req => req.status === 'rejected');

  const pendingUsers = registeredUsers.filter(user => user.status === 'pending');
  const approvedUsers = registeredUsers.filter(user => user.status === 'approved');

  const handleApprove = (requestId: string) => {
    onRequestApproval(requestId, true);
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string) => {
    setRejectingRequestId(requestId);
    setShowRejectDialog(true);
  };

  const handleConfirmReject = () => {
    if (rejectingRequestId) {
      // Find the request and add rejection reason
      const request = emergencyRequests.find(r => r.id === rejectingRequestId);
      if (request) {
        request.rejectionReason = rejectionReason || 'No specific reason provided';
      }
      onRequestApproval(rejectingRequestId, false);
      setSelectedRequest(null);
      setShowRejectDialog(false);
      setRejectingRequestId(null);
      setRejectionReason('');
    }
  };

  // Mock audit logs
  const auditLogs = [
    { time: '2024-11-02 14:30', action: 'Emergency access requested', user: 'Dr. Rajesh Kumar', details: 'Trauma case - unconscious patient' },
    { time: '2024-11-02 14:32', action: 'Request approved', user: 'Admin Supervisor', details: 'Verified doctor credentials' },
    { time: '2024-11-02 14:35', action: 'Patient record accessed', user: 'Dr. Rajesh Kumar', details: 'Patient ID: P002 - Emergency treatment' },
    { time: '2024-11-02 13:15', action: 'Normal access', user: 'Dr. Priya Singh', details: 'Patient search via Aadhaar' },
    { time: '2024-11-02 12:45', action: 'Patient login', user: 'Priya Sharma', details: 'Viewed own medical records' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600 p-2 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">MedRecords - Admin Portal</h1>
                <p className="text-sm text-gray-500">{userInfo.name} - {userInfo.department}</p>
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
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                  <p className="text-2xl text-gray-900">{pendingRequests.length}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved Today</p>
                  <p className="text-2xl text-gray-900">{approvedRequests.length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected Today</p>
                  <p className="text-2xl text-gray-900">{rejectedRequests.length}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl text-gray-900">{emergencyRequests.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="registrations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="registrations" className="relative">
              User Registrations
              {pendingUsers.length > 0 && (
                <Badge className="ml-2 bg-yellow-600">{pendingUsers.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Emergency Requests
              {pendingRequests.length > 0 && (
                <Badge className="ml-2 bg-red-600">{pendingRequests.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">Request History</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          {/* User Registrations Tab */}
          <TabsContent value="registrations">
            {pendingUsers.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg text-gray-900 mb-2">No Pending Registrations</h3>
                  <p className="text-gray-600">
                    All user registrations have been processed.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <Card key={user.id} className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center text-gray-900">
                            <User className="h-5 w-5 mr-2 text-blue-600" />
                            {user.role === 'doctor' ? 'Doctor' : 'Patient'} Registration
                          </CardTitle>
                          <CardDescription className="text-gray-700">
                            Registration ID: {user.id}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Pending Approval
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Full Name</p>
                          <p className="text-gray-900">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Aadhaar Number</p>
                          <p className="text-gray-900">{user.aadhaar}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone Number</p>
                          <p className="text-gray-900">{user.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Registration Date</p>
                          <p className="text-gray-900">{user.registrationDate}</p>
                        </div>
                        {user.role === 'doctor' && (
                          <>
                            <div>
                              <p className="text-sm text-gray-600">Medical License ID</p>
                              <p className="text-gray-900">{user.medicalLicenseId}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Hospital ID</p>
                              <p className="text-gray-900">{user.hospitalId}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Specialization</p>
                              <p className="text-gray-900">{user.specialization}</p>
                            </div>
                          </>
                        )}
                      </div>

                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertDescription className="text-amber-900">
                          <strong>Verification Required:</strong> Please verify the {user.role}'s credentials 
                          and Aadhaar details before approving registration.
                        </AlertDescription>
                      </Alert>

                      <div className="flex space-x-4">
                        <Button 
                          onClick={() => onUserApproval(user.id, true)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Registration
                        </Button>
                        <Button 
                          onClick={() => onUserApproval(user.id, false)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Registration
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Pending Requests */}
          <TabsContent value="pending">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg text-gray-900 mb-2">No Pending Requests</h3>
                  <p className="text-gray-600">
                    All emergency access requests have been processed.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="border-2 border-yellow-200 bg-yellow-50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center text-gray-900">
                            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                            Emergency Access Request
                            {request.isResubmission && (
                              <Badge className="ml-2 bg-orange-600">Resubmission</Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="text-gray-700">
                            Request ID: {request.id}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Pending Review
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {request.isResubmission && request.previousRequestId && (
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-orange-900">
                            <strong>This is a resubmission.</strong> Previous request ({request.previousRequestId}) was rejected.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Doctor Name</p>
                          <p className="text-gray-900">{request.doctorName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Doctor ID</p>
                          <p className="text-gray-900">{request.doctorId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Request Time</p>
                          <p className="text-gray-900">{request.requestTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Reason</p>
                          <p className="text-gray-900">{request.reason}</p>
                        </div>
                      </div>

                      {request.additionalJustification && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Additional Justification:</p>
                          <p className="text-gray-900">{request.additionalJustification}</p>
                        </div>
                      )}

                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-900">
                          <strong>Verification Required:</strong> Please verify the doctor's credentials 
                          and the legitimacy of this emergency access request before approving.
                        </AlertDescription>
                      </Alert>

                      <div className="flex space-x-4">
                        <Button 
                          onClick={() => handleApprove(request.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Access
                        </Button>
                        <Button 
                          onClick={() => handleReject(request.id)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Request
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Request History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Request History</CardTitle>
                <CardDescription>All emergency access requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {emergencyRequests.length === 0 ? (
                  <div className="py-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No emergency access requests yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {emergencyRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-gray-900">{request.doctorName}</h4>
                            <p className="text-sm text-gray-600">ID: {request.doctorId}</p>
                          </div>
                          <Badge 
                            variant={
                              request.status === 'approved' ? 'default' : 
                              request.status === 'rejected' ? 'destructive' : 
                              'outline'
                            }
                            className={
                              request.status === 'approved' ? 'bg-green-600' :
                              request.status === 'rejected' ? '' :
                              'bg-yellow-100 text-yellow-800 border-yellow-300'
                            }
                          >
                            {request.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {request.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                            {request.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Request Time:</span>
                            <span className="ml-2 text-gray-900">{request.requestTime}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Reason:</span>
                            <span className="ml-2 text-gray-900">{request.reason}</span>
                          </div>
                        </div>
                        {request.rejectionReason && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <span className="text-sm text-gray-600">Rejection Reason:</span>
                            <p className="text-sm text-gray-900 mt-1">{request.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs */}
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>System Audit Logs</CardTitle>
                <CardDescription>Complete access and activity log for compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-gray-900">{log.action}</p>
                          <p className="text-sm text-gray-600">{log.user}</p>
                          <p className="text-xs text-gray-500">{log.details}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {log.time}
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

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Emergency Access Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request. This will be shared with the doctor.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-900">
                The doctor will be notified of this rejection and will be restricted from accessing patient data.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Reason for Rejection <span className="text-red-600">*</span></Label>
              <Textarea
                id="rejection-reason"
                placeholder="e.g., Insufficient verification, invalid credentials, etc."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleConfirmReject}
                variant="destructive"
                className="flex-1"
                disabled={!rejectionReason.trim()}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Confirm Rejection
              </Button>
              <Button 
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason('');
                  setRejectingRequestId(null);
                }}
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
  );
}
