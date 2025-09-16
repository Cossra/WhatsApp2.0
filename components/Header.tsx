'use client'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Sign } from "crypto";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

function Header() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');


  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link 
                    href="/dashboard"
                    className="font-geist-sans text-2xl font-bold tracking-tight transition-colors duration-200"
                >
                    <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                        WhatsApp 2.0
                    </span>
                </Link>

        <div className="flex items-center gap-2">
            <Authenticated>
                {!isDashboard && (
                    <Link href="/dashboard">
                        <Button variant="secondary">
                            Dashboard
                        </Button>
                    </Link>
                )}
                <UserButton />
                </Authenticated>

                <Unauthenticated>
                    <SignInButton
                        mode="modal"
                        forceRedirectUrl={isDashboard ? undefined : '/dashboard'}
                        signUpForceRedirectUrl={isDashboard ? undefined : '/dashboard'}>
                        <Button variant={isDashboard ? 'secondary' : 'outline'}>
                            Sign In
                        </Button>
                    </SignInButton>
                </Unauthenticated>
        </div>
    </header>
  )
}

export default Header