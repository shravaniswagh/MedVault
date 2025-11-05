import React, { useState } from 'react';
import { RoleSelection } from './components/RoleSelection';
import { SignUp } from './components/SignUp';
import { DoctorLogin } from './components/DoctorLogin';
import { DoctorDashboard } from './components/DoctorDashboard';
import { PatientLogin } from './components/PatientLogin';
import { PatientDashboard } from './components/PatientDashboard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

type Role = 'doctor' | 'patient' | 'admin' | null;
type Screen = 'roleSelection' | 'signup' | 'login' | 'dashboard';

interface User {
  id: string;
  role: 'doctor' | 'patient';
  aadhaar: string;
  name: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  registrationDate: string;
}

interface EmergencyRequest {
  id: string;
  doctorId: string;
  doctorName: string;
  requestTime: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  additionalJustification?: string;
  isResubmission?: boolean;
  previousRequestId?: string;
}

function App() {
  const [currentRole, setCurrentRole] = useState<Role>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('roleSelection');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>([]);

  const handleRoleSelect = (role: Role, action: 'signup' | 'login') => {
    setCurrentRole(role);
    if (action === 'signup') {
      setCurrentScreen('signup');
    } else {
      setCurrentScreen('login');
    }
  };

  const handleSignUpComplete = (userData: User) => {
    setRegisteredUsers(prev => [...prev, userData]);
    setCurrentScreen('login');
  };

  const handleLogin = (userData: any) => {
    setUserInfo(userData);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setCurrentScreen('roleSelection');
    setUserInfo(null);
  };

  const handleBack = () => {
    setCurrentScreen('roleSelection');
    setCurrentRole(null);
  };

  const handleGoToLogin = () => {
    setCurrentScreen('login');
  };

  const handleEmergencyRequest = (request: EmergencyRequest) => {
    setEmergencyRequests(prev => [...prev, request]);
  };

  const handleRequestApproval = (requestId: string, approved: boolean) => {
    setEmergencyRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: approved ? 'approved' : 'rejected' }
          : req
      )
    );
  };

  const handleUserApproval = (userId: string, approved: boolean) => {
    setRegisteredUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: approved ? 'approved' : 'rejected' }
          : user
      )
    );
  };

  // Role Selection Screen
  if (currentScreen === 'roleSelection') {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  // Sign Up Screen
  if (currentScreen === 'signup') {
    return (
      <SignUp
        role={currentRole as 'doctor' | 'patient'}
        onSignUpComplete={handleSignUpComplete}
        onBack={handleBack}
        onGoToLogin={handleGoToLogin}
        registeredUsers={registeredUsers}
      />
    );
  }

  // Login Screen
  if (currentScreen === 'login') {
    if (currentRole === 'doctor') {
      return (
        <DoctorLogin
          onLogin={handleLogin}
          onBack={handleBack}
          registeredUsers={registeredUsers}
        />
      );
    }
    if (currentRole === 'patient') {
      return (
        <PatientLogin
          onLogin={handleLogin}
          onBack={handleBack}
          registeredUsers={registeredUsers}
        />
      );
    }
    if (currentRole === 'admin') {
      return <AdminLogin onLogin={handleLogin} onBack={handleBack} />;
    }
  }

  // Dashboard Screen
  if (currentScreen === 'dashboard') {
    if (currentRole === 'doctor') {
      return (
        <DoctorDashboard
          userInfo={userInfo}
          onLogout={handleLogout}
          onEmergencyRequest={handleEmergencyRequest}
          emergencyRequests={emergencyRequests}
          registeredUsers={registeredUsers}
        />
      );
    }
    if (currentRole === 'patient') {
      return <PatientDashboard userInfo={userInfo} onLogout={handleLogout} />;
    }
    if (currentRole === 'admin') {
      return (
        <AdminDashboard
          userInfo={userInfo}
          onLogout={handleLogout}
          emergencyRequests={emergencyRequests}
          onRequestApproval={handleRequestApproval}
          registeredUsers={registeredUsers}
          onUserApproval={handleUserApproval}
        />
      );
    }
  }

  return null;
}

export default App;
