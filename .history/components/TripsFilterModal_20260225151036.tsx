import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

const TripsFilterModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div>
        <h3>Filter</h3>
      </div>
    </div>
  );
};

export default TripsFilterModal;
