import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";
import { useState, useEffect } from "react";
import { getTripsByTravelStyle } from "~/appwrite/dashboard";

interface Trips {
  trip_name: string;
  travelStyle: string;
}

const DashTripsTable = () => {
  const [trips, setTrips] = useState<{ travelStyle: string; count: number }[]>(
    [],
  );

  useEffect(() => {
    const fetchTrips = async () => {
      const travelStyles = await getTripsByTravelStyle();
      setTrips(
        travelStyles.map((item) => ({
          travelStyle: item.trvaelStyle,
          count: item.count,
        })),
      );
    };

    fetchTrips();
  }, []);

  const columns: ColumnDef<Trips>[] = [
    {
      accessorKey: "trip_name",
      header: "Trip Name",
      cell: ({ getValue }) => {
        const travelStyle = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-300 flex items-center justify-center text-sm font-medium text-white">
              {}
            </div>
            <span>{trips.find((item) => item.travelStyle === travelStyle)?.count}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "travelStyle",
      header: "Travel Style",
    },
  ];
  const data: Trips[] = [
    { trip_name: "Beach Getaway", travelStyle: "Relaxation" },
    { trip_name: "Mountain Adventure", travelStyle: "Adventure" },
    { trip_name: "City Exploration", travelStyle: "Cultural" },
    { trip_name: "Cruise Vacation", travelStyle: "Luxury" },
    { trip_name: "Safari Expedition", travelStyle: "Wildlife" },
  ];
  return (
    <div>
      <DashTableUI
        tableHeading="Trips Based on Interests"
        columns={columns}
        data={data.slice(0, 4)}
      />
    </div>
  );
};

export default DashTripsTable;
