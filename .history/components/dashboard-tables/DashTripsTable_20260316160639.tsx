import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";
import { useState, useEffect } from "react";
import { getTripsByTravelStyle } from "~/appwrite/dashboard";

type Trips = {
  travelStyle: string;
  count: number;
};

const DashTripsTable = () => {
  const [trips, setTrips] = useState<{ travelStyle: string; count: number }[]>(
    [],
  );
  const [isTripLoading, setIsTripLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTrips = async () => {
      const travelStyles = await getTripsByTravelStyle();
      setTrips(travelStyles);
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    if (!trips || trips.length > 0) {
      setIsTripLoading(true);
    }
  }, []);

  const columns: ColumnDef<Trips>[] = [
    {
      accessorKey: "travelStyle",
      header: "Travel Style",
      cell: ({ getValue }) => {
        const travelStyle = getValue() as string;
        return (
          <div className="flex items-center h-full gap-2">
            <div className="h-8 w-8 rounded-full bg-green-300 flex items-center justify-center text-sm font-medium text-white">
              {}
            </div>
            <span>{travelStyle}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "count",
      header: "No. of Trips",
    },
  ];
  const data = trips?.map((item) => ({
    travelStyle: item?.travelStyle,
    count: item?.count,
  }));
  return (
    <div>
      <DashTableUI
        tableHeading="Trips Based on Interests"
        columns={columns}
        data={data?.slice(0, 4)}
        isLoading={isTripLoading ? true : false}
        loaderLength={4}
      />
    </div>
  );
};

export default DashTripsTable;
