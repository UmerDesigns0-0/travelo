import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoFilter } from "react-icons/io5";

import { useState } from "react";

const TripsFilterModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-xl p-2"
      >
        <IoFilter size={26} color="#989ea6" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute outline-none z-50 top-16 right-0 md:top-2 md:right-6 lg:right-10 translate-y-1/2"
      >
        <div className="inset-0 flex w-full items-center justify-center p-4">
          <DialogPanel className="w-64 md:w-68 space-y-3 border bg-white p-8 rounded-lg shadow-lg">
            <DialogTitle className="font-bold text-dark-200 text-lg">
              Filter Options
            </DialogTitle>

            <Description className="text-sm text-slate-500">
              Choose how you want to sort or filter the results.
            </Description>

            {/* Sort Options */}
            <div className="space-y-3">
              <p className="font-medium text-sm">Sort Order</p>
              <div className="flex flex-col gap-3">
                {["My Trips", "Ascending", "Descending"].map((text, index) => (
                  <label
                    key={text}
                    className="relative flex items-center gap-4 px-5 w-55 h-12.5 cursor-pointer rounded-xl transition-all duration-300
                       hover:bg-blue-950/60
                       peer-checked:bg-blue-900
                         border border-transparent
                       peer-checked:border-blue-600"
                  >
                    <input
                      type="radio"
                      name="sort"
                      className="peer appearance-none w-4.25 h-4.25 rounded-full bg-slate-500 flex items-center justify-center
                          relative transition-all duration-200
                        checked:bg-blue-600 checked:animate-pulse"
                      value={index === 0 ? "asc" : "desc"}
                    />

                    <span className="text-white text-sm font-medium">
                      {text}
                    </span>
                  </label>
                ))}
              </div>

              {/* <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="sort"
                  value="desc"
                  className="accent-blue-500"
                />
                My Trips
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="sort"
                  value="asc"
                  className="accent-blue-500"
                />
                Ascending
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="sort"
                  value="desc"
                  className="accent-blue-500"
                />
                Descending
              </label> */}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 cursor-pointer text-sm border rounded-md hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 cursor-pointer text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default TripsFilterModal;
