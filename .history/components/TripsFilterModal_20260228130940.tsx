import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IoFilter } from "react-icons/io5";

const TripsFilterModal = () => {
  const sortOptions = [
    { label: "All Trips dfigufiugfdigudkflgjdkfj", value: "all_trips" },
    { label: "My Trips", value: "my_trips" },
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
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
            className="absolute z-50 mt-2 w-64 md:w-68 border bg-white backdrop-filter backdrop-blur-sm rounded-lg shadow-lg"
          >
            {/* Inner wrapper for padding */}
            <div className="p-8 pb-2 space-y-3">
              <h3 className="font-bold text-dark-200 text-lg">
                Filter Options
              </h3>

              <p className="text-sm text-slate-500">
                Choose how you want to sort or filter the results.
              </p>

              {/* Sort Options */}
              <div className="radio-input text-sm">
                <p className="font-medium text-sm mb-1">Sort Order</p>

                {/* Scroll ONLY here */}
                <div className="max-h-40 overflow-y-auto pr-2">
                  {sortOptions.map((option) => (
                    <label
                      key={option.value}
                      className="label flex items-center gap-2 break-all"
                    >
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        className="accent-blue-500"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer (separate so scrollbar reaches right edge) */}
            <div className="flex justify-end gap-3 p-8 pt-5 border-t">
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
