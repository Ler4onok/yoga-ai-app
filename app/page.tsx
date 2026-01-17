"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/nextjs";

const Home = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to Yoga AI</h1>
      <p className="text-lg mb-4">
        Auth Status: {isLoading ? "Loading..." : isAuthenticated ? "Logged In" : "Not Logged In"}
      </p>
      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal">
          <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default Home;
