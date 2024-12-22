'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import Image from 'next/image';

export default function SecurityPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handle2FAToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/enable-2fa', { method: 'POST' });
      const data = await response.json();
      if (data.qr) {
        setQrCode(data.qr);
        setIs2FAEnabled(true);
      }
    } catch (error) {
      console.error('Failed to enable 2FA:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Security Settings</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="2fa" checked={is2FAEnabled} onCheckedChange={handle2FAToggle} />
            <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
          </div>
          {isLoading && <Icons.spinner className="mt-4 h-6 w-6 animate-spin" />}
          {qrCode && (
            <div className="mt-4">
              <p className="mb-2">Scan this QR code with your authenticator app:</p>
              <Image src={qrCode} alt="2FA QR Code" width={200} height={200} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

