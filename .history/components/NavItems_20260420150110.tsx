import { Link, NavLink, useLoaderData, useNavigate } from "react-router";
import { sidebarItems } from "~/constants";

import { RxCrossCircled } from "react-icons/rx";

import { cn } from "~/lib/myutils";
import { logoutUser } from "~/appwrite/auth";

type NavItemsProps = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDesktopOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

interface NavProps {
  id: number;
  Icon: React.ElementType;
  label: string;
  href: string;
}

const NavItems = ({ setIsOpen, setIsDesktopOpen }: NavItemsProps) => {
  const user = useLoaderData();
  const navigate = useNavigate();

  const {admin} = useLoaderData();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };
  return (
    <section className="nav-items fixed w-64 md:w-68 lg:w-72 bg-white h-screen z-50">
      <div className="flex justify-between items-center pt-0 lg:pt-6">
        <Link
          to="/"
          className="flex w-fit items-center gap-2 link select-none"
          draggable="false"
          onClick={() => setIsOpen?.(false)}
        >
          <img src="/assets/icons/logo.svg" alt="logo" className="size-7.5" />
          <h1 className="font-bold text-lg text-slate-700">Travelo</h1>
        </Link>
        <div
          onClick={() => setIsDesktopOpen?.(false)}
          className="hidden lg:block hover:scale-110 duration-300 ease-in-out cursor-pointer text-slate-600"
        >
          <RxCrossCircled size={20} />
        </div>
      </div>
      <nav className="py-4">
        {sidebarItems(admin).map(({ label, href, Icon, id }: NavProps) => (
          <NavLink to={href} key={id} onClick={() => setIsOpen?.(false)}>
            {({ isActive }: { isActive: boolean }) => (
              <div
                className={cn(
                  "flex items-center select-none text-sm font-medium text-slate-600 cursor-pointer gap-4 my-4 link rounded-md px-4 py-4 transition-colors",
                  isActive
                    ? "bg-primary-100 hover:bg-primary-100/90 text-white"
                    : "bg-slate-100 hover:bg-slate-200",
                )}
              >
                <Icon size={20} />
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
      <footer className="nav-footer break-all fixed bottom-0">
        <img
          src={user?.imageUrl || "/assets/icons/user.svg"}
          alt={user?.name}
          referrerPolicy="no-referrer"
        />
        <article>
          <p className="text-md text-black">{user?.name}</p>
          <p
            title={user?.email}
            className="text-sm text-slate-600 cursor-pointer hover:text-slate-700"
          >
            {user?.email}
          </p>
        </article>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to logout?")) {
              handleLogout();
            }
          }}
          className="cursor-pointer"
          title="logout"
        >
          <img src="/assets/icons/logout.svg" alt="logout" className="size-6" />
        </button>
      </footer>
    </section>
  );
};

export default NavItems;
