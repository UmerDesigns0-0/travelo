import { ID, OAuthProvider, Query } from "appwrite";
import { account, database, appwriteConfig } from "~/appwrite/client";
import { redirect } from "react-router";


export const getExistingUser = async (id: string) => {
  try {
    // Use getDocument instead of listDocuments with $id query
    const user = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      id
    );
    return user;
  } catch (error: any) {
    // Document not found
    if (error.code === 404) {
      console.log("User not found in database");
      return null;
    }
    console.error("Error fetching user:", error);
    return null;
  }
};

const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=photos",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch Google profile picture");

        const { photos } = await response.json();
        return photos?.[0]?.url || null;
    } catch (error) {
        console.error("Error fetching Google picture:", error);
        return null;
    }
};

export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not found");

    console.log("Storing user data for:", user.$id);

    // Check if user already exists
    const existingUser = await getExistingUser(user.$id);
    if (existingUser) {
      console.log("User already exists in database");
      return existingUser;
    }

    const session = await account.getSession("current");
    const providerAccessToken = session?.providerAccessToken;

    const profilePicture = providerAccessToken
      ? await getGooglePicture(providerAccessToken)
      : null;

    console.log("Creating new user document...");

    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.$id, // Use user's auth ID as document ID
      {
        name: user.name || "Unknown User",
        email: user.email,
        imageUrl: profilePicture || "", // Empty string if no picture
        status: "admin", // Default status from your enum
        // ❌ DO NOT SET $createdAt - Appwrite sets this automatically
        // ❌ DO NOT SET $updatedAt - Appwrite sets this automatically
      }
    );

    console.log("User document created successfully:", newUser.$id);
    return newUser;
  } catch (error: any) {
    console.error("Error storing user data:", error);
    console.error("Error code:", error.code);
    console.error("Error type:", error.type);
    console.error("Error message:", error.message);
    throw error;
  }
};

// export const loginWithGoogle = async () => {
//     try {
//         account.createOAuth2Session(
//             OAuthProvider.Google,
//             `${window.location.origin}/`,
//             `${window.location.origin}/404`
//         );
//     } catch (error) {
//         console.error("Error during OAuth2 session creation:", error);
//     }
// };

export const loginWithGoogle = async () => {
  try {
    // Log to verify the URLs
    console.log("Success URL:", `${window.location.origin}/auth-processing`);
    console.log("Failure URL:", `${window.location.origin}/sign-in?error=oauth_failed`);
    
    // CRITICAL: Don't await this - it redirects the page
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/auth-processing`,
      `${window.location.origin}/sign-in?error=oauth_failed`
    );
  } catch (error) {
    console.error("Error during OAuth2 session creation:", error);
  }
};

export const logoutUser = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

export const getUser = async () => {
    try {
        const user = await account.get();
        if (!user) return redirect("/sign-in");

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal("$id", user.$id),
                Query.select(["name", "email", "imageUrl", "$createdAt", "$id", "status"]),
            ]
        );

        return documents.length > 0 ? documents[0] : redirect("/sign-in");
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const getAllUsers = async (limit: number, offset: number) => {
    try {
        const { documents: users, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.limit(limit), Query.offset(offset)]
        )

        if (total === 0) return { users: [], total };

        return { users, total };
    } catch (e) {
        console.log('Error fetching users')
        return { users: [], total: 0 }
    }
}

