import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";
import { useState, useEffect } from "react";
import { getTripsByInterests } from "~/appwrite/dashboard";

type Trips = {
  trip?: {
    name?: string;
    url?: string;
  }
  interests?: string;
};

const DashTripsTable = () => {
  const [trips, setTrips] = useState<Trips[]>(
    [],
  );
  const [isTripLoading, setIsTripLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsTripLoading(true); // start loading
      const travelStyles = await getTripsByInterests();
      setTrips(travelStyles);
      setIsTripLoading(false); // done loading
    };

    fetchTrips();
  }, []);

  const columns: ColumnDef<Trips>[] = [
    {
      accessorKey: "trip",
      header: "Trip",
      cell: ({ getValue }) => {
        const trip = getValue() as {name?: string , url?: string}
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full truncate bg-green-300 flex items-center justify-center text-sm font-medium text-white">
              <img src={trip?.url} alt="" />
            </div>
            <span>{trip?.name}</span>
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
    trip: item?.trip,
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
