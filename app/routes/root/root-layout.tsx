import { Outlet, redirect } from "react-router";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function ClientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect("/sign-in");

    // Check if user data exists in database
    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status !== "admin") {
      return redirect("/trips");
    }

    // If user doesn't exist in database, store them (first login)
    if (!existingUser) {
      await storeUserData();
    }

    return existingUser || user;
  } catch (error) {
    console.log("Error in root loader:", error);
    return null;
  }
}

const RootLayout = () => {
  return <Outlet />;
};

export default RootLayout;
