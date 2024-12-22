import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px] items-center">
        <CardHeader>
          <CardTitle>Welcome to <span className='font-extralight'>Auth NextJs 14.2</span></CardTitle>
          <CardDescription>Secure authentication for your enterprise</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center justify-center mb-4">
            Experience our advanced authentication system with email and Google sign-in options, plus two-factor authentication for enhanced security.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

