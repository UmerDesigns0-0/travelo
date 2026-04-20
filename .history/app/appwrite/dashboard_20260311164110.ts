import { database, appwriteConfig } from "~/appwrite/client";

interface Document {
    [key: string]: any;
}

type filterByDate = (
    items: Document[],
    key: string,
    start: string,
    end?: string) => number;



export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
    const d = new Date();

    const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
    const startPrev = new Date(d.getFullYear(), d.getMonth() - 1, 1).toISOString();
    const endCurrent = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

    const [users, trips] = await Promise.all([
        database.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId),
        database.listDocuments(appwriteConfig.databaseId, appwriteConfig.tripCollectionId),
    ]);

    const filterByDate: filterByDate = (items, key, start, end) => {
        return items.filter(item => item[key] >= start && (!end || item[key] <= end)).length;
    };

    const filterUsersByRole = (role: string) => {
        return users.documents.filter((u: Document) => u.status === role)
    }

    return {
        totalUsers: users.total,
        usersJoined: {
            currentMonth: filterByDate(users.documents, "$createdAt", startCurrent, undefined),
            lastMonth: filterByDate(users.documents, "$createdAt", startPrev, endCurrent),
        },
        userRole: {
            total: filterUsersByRole("user").length,
            currentMonth: filterByDate(filterUsersByRole("user"), "$createdAt", startCurrent, undefined),
            lastMonth: filterByDate(filterUsersByRole("user"), "$createdAt", startPrev, endCurrent),
        },
        totalTrips: trips.total,
        tripsCreated: {
            currentMonth: filterByDate(trips.documents, "$createdAt", startCurrent, undefined),
            lastMonth: filterByDate(trips.documents, "$createdAt", startPrev, endCurrent),
        },
    }

}

export const getUserGrowthPerDay = async () => {
    const users = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId
    )

    const userGrowth = users.documents.reduce((acc: { [key: string]: number }, user: Document) => {
        const date = new Date(user.$createdAt);
        const day = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit"
        })
        acc[day] = (acc[day] || 0) + 1;
        return acc
    }, {});
    return Object.entries(userGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
}

export const getTripsCreatedPerDay = async () => {
    const trips = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId
    )
    const tripGrowth = trips.documents.reduce((acc: { [key: string]: number }, trip: Document) => {
        const date = new Date(trip.$createdAt);
        const day = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit"
        })
        acc[day] = (acc[day] || 0) + 1
        return acc
    }, {})
    return Object.entries(tripGrowth).map(([day, count]) => ({
        count: Number(count),
        day
    }));
}