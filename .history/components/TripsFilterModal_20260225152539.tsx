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
        className="absolute z-50 right-10 bottom-1/3 translate-y-1/2"
      >
        <div className="inset-0 flex w-fit items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default TripsFilterModal;
