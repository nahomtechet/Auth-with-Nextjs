import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <Button asChild className="mt-4">
              <Link href="/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Two-Factor Authentication:</strong> {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
            <Button asChild className="mt-4">
              <Link href="/security">{user?.twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

