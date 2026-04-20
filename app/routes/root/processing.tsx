import { account } from "~/appwrite/client";
import { storeUserData, getExistingUser } from "~/appwrite/auth";
import { redirect } from "react-router";

export async function clientLoader() {
  try {
    console.log("Auth processing started...");
    
    // Add a small delay to ensure session is established
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let user;
    let retries = 3;
    
    // Retry logic for getting user session
    while (retries > 0) {
      try {
        user = await account.get();
        if (user.$id) break;
      } catch (error: any) {
        console.log(`Retry ${4 - retries}: User not found, retrying...`);
        retries--;
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw error;
        }
      }
    }
    
    if (!user || !user.$id) {
      console.log("No user ID after retries, redirecting to sign-in");
      return redirect("/sign-in?error=session_failed");
    }

    console.log("User authenticated:", user.email);

    // Store user data in database
    console.log("Attempting to store user data...");
    await storeUserData();

    // Check user role and redirect
    const existingUser = await getExistingUser(user.$id);
    console.log("Existing user status:", existingUser?.status);
    
    if (existingUser?.status === "admin") {
      console.log("Admin user, redirecting to dashboard");
      return redirect("/dashboard");
    } else if (existingUser?.status === "user") {
      console.log("Regular user, redirecting to trips");
      return redirect("/trips");
    }

    console.log("No existing user found, redirecting to trips");
    return redirect("/sign-in");
  } catch (error: any) {
    console.error("Error in auth processing:", error);
    console.error("Error code:", error.code);
    console.error("Error type:", error.type);
    return redirect("/sign-in?error=auth_failed");
  }
}

const AuthProcessing = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg text-slate-600">Setting up your account...</p>
        <p className="text-sm text-slate-400 mt-2">This may take a few seconds...</p>
      </div>
    </div>
  );
};

export default AuthProcessing;