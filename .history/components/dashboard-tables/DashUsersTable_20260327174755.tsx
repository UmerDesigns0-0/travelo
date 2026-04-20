import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";
import { getUsersByTripsCreated } from "~/appwrite/dashboard";
import { useState, useEffect } from "react";

interface User {
  user?: {
    user?: string;
    url?: string;
  };
  trips?: number;
}

const DashUsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const userData = await getUsersByTripsCreated();
      setUsers(userData);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "user",
      header: "Name",
      cell: ({ getValue }) => {
        const username = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-medium text-white">
              {username.charAt(0).toUpperCase()}
            </div>
            <span>{username}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "trips",
      header: "Total Trips Created",
      cell: ({ getValue }) => {
        const trips = getValue() as number;
        return (
          <span className="px-2 text-sm font-medium text-slate-500">
            {trips || 0}
          </span>
        );
      },
    },
  ];
  const data = users?.map((item) => ({
    user: item?.user,
    trips: item?.trips,
  }));
  return (
    <div>
      <DashTableUI
        tableHeading={"Latest User Signups"}
        columns={columns}
        data={data?.slice(0, 4)}
        isLoading={isLoading ? true : false}
        loaderLength={4}
      />
    </div>
  );
};

export default DashUsersTable;
