// app/routes/auth/processing.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { account } from "~/appwrite/client";
import { storeUserData, getExistingUser } from "~/appwrite/auth";
import { redirect } from "react-router";

export async function clientLoader() {
  try {
    console.log("Auth processing started...");
    
    const user = await account.get();
    console.log("User from account:", user);
    
    if (!user.$id) {
      console.log("No user ID, redirecting to sign-in");
      return redirect("/sign-in");
    }

    // Store user data in database
    console.log("Attempting to store user data...");
    await storeUserData();

    // Check user role and redirect
    const existingUser = await getExistingUser(user.$id);
    console.log("Existing user:", existingUser);
    
    if (existingUser?.status === "admin") {
      console.log("Admin user, redirecting to dashboard");
      return redirect("/dashboard");
    } else if (existingUser) {
      console.log("Regular user, redirecting to trips");
      return redirect("/trips");
    }

    console.log("No existing user found, redirecting to trips");
    return redirect("/trips");
  } catch (error) {
    console.error("Error in auth processing:", error);
    return redirect("/sign-in");
  }
}

const AuthProcessing = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg text-slate-600">Setting up your account...</p>
      </div>
    </div>
  );
};

export default AuthProcessing;