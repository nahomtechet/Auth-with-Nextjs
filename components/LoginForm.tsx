'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      })
      router.push('/dashboard');
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password.",
        variant: "destructive",
      })
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log in to your account</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="john@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <Button className="w-full mt-6" type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button variant="outline" className="w-full mb-2" onClick={handleGoogleSignIn}>
          <Icons.google className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
        <div className="flex justify-between w-full mt-4">
          <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </Link>
          <Link href="/signup" className="text-sm text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

