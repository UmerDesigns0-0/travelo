import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";
import { useState, useEffect } from "react";
import { getTripsByTravelStyle } from "~/appwrite/dashboard";
import type { interests } from "~/constants";

type Trips = {
  travelStyle?: string;
  interests?: string;
};

const DashTripsTable = () => {
  const [trips, setTrips] = useState<{ travelStyle: string; interests: string }[]>(
    [],
  );
  const [isTripLoading, setIsTripLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsTripLoading(true); // start loading
      const travelStyles = await getTripsByTravelStyle();
      setTrips(travelStyles);
      setIsTripLoading(false); // done loading
    };

    fetchTrips();
  }, []);

  const columns: ColumnDef<Trips>[] = [
    {
      accessorKey: "travelStyle",
      header: "Travel Style",
      cell: ({ getValue }) => {
        const travelStyle = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 line-clamp-1 rounded-full bg-green-300 flex items-center justify-center text-sm font-medium text-white">
              {}
            </div>
            <span>{travelStyle}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "interests",
      header: "Interests",
    },
  ];
  const data = trips?.map((item) => ({
    travelStyle: item?.travelStyle,
    interests: item?.interests,
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
