import { Query } from "appwrite";
import { database, appwriteConfig } from "./client";

// export const getAllTrips = async (limit: number, offset: number, userId?: string, $createdAt?: string) => {
//     const allTrips = await database.listDocuments(
//         appwriteConfig.databaseId,
//         appwriteConfig.tripCollectionId,
//         [Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt"), ...(userId ? [Query.equal("userId", userId)] : []), ...($createdAt ? [Query.orderAsc("$createdAt")] : [])]
//     );

//     if (allTrips.total === 0) {
//         console.error("No trips found");
//         return { allTrips: [], total: 0 };
//     }

//     return {
//         allTrips: allTrips.documents,
//         total: allTrips.total,
//         createdAt: allTrips.documents[0].$createdAt,
//         userId: allTrips.documents[0].userId,
//     };
// }

export const getAllTrips = async (limit: number, offset: number, userId?: string, sort?: "asc" | "desc" = "desc") => {
    const queries = [Query.limit(limit), Query.offset(offset)];

    if (userId) {
        queries.push(Query.equal("userId", userId));
    }

    if (sort === "asc") {
        queries.push(Query.orderAsc("$createdAt"));
    } else {
        queries.push(Query.orderDesc("$createdAt"));
    }

    const allTrips = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId,
        queries
    )
    

    if (allTrips.total === 0) {
        console.error("No trips found");
        return { allTrips: [], total: 0 };
    }

    return {
        allTrips: allTrips.documents,
        total: allTrips.total,
        createdAt: allTrips.documents[0].$createdAt,
        userId: allTrips.documents[0].userId,
    };
}

export const getTripById = async (tripId: string) => {
    const trip = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId,
        tripId
    );

    if (!trip) {
        console.error("No trip found");
        return null;
    }

    return trip
}