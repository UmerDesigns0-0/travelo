import { Link, useLocation } from "react-router";
import { cn } from "~/lib/myutils";

type HeaderProps = {
  title: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
};
const Header = ({ title, description, ctaText, ctaUrl }: HeaderProps) => {
  const location = useLocation();
  return (
    <header className="header">
      <article>
        <h1
          className={cn(
            `text-dark-100`,
            location.pathname === "/"
              ? `text-2xl md:text-4xl font-bold`
              : `text-xl md:text-2xl font-semibold`
          )}
        >
          {title}
        </h1>
        <h1
          className={cn(
            `text-slate-500 font-normal`,
            location.pathname === "/"
              ? `text-base md:text-lg`
              : `text-sm md:text-lg`
          )}
        >
          {description}
        </h1>
      </article>
      {ctaText && ctaUrl && (
        <Link to={ctaUrl}>
          <button className="group w-full md:w-fit whitespace-nowrap flex justify-center items-center gap-1 outline-none cursor-pointer rounded-md text-sm bg-blue-500 hover:bg-blue-600 text-white py-3 px-8">
            <img src="/assets/icons/plus.svg" alt="add" />
            <span>{ctaText}</span>
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
