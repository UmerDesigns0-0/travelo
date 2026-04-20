import { IoIosSearch } from "react-icons/io";

declare interface SeachBarProps {
  label: string;
  onChange?: (value: string) => void;
  BtnText: string;
}

const SearchBar = ({ label, onChange, BtnText }: SeachBarProps) => {
  return (
    <>
      <label
        htmlFor="search"
        className="block mb-2.5 text-sm font-medium text-heading sr-only "
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center text-slate-500 ps-3 pointer-events-none">
          <IoIosSearch size={18} />
        </div>
        <input
          type="search"
          id="search"
          className="block w-full outline-none p-3 ps-9 border border-slate-300 text-heading text-sm rounded-md focus:ring-2 focus:ring-slate-300 shadow-xs placeholder:text-body"
          placeholder="Search"
          onChange={(e) => onChange?.(e.target.value)}
          required
        />
        <button
          type="button"
          className="absolute end-1.5 bottom-1.5 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 box-border border border-transparent  focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
        >
          {BtnText}
        </button>
      </div>
    </>
  );
};

export default SearchBar;
