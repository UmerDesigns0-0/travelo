import { Header, StatsCard, TripCard } from "components/index";
import { useState, useEffect } from "react";

import { getUser } from "~/appwrite/auth";

import { Chart, ComboChart } from "components/index";
import { DashTripsTable, DashUsersTable } from "components/dashboard-tables";
import type { Route } from "./+types/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/myutils";
import {
  getTripsByTravelStyle,
  getTripsCreatedPerDay,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from "~/appwrite/dashboard";


import { account } from "~/appwrite/client";
import { redirect } from "react-router";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoaders() {
  try {
    const user = await account.get();
    // if (user.$id) {
    //   await storeUserData();
    // }
    if (!user.$id) {
      return redirect("/sign-in");
    }
    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status !== "admin") {
      return redirect("/trips");
    }
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error fetching user data:", error);
    return redirect("/sign-in");
  }
}

export const clientLoader = async () => {
  const [user, trips, dashboardStats] = await Promise.all([
    getUser(),
    getAllTrips({ limit: 4, offset: 0, sort: "latest" }),
    getUsersAndTripsStats(),
  ]);
  const allTrips = trips.allTrips?.map(({ $id, tripDetails, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetails),
    imageUrls: imageUrls ?? [],
  }));
  return {
    user,
    allTrips,
    dashboardStats,
  };
};

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  // const { totalUsers, totalTrips, usersJoined, tripsCreated, userRole } =
  //   dashboardStats;

  const [userGrowth, setUserGrowth] = useState<
    { name: string; value: number }[]
  >([]);
  const [tripGrowth, setTripGrowth] = useState<
    { name: string; value: number }[]
  >([]);

  const [chartLoading, setChartLoading] = useState<boolean>(true);
  const [comboChartLoading, setComboChartLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChartsData = async () => {
      const [users, trips] = await Promise.all([
        getUserGrowthPerDay(),
        getTripsByTravelStyle(),
      ]);

      setComboChartLoading(true);
      setChartLoading(true);

      setUserGrowth(
        users.map((item) => ({
          name: item.day,
          value: item.count,
        })),
      );
      setComboChartLoading(false);

      setTripGrowth(
        trips.map((item) => ({
          name: item.travelStyle,
          value: item.count,
        })),
      );
      setChartLoading(false);
    };
    fetchChartsData();
  }, [chartLoading, comboChartLoading]);

  const user = loaderData.user as User | null;
  const allTrips = loaderData.allTrips as Trip[];
  const dashboardStats = loaderData.dashboardStats as DashboardStats;

  const [tripLoading, setTripLoading] = useState<boolean>(true);

  useEffect(() => {
    setTripLoading(true);
    if (allTrips && allTrips.length >= 0) {
      setTripLoading(false);
    }
  }, [tripLoading]);


  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name || "User"}!`}
        description="Track activity, trends and popular destinations in real time"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.usersJoined.currentMonth}
            lastMonthCount={dashboardStats.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>

      <section className="container">
        <h2 className="text-xl font-semibold">Trips Created</h2>
        <div className="trip-grid">
          {tripLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <TripCard key={i} isLoading />
              ))
            : allTrips
                .slice(0, 4)
                .map(
                  ({
                    id,
                    name,
                    imageUrls,
                    itinerary,
                    interests,
                    travelStyle,
                    estimatedPrice,
                  }: Trip) => (
                    <TripCard
                      id={id}
                      key={id}
                      name={name}
                      imageUrl={imageUrls[0]}
                      tags={[interests, travelStyle]}
                      location={itinerary[0]?.location ?? ""}
                      price={estimatedPrice}
                      isLoading={tripLoading ? true : false}
                    />
                  ),
                )}
        </div>
        {!tripLoading || allTrips.length === 0 && (
          <div className="w-full flex flex-col gap-4 my-8 text-center text-muted-foreground">
            <h2>No Trips Found</h2>
            <h2 className="font-medium animate-bounce">
              Be the first one to create a trip.
            </h2>
          </div>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">User Activity</h2>
        <div className="flex flex-col md:flex-row gap-20 md:gap-6.5 items-center mb-6">
          <div className="h-60 w-full md:w-1/2">
            <ComboChart
              chartHeading="User Growth"
              data={userGrowth.slice(-6)}
              tooltipValue="User"
              className="h-54 w-full"
              isLoading={comboChartLoading ? true : false}
            />
          </div>

          <div className="h-60 w-full md:w-1/2">
            <Chart
              chartHeading="Trip Trends"
              data={tripGrowth.slice(-6)}
              tooltipValue="Trip"
              className="h-54 w-full"
              isLoading={chartLoading ? true : false}
            />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-12 mb-4">Tables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DashUsersTable />
          </div>
          <div>
            <DashTripsTable />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
