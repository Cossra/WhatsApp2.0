
'use client'


import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { use, useCallback, useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

// Wrapper to sync Clerk user to Convex and handle loading/error states
function UserSyncWrapper({ children }: { children: React.ReactNode }) {
  // Get Clerk user and loading state
  const { user, isLoaded: isUserLoaded } = useUser();
  // Local loading and error state for sync process
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Convex mutation to create or update user
  const createOrUpdateUser = useMutation(api.users.upsertUser);

  // Function to sync Clerk user to Convex
  const syncUser = useCallback(async () => {
    if (!user?.id) return; 
    try {
      setIsLoading(true); 
      setError(null); 

      

      // Call Convex mutation to save user data
      await createOrUpdateUser({
        UserId: user.id,
        name: user.fullName || "No Name",
        email: user.emailAddresses[0]?.emailAddress || "No Email",
        imageUrl: user.imageUrl || "",
        profileImageUrl: user.imageUrl || "",
      });
    } catch (err) {
      // Handle errors and show message
      console.error("Error syncing user:", err);
      setError("Failed to sync user data. Please try again later.");
    } finally {
      setIsLoading(false); 
    }


  }, [user, createOrUpdateUser]);

  // Automatically sync user to Convex when user or mutation changes
  useEffect(() => {
    if (isUserLoaded && user) {
      syncUser(); // Trigger sync when user is loaded
    }
  }, [isUserLoaded, user, syncUser]);

  // Show spinner while loading or syncing user
  if (!isUserLoaded || isLoading) {
    return (
      <LoadingSpinner 
        message={!isUserLoaded ? "Loading user..." : "Syncing user..."}
        className="mt-20"
      />
    );
  }

  // Show error UI if sync fails
  if (error) {
    return (
      <div className="backdrop-blur-md bg-white/60 border-2 border-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-gray-900 px-6 py-5 rounded-xl max-w-md mx-auto mt-8 shadow-xl flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-pink-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1-7h-2v5h2V10z" fill="currentColor"/></svg>
          <span className="font-semibold text-lg">Oops! Something went wrong</span>
        </div>
        <span className="text-base text-center mb-2">{error}</span>
        <div className="mt-1 text-sm text-gray-700 text-center">
          If this issue persists, please contact <span className="font-medium text-purple-600">customer support</span>.
        </div>
      </div>
    );
  }

  // Render children if user is loaded and synced
  return <>{children}</>;
}

export default UserSyncWrapper