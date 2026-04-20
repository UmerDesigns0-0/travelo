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

type GetAllTripsParams = {
    limit: number;
    offset: number;
    userId?: string;
    filter?: "all" | "mine";
    sort?: "latest" | "oldest" | "all_trips" | "my_trips";
    search?: string;
};

export const getAllTrips =
    async ({ limit, offset, userId, sort, search, filter }: GetAllTripsParams) => {
        const queries: any[] = [
            Query.limit(limit),
            Query.offset(offset),
        ];

        // sort behaviour: default by createdAt desc
        if (sort === "latest") {
            queries.push(Query.orderDesc("$createdAt"));
        } else if (sort === "oldest") {
            queries.push(Query.orderAsc("$createdAt"));
        } else if (filter === "all") {
            // no sorting applied, or apply default sorting if needed
            queries.push(Query.orderDesc("$createdAt"));
        } else {
            // default sorting if no valid sort is provided
            queries.push(Query.orderDesc("$createdAt"));
        }

        if (userId) {
            queries.push(Query.equal("userId", userId));
        }

        if (search && search.length > 0) {
            queries.push(Query.search("tripDetails", search));
        }

        const response = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            queries
        )

        // if (response.total === 0) {
        //     console.error("No trips found");
        //     return { allTrips: [], total: 0 };
        // }

        return {
            allTrips: response.documents,
            total: response.total,
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