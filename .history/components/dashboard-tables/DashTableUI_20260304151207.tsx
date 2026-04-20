import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "~/lib/myutils";

type DashTableUIProps<T> = {
  TableHeading?: string;
  columns: ColumnDef<T>[];
  data: T[];
};

const DashTableUI = <T extends Record<string, any>>({
  TableHeading,
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
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{TableHeading || ""}</h3>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={cn("border-b border-gray-200 hover:bg-gray-50 py-4", row.index % 2 === 0 ? "bg-gray-50" : "bg-white")}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id} className="px-4 py-2 text-sm text-gray-600">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashTableUI;
