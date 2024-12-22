'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export default function TwoFactorAuth() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would typically send the code to your backend for verification
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
    setIsLoading(false);
    // Handle the response accordingly
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>Enter the code sent to your device</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="code">Authentication Code</Label>
            <Input 
              id="code" 
              placeholder="Enter 6-digit code" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              required 
              maxLength={6}
              pattern="\d{6}"
            />
          </div>
          <Button className="w-full mt-6" type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Didn't receive a code?{" "}
          <button className="text-blue-500 hover:underline">
            Resend
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}

