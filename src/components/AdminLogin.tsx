import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Mock authentication - in production this would verify against database
    if (adminId && password) {
      onLogin({
        role: 'admin',
        adminId: adminId,
        name: 'Admin Supervisor',
        department: 'Medical Records Administration'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
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
          <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Manage emergency access requests</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle>Administrator Access</CardTitle>
            <CardDescription>
              Login to review and manage doctor access requests
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="adminId">Admin ID</Label>
              <Input
                id="adminId"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter your admin ID"
              />
              <p className="text-xs text-gray-500">
                Try: ADMIN-001
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleLogin}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!adminId || !password}
            >
              Login as Admin
            </Button>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <p className="text-amber-900 text-sm">
                <strong>Security Notice:</strong> All admin actions are logged and audited. 
                Unauthorized access attempts will be reported.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
