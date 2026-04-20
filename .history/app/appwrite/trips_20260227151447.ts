import { Query } from "appwrite";
import { database, appwriteConfig } from "./client";

export const getAllTrips = async (limit: number, offset: number, userId?: string, $createdAt?: string) => {
    const allTrips = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt"), ...(userId ? [Query.equal("userId", userId)] : []), ...($createdAt ? [Query.greaterThan("$createdAt", $createdAt)] : [])]
    );

    if (allTrips.total === 0) {
        console.error("No trips found");
        return { allTrips: [], total: 0 };
    }

    return {
        allTrips: allTrips.documents,
        total: allTrips.total
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