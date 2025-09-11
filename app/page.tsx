"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { Unauthenticated } from "convex/react";
import FeatureCard from "@/components/FeatureCard";
import CallToActionCard from "@/components/CallToActionCard";
import Footer from "@/components/Footer";
import { messageCircle, shield, zap, users, message, file } from "@/components/featureIcons";

export default function Home() {
  return (
  <div className="min-h-screen flex flex-col relative">
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-100 via-blue-50 to-pink-200 -z-10" />
  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-100 to-white opacity-80 -z-10" />
      <Header />
  <main className="flex-1 flex flex-col items-center justify-start px-4 mt-16">
        <h1 className="text-5xl sm:text-6xl font-geist-sans font-extrabold text-center mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Connect Instantly,<br />Chat Smarter
          </span>
        </h1>
        <p className="text-center mb-2 text-base sm:text-lg text-gray-700 font-geist-sans">Your gateway to seamless communication</p>
        <div className="flex justify-center w-full mt-6">
          <Button className="px-6 py-8 text-sm font-bold rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200 shadow-md max-w-xs mx-auto mb-8">
            Start Chatting for Free
          </Button>
        </div>
        <p className="text-center mb-8 text-sm sm:text-base text-gray-800 dark:text-gray-400 font-geist-sans max-w-lg mx-auto">
          A modern messaging and video conferencing platform designed for speed and clarity. Enjoy fast, crystal-clear video calls, instant messaging, and a seamless experience across all your devices.
        </p>
  <div className="flex flex-col w-full max-w-sm mx-auto">
          {/* Social proof section */}
          <div className="mt-8 w-full">
            <div className="text-xs font-medium text-gray-400 text-center mb-2 tracking-wide uppercase">Trusted by thousands of users</div>
            <div className="flex flex-row justify-center items-center gap-8 text-center">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-black">200K+</span>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Active Users</div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-black">1M+</span>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Messages Sent</div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-black">99.99%</span>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Uptime</div>
              </div>
            </div>
          </div>
        </div>
            {/* Features Section */}
            <section className="w-screen mt-16 px-4 relative left-1/2 -translate-x-1/2">
        
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-geist-sans">Everything you need to stay connected</h2>
              <p className="text-center text-base sm:text-lg text-gray-600 mb-8 font-geist-sans">
                Powerful features designed for seamless communication,<br className="hidden sm:inline" />
                collaboration, and privacy. Experience HD video calls, lightning-fast messaging, and more—all in one place.
              </p>
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
                  <FeatureCard
                    icon={messageCircle}
                    title="HD Video Calls"
                    description="Crystal-clear video for every conversation."
                  />
                  <FeatureCard
                    icon={shield}
                    title="Privacy First"
                    description="Your data stays yours, always."
                  />
                  <FeatureCard
                    icon={zap}
                    title="Lightning Fast"
                    description="No lag, no waiting—just instant connection."
                  />
                  <FeatureCard
                    icon={users}
                    title="Group Chat"
                    description="Connect with everyone, all at once."
                  />
                  <FeatureCard
                    icon={message}
                    title="Instant Messaging"
                    description="Fast, reliable messages anytime."
                  />
                  <FeatureCard
                    icon={file}
                    title="File Sharing"
                    description="Share files securely and instantly."
                  />
                </div>
              </div>
            </section>
            {/* Call to Action Card Section */}
            <div className="w-full flex justify-center mt-24 mb-24">
              <CallToActionCard
                headline="Ready to transform your conversations?"
                description="Get started for free and experience seamless communication."
                buttonText="Get Started for Free"
                features={["No credit card required", "Free forever plan", "Setup in 30 seconds"]}
              />
            </div>
      </main>
      <Footer />
    </div>
  );
}
