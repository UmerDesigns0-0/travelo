import { Transition } from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";
import { useLoaderData } from "react-router";

import { sidebarItems } from "~/constants";
import { NavLink } from "react-router";

import { cn } from "~/lib/myutils";

import { useRouteLoaderData } from "react-router";

type Props = {
  isDesktopOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

interface NavProps {
  id: number;
  Icon: React.ElementType;
  label: string;
  href: string;
}

const ClosedMenu = ({ isDesktopOpen, setIsOpen }: Props) => {
  const user = useLoaderData();

  const data = useRouteLoaderData("routes/admin/admin-layout"); 
  const isAdmin = data?.isAdmin;
  return (
    <div className="flex flex-col items-center relative">
      <Transition
        appear
        show={true}
        enter="transition-all ease-out duration-300 delay-400"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-[1.1]"
        leave="transition-all ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <button
          onClick={() => isDesktopOpen?.(true)}
          aria-label="Open menu"
          className="p-2 absolute top-6 rounded-lg bg-blue-500 hover:scale-110 cursor-pointer text-white font-medium shadow-sm transition duration-300 focus:outline-none"
        >
          <IoMdMenu size={26} />
        </button>
      </Transition>
      <Transition
        appear
        show={true}
        enter="transition-all ease-out duration-300 delay-400"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-[1.1]"
        leave="transition-all ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <div className="fixed top-16">
          <div className="flex flex-col gap-2 items-center">
            <nav className="py-4">
              {sidebarItems(isAdmin).map(({ href, Icon, id } : NavProps) => (
                <NavLink to={href} key={id} onClick={() => setIsOpen?.(false)}>
                  {({ isActive }: { isActive: boolean }) => (
                    <div
                      className={cn(
                        "group flex items-center select-none text-sm font-medium text-slate-600 cursor-pointer gap-4 my-4 link rounded-md px-2 py-2 transition-colors",
                        isActive
                          ? "bg-primary-100 hover:bg-primary-100/90 text-white"
                          : "bg-slate-200 hover:bg-slate-100",
                      )}
                    >
                      <span className="group-hover:scale-110 transition duration-300 ease-in-out">
                        <Icon size={20} />
                      </span>
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </Transition>
      <Transition
        appear
        show={true}
        enter="transition-all ease-out duration-300 delay-400"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-[1.1]"
        leave="transition-all ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <div className="fixed bottom-8 cursor-pointer hover:scale-110 transition duration-300 ease-in-out">
          <img
            onClick={() => isDesktopOpen?.(true)}
            src={user?.imageUrl}
            alt={user?.name}
            referrerPolicy="no-referrer"
            className="size-10 rounded-full"
          />
        </div>
      </Transition>
    </div>
  );
};

export default ClosedMenu;
