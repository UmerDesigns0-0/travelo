import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

type DashTableUIProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
};

const DashTableUI = <T extends Record<string, any>>({
  columns,
  data,
}: DashTableUIProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      
    </div>
  )
}

export default DashTableUI
