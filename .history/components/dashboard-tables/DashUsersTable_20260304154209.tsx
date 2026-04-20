import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";
import { getAllUsers } from "~/appwrite/auth";

interface User {
  username: string;
  trip_created: number;
}

const DashUsersTable = () => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "Name",
      cell: ({ getValue }) => {
        const username = getValue() as string;
        return (
          <div className="flex items-center gap-2 text-center">
            <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-medium text-white">
              {username.charAt(0).toUpperCase()}
            </div>
            <span>{username}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "trip_created",
      header: "Total Trips Created",
      cell: ({ getValue }) => {
        const trips = getValue() as number;
        return (
          <span className="px-2 py-1 text-sm font-medium text-slate-500">
            {trips}
          </span>
        );
      }
    },
  ];
  const data: User[] = [
    {
      username: "John Doe",
      trip_created: Math.floor(Math.random() * 10),
    },
    {
      username: "Jane Smith",
      trip_created: Math.floor(Math.random() * 10),
    },
    {
      username: "Alice Johnson",
      trip_created: Math.floor(Math.random() * 10),
    },
    {
      username: "Bob Brown",
      trip_created: Math.floor(Math.random() * 10),
    },
    {
      username: "Charlie Davis",
      trip_created: Math.floor(Math.random() * 10),
    },
  ];
  return (
    <div>
      <DashTableUI
        tableHeading={"Latest User Signups"}
        columns={columns}
        data={data.slice(0, 4)}
      />
    </div>
  );
};

export default DashUsersTable;
