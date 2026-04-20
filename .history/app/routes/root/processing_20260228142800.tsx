// app/routes/auth/processing.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { account } from "~/appwrite/client";
import { storeUserData, getExistingUser } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) {
      return { redirect: "/sign-in" };
    }

    // Store user data in database
    await storeUserData();

    // Check user role and redirect
    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === "admin") {
      return { redirect: "/dashboard" };
    } else if (existingUser) {
      return { redirect: "/trips" };
    }

    return { redirect: "/trips" }; // Default redirect
  } catch (error) {
    console.error("Error in auth processing:", error);
    return { redirect: "/sign-in" };
  }
}

const AuthProcessing = ({ loaderData }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loaderData?.redirect) {
      navigate(loaderData.redirect);
    }
  }, [loaderData, navigate]);

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