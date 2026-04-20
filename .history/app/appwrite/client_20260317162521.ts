import { Client, Account, Databases, Storage } from "appwrite";

export const appwriteConfig = {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    apiKey: import.meta.env.VITE_APPWRITE_API_KEY,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    tripCollectionId: import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID,
};

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

// Session-aware client for server loaders
export const getSessionClient = (request: Request) => {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const sessionKey = `a_session_${appwriteConfig.projectId.toLowerCase()}`;

    const match = cookieHeader
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith(`${sessionKey}=`));

    const sessionValue = match?.split("=")?.[1];

    const sessionClient = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId);

    if (sessionValue) sessionClient.setSession(sessionValue);

    return {
        account: new Account(sessionClient),
        database: new Databases(sessionClient),
    };
};

// Admin client for server-side queries with API key
export const getAdminClient = () => {
    const adminClient = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setKey(appwriteConfig.apiKey);

    return {
        account: new Account(adminClient),
        database: new Databases(adminClient),
    };
};

export { client, account, database, storage };