import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";

interface Trips {
  trip_name: string;
  travelStyle: string;
}

const DashTripsTable = () => {
  const columns: ColumnDef<Trips>[] = [
    {
      accessorKey: "trip_name",
      header: "Trip Name",
      cell: ({ getValue }) => {
        const username = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-300 flex items-center justify-center text-sm font-medium text-white">
              {username.charAt(0).toUpperCase()}
            </div>
            <span>{username}</span>
          </div>
        );
      }
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
      <DashTableUI tableHeading="Trips Based on Interests" columns={columns} data={data.slice(0, 4)} />
    </div>
  );
};

export default DashTripsTable;
