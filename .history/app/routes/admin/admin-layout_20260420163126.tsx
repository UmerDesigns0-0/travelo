import { Outlet } from "react-router";
import { ClosedMenu, NavItems } from "components/index";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import { MdClose } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";

import { IoMdMenu } from "react-icons/io";
import { getUser } from "~/appwrite/auth";

import { useOnlineChecker } from "~/lib/myutils";
import { OfflineStatus } from "components/index";

export const clientLoader = async () => {
  const user = await getUser();
  const admin = user?.status === "admin";

  return {
    ...user,
    isAdmin: admin,
  };
};

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [desktopIsOpen, setDesktopIsOpen] = useState<boolean>(true);

  const sidebarBg = "bg-white";

  const isOnline = useOnlineChecker();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // Detect swipe left to close sidebar
  const sidebarHandlers = useSwipeable({
    onSwipedLeft: () => setIsOpen(false),
    trackTouch: true,
    trackMouse: true,
    delta: 50,
  });

  // Detect swipe right from left edge to open sidebar
  const edgeHandlers = useSwipeable({
    onSwipedRight: () => setIsOpen(true),
    trackTouch: true,
    trackMouse: true,
  });

  // Remove text selection when opening sidebar
  useEffect(() => {
    if (isOpen) {
      window.getSelection()?.removeAllRanges();
    }
  }, [isOpen]);

  return (
    <div className="admin-layout relative">
      {/* Left-edge swipe detector */}
      <div
        {...edgeHandlers}
        className={`fixed top-0 left-0 h-screen z-40 lg:hidden w-4 ${isOpen && sidebarBg}`}
      />

      {/* Mobile Sidebar */}
      <Transition show={isOpen} as={Fragment}>
        <div className="z-50 inset-0 lg:hidden fixed bg-black/30">
          {/* <div className="fixed inset-0" aria-hidden="true" /> */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-64"
          >
            <div
              {...sidebarHandlers}
              className="fixed inset-y-0 left-0 w-64 md:w-68 bg-white shadow-lg h-screen overflow-y-auto overscroll-contain"
            >
              <div className="h-full py-6 break-all">
                <NavItems setIsOpen={setIsOpen} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>

      {/* Toggle button on right */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="fixed transition-colors duration-300 ease-in-out top-4 right-4 z-50 p-3 cursor-pointer rounded-full bg-slate-100 hover:bg-slate-200 lg:hidden"
      >
        {isOpen ? (
          <MdClose size={24} color="#6f7782" />
        ) : (
          <RiMenu3Line size={24} color="#6f7782" />
        )}
      </button>

      {/* Desktop sidebar */}
      <Transition show={desktopIsOpen}>
        <Transition.Child
          enter="transition ease-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-64"
        >
          <div className="w-full max-w-72 hidden lg:block h-screen bg-white">
            <NavItems setIsDesktopOpen={setDesktopIsOpen} />
          </div>
        </Transition.Child>
      </Transition>

      {!desktopIsOpen && (
        <>
          <div className="bg-white fixed w-20 z-50 hidden lg:block h-screen">
            <ClosedMenu
              isDesktopOpen={setDesktopIsOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </>
      )}

      {/* Main content */}
      <main className={`children pl-0 ${!desktopIsOpen && "lg:pl-20"}`}>
        {/* {!isOnline && <OfflineStatus />}
        <Outlet /> */}
        <OfflineStatus />
      </main>
    </div>
  );
};

export default AdminLayout;
