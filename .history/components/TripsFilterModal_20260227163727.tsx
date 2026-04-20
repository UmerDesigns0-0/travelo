import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { IoFilter } from "react-icons/io5";

const TripsFilterModal = () => {
  const sortOptions = [
    { label: "My Trips", value: "my_trips" },
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className="cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-xl p-2">
            <IoFilter size={26} color="#989ea6" />
          </PopoverButton>

          <PopoverPanel
            anchor="bottom end"
            className="absolute z-50 mt-2 w-64 md:w-68 space-y-3 border bg-white p-8 backdrop-filter backdrop-blur-sm rounded-lg shadow-lg"
          >
            <h3 className="font-bold text-dark-200 text-lg">
              Filter Options
            </h3>

            <p className="text-sm text-slate-500">
              Choose how you want to sort or filter the results.
            </p>

            {/* Sort Options */}
            <div className="radio-input text-sm">
              <p className="font-medium text-sm mb-0.5!">Sort Order</p>

              <label className="label">
                <input
                  type="radio"
                  name="sort"
                  value="desc"
                  className="accent-blue-500"
                />
                My Trips
              </label>

              <label className="label">
                <input
                  type="radio"
                  name="sort"
                  value="asc"
                  className="accent-blue-500"
                />
                Ascending
              </label>

              <label className="label">
                <input
                  type="radio"
                  name="sort"
                  value="desc"
                  className="accent-blue-500"
                />
                Descending
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-5 border-t">
              <button
                onClick={() => close()}
                className="px-4 py-2 cursor-pointer text-sm border rounded-md hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={() => close()}
                className="px-4 py-2 cursor-pointer text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default TripsFilterModal;