import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";
import { useState, useEffect } from "react";
import { getTripsByInterests } from "~/appwrite/dashboard";
import { Link } from "react-router";

type Trips = {
  trip?: {
    name?: string;
    url?: string;
  };
  interests?: string;
  id?: string;
};

const DashTripsTable = () => {
  const [trips, setTrips] = useState<Trips[]>([]);
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
      cell: ({ getValue, row }) => {
        const trip = getValue() as { name?: string; url?: string };
        const tripId = row.original.id;
        return (
          <Link to={`/trips/${tripId}`} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full truncate bg-green-300 flex items-center justify-center text-sm font-medium text-white">
              {trip?.url && (trip?.url !== null || trip?.url !== undefined) &&
                <img
                  className="h-8 w-8 rounded-full hover:scale-110 transition duration-300 ease-in-out"
                  src={trip?.url}
                  alt=""
                />
              }
            </div>
            <span
              title={trip?.name}
              className="w-30 lg:w-50 line-clamp-1 hover:underline"
            >
              {trip?.name}
            </span>
          </Link>
        );
      },
    },
    {
      accessorKey: "interests",
      header: "Interests",
      cell: ({ getValue }) => {
        const interest = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <span title={interest} className="line-clamp-1">
              {interest}
            </span>
          </div>
        );
      },
    },
  ];
  const data = trips?.map((item) => ({
    trip: item?.trip,
    interests: item?.interests,
    id: item?.id,
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
