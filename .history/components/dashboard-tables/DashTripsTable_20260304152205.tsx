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
      <DashTableUI tableHeading="Trips Based On Intersets" columns={columns} data={data.slice(0, 4)} />
    </div>
  );
};

export default DashTripsTable;
