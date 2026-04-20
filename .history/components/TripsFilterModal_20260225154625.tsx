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
        className="fixed z-50 right-10 bottom-1/2 translate-y-1/2"
      >
        <div className="mt-8 inset-0 flex w-fit items-center justify-center p-4">
          <DialogPanel className="w-80 space-y-3 border bg-white p-8 rounded-lg shadow-lg">
            <DialogTitle className="font-bold text-lg">
              Filter Options
            </DialogTitle>

            <Description className="text-sm text-gray-500">
              Choose how you want to sort or filter the results.
            </Description>

            {/* Sort Options */}
            <div className="space-y-3">
              <p className="font-medium text-sm">Sort Order</p>

              <label className="flex items-center gap-2 text-sm">
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
              </label>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Apply Filter
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default TripsFilterModal;
