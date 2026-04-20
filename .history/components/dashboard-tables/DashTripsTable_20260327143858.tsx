import { useLoaderData, Await } from "react-router-dom";
import { DashTableUI } from "./index";
import { Suspense } from "react";
import type { ColumnDef } from "@tanstack/react-table";

type Trips = {
  trip?: string;
  interests?: string;
};

const DashTripsTable = () => {
  const { trips } = useLoaderData() as { trips: Promise<Trips[]> };

  const columns: ColumnDef<Trips>[] = [
    {
      accessorKey: "trip",
      header: "Travel Style",
      cell: ({ getValue }) => {
        const tripName = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-300 flex items-center justify-center text-sm font-medium text-white">
              {}
            </div>
            <span>{tripName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "interests",
      header: "Interests",
    },
  ];

  return (
    <Suspense fallback={<DashTableUI isLoading loaderLength={4} columns={columns} data={[]} tableHeading="Trips Based on Interests" />}>
      <Await resolve={trips}>
        {(resolvedTrips) => {
          const data = resolvedTrips.map((item) => ({
            trip: item.trip,
            interests: item.interests,
          }));
          return (
            <DashTableUI
              tableHeading="Trips Based on Interests"
              columns={columns}
              data={data.slice(0, 4)}
              isLoading={false} // data loaded
              loaderLength={4}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};

export default DashTripsTable;