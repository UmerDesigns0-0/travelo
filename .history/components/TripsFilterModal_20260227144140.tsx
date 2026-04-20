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
        className="absolute outline-none z-50 top-16 right-0 md:top-2 lg:top-0 md:right-6 lg:right-10 translate-y-1/2"
      >
        <div className="fixed inset-0" aria-hidden="true" onClick={() => setIsOpen(false)} />
        <div className="inset-0 flex w-fit items-center justify-center p-4">
          <DialogPanel className=" bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <DialogTitle className="font-bold text-dark-200 text-lg">
              Filter Options
            </DialogTitle>

            <Description className="text-sm text-slate-500">
              Choose how you want to sort or filter the results.
            </Description>

            {/* Sort Options */}
            <div className="radio-input text-sm">
              <p className="font-medium text-sm mb-1.5!">Sort Order</p>

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

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-5 border-t">
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
