import { Header } from "components/index";
import React, { act, useMemo, useState, type SetStateAction } from "react";

import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnSort,
  FilterFn,
} from "@tanstack/react-table";

import type { Route } from "./+types/all-users";
import { getAllUsers } from "~/appwrite/auth";
import { cn } from "~/lib/myutils";
import { formatDate } from "~/lib/myutils";
import { useScreen } from "~/lib/myutils";

export const loader = async () => {
  const { users, total } = await getAllUsers(100, 0);

  return { users, total };
};

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const screenWidth = useScreen();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filterRole = (value: string | null) => {
    setColumnFilters((prev) => {
      const withoutRoleFilter = prev.filter((f) => f.id !== "status");
      if (!value) return withoutRoleFilter;
      return [...withoutRoleFilter, { id: "status", value }];
    });
    // setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const columns = useMemo<ColumnDef<any>[]>(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth < 1024;

    const currentStatus =
      columnFilters.find((f) => f.id === "status")?.value ?? null;

    return [
      {
        header: "Name",
        accessorKey: "name",
        size: isMobile ? 160 : isTablet ? 130 : 100,
        minSize: 100,
        maxSize: isMobile ? 200 : isTablet ? 160 : 150,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.imageUrl}
              alt={`${row.original.name} profile`}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span>{row.original.name}</span>
          </div>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        size: isMobile ? 220 : isTablet ? 180 : 120,
        minSize: 100,
        maxSize: isMobile ? 280 : isTablet ? 240 : 200,
      },
      {
        header: "Joined At",
        accessorKey: "$createdAt",
        size: isMobile ? 140 : isTablet ? 100 : 100,
        minSize: 80,
        maxSize: isMobile ? 200 : isTablet ? 180 : 150,
        cell: ({ getValue }) => {
          const date = new Date(getValue<string>());
          return <div>{formatDate(date.toISOString())}</div>;
        },
      },
      {
        header: () => (
          <Menu as="div" className="relative w-full">
            <MenuButton
              onClick={(e) => e.stopPropagation()}
              className="w-full inline-flex outline-none items-center gap-2 text-xs uppercase cursor-pointer"
            >
              {({ open }) => (
                <div className="flex items-center gap-1.5">
                  <span>Status</span> <span>{open ? "⏶" : "⏷"}</span>
                </div>
              )}
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="absolute z-50 w-30 origin-top-right rounded-xl bg-slate-400/80 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <MenuItem>
                {({ active }) => {
                  const selected = currentStatus === null;
                  return (
                    <button
                      className={cn(
                        "w-full px-3 py-2 mb-1 text-left text-sm rounded-xl cursor-pointer",
                        selected && "bg-white text-slate-600",
                        active && "bg-white text-slate-600",
                      )}
                      onClick={() => filterRole(null)}
                    >
                      All
                    </button>
                  );
                }}
              </MenuItem>
              <MenuItem>
                {({ active }) => {
                  const selected = currentStatus === "admin";
                  return (
                    <button
                      className={cn(
                        "w-full px-3 py-2 mb-1 text-left text-sm rounded-xl hover:bg-white hover:text-slate-700 cursor-pointer",
                        selected && "bg-white text-slate-600",
                        active && "bg-white text-slate-600",
                      )}
                      onClick={() => filterRole("admin")}
                    >
                      Admin
                    </button>
                  );
                }}
              </MenuItem>
              <MenuItem>
                {({ active }) => {
                  const selected = currentStatus === "user";
                  return (
                    <button
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm rounded-xl hover:bg-white hover:text-slate-700 cursor-pointer",
                        selected && "bg-slate-100 text-slate-600",
                        active && "bg-white text-slate-600",
                      )}
                      onClick={() => filterRole("user")}
                    >
                      User
                    </button>
                  );
                }}
              </MenuItem>
            </MenuItems>
          </Menu>
        ),
        accessorKey: "status",
        size: isMobile ? 100 : isTablet ? 80 : 70,
        minSize: 70,
        maxSize: isMobile ? 120 : isTablet ? 100 : 80,
        enableSorting: false,
        cell: ({ getValue }) => (
          <span
            className={cn(
              "px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize",
              getValue<string>() === "admin"
                ? "bg-green-100 text-green-800"
                : "bg-slate-200 text-slate-700",
            )}
          >
            {getValue<string>()}
          </span>
        ),
      },
    ];
  }, [screenWidth, columnFilters]);

  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filtering, setFiltering] = React.useState("");

  const table = useReactTable({
    data: loaderData.users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    defaultColumn: {
      minSize: 50,
      size: 150,
      maxSize: 600,
    },
    state: { sorting, pagination, columnFilters, globalFilter: filtering },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setFiltering,
  });
  const isPrevDisabled: boolean = !table.getCanPreviousPage();
  const isNextDisabled: boolean = !table.getCanNextPage();
  // const isDisabled: boolean = isPrevDisabled && isNextDisabled;
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort & access detailed user profiles"
      />
      <div className="w-full mb-6">
        <form className="max-w-md mb-4">
          <label
            htmlFor="search"
            className="block mb-2.5 text-sm font-medium text-heading sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center text-slate-500 ps-3 pointer-events-none">
              <IoIosSearch size={18} />
            </div>
            <input
              type="search"
              id="search"
              className="block w-full outline-none p-3 ps-9 border border-slate-300 text-heading text-sm rounded-md focus:ring-2 focus:ring-slate-300 shadow-xs placeholder:text-body"
              placeholder="Search"
              onChange={(event) => setFiltering(event.target.value)}
              required
            />
            {/* <button
              type="button"
              className="absolute end-1.5 bottom-1.5 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 box-border border border-transparent  focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
            >
              Search
            </button> */}
          </div>
        </form>

        <div className="rounded-md overflow-x-auto border border-slate-200">
          <table className="w-full relative table-fixed divide-y border border-slate-200 divide-slate-200">
            <thead className="bg-slate-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header?.getSize() }}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-300 transition-colors select-none"
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        <span className="text-xs font-medium">
                          {header.column.id === "status"
                            ? ""
                            : header.column.getIsSorted() === "asc"
                              ? "↑"
                              : header.column.getIsSorted() === "desc"
                                ? "↓"
                                : "⇅"}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={cn(
                    "hover:bg-slate-50",
                    idx % 2 === 0 ? "bg-white" : "bg-slate-100",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="px-6 py-4 truncate overflow-hidden text-sm text-slate-600"
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
            {/* <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
          </table>
        </div>
        <div className=" m-4 flex justify-between items-center">
          <div>
            <button
              className={cn(
                "p-2 rounded-md mr-2 transition outline-none",
                isPrevDisabled
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-300/80 cursor-pointer",
              )}
              onClick={() => table.firstPage()}
              disabled={isPrevDisabled}
            >
              <MdOutlineKeyboardDoubleArrowLeft size={20} />
            </button>
            <button
              className={cn(
                "p-2 rounded-md mr-2 transition outline-none",
                isPrevDisabled
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-300/80 cursor-pointer",
              )}
              onClick={() => table.previousPage()}
              disabled={isPrevDisabled}
            >
              <MdKeyboardArrowLeft size={20} />
            </button>
            <button
              className={cn(
                "p-2 rounded-md mr-2 transition outline-none",
                isNextDisabled
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-300/80 cursor-pointer",
              )}
              onClick={() => table.nextPage()}
              disabled={isNextDisabled}
            >
              <MdKeyboardArrowRight size={20} />
            </button>
            <button
              className={cn(
                "p-2 rounded-md mr-2 transition outline-none",
                isNextDisabled
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-300/80 cursor-pointer",
              )}
              onClick={() => table.lastPage()}
              disabled={isNextDisabled}
            >
              <MdOutlineKeyboardDoubleArrowRight size={20} />
            </button>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
        </div>
      </div>
    </main>
  );
};

export default AllUsers;
