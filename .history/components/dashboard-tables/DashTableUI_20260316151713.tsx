import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "~/lib/myutils";

type DashTableUIProps<T> = {
  tableHeading?: string;
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  loaderLength?: number;
};

const DashTableUI = <T extends Record<string, any>>({
  tableHeading,
  columns,
  data,
  isLoading = false, // default false
  loaderLength = 5,
}: DashTableUIProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Number of skeleton rows to show
  const skeletonRows = Array.from({ length: loaderLength });

  return (
    <div>
      <h3 className="text-md font-semibold mb-2">{tableHeading || ""}</h3>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full border-collapse border border-slate-200">
          <thead className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left px-4 py-4 text-sm font-medium text-slate-700"
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
            {isLoading
              ? skeletonRows.map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "border-b border-slate-200",
                      rowIndex % 2 === 0 ? "bg-slate-50" : "bg-white",
                    )}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-4 text-sm text-slate-500 h-12"
                      >
                        <div className="flex items-center gap-2 h-full">
                          <div className="w-8 h-8 rounded-full bg-slate-300 animate-pulse" />
                          <div className="flex-1 h-4 bg-slate-300 rounded animate-pulse" />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-b border-slate-200 hover:bg-slate-50",
                      row.index % 2 === 0 ? "bg-slate-50" : "bg-white",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-4 text-sm text-slate-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashTableUI;
