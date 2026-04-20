import type { ColumnDef } from "@tanstack/react-table";
import { DashTableUI } from "./index";

interface User {
  username: string;
  trip_created: number;
}

const DashUsersTable = () => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "Name",
    },
    {
      accessorKey: "trip_created",
      header: "Total Trips Created",
    },
  ];
  const data : User[] = [
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
      <DashTableUI columns={columns} data={data.slice(0, 4)} />
    </div>
  );
};

export default DashUsersTable;
