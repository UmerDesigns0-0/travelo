import { IoIosSearch } from "react-icons/io";

interface SearchBarProps {
  id: string;
  label: string;
  value?: string;
  placeholder: string;
  onChange?: (value: string) => void;
  buttonText: string;
  onSearch?: () => void;
}

const SearchBar = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  buttonText,
  onSearch,
}: SearchBarProps) => {
  return (
    <>
      <label
        htmlFor={id}
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
          id={id}
          value={value}
          className="block w-full outline-none p-3 ps-9 border border-slate-300 text-heading text-sm rounded-md focus:ring-2 focus:ring-slate-300 shadow-xs placeholder:text-body"
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <button
          onClick={onSearch}
          type="submit"
          className="absolute end-1.5 bottom-1.5 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 box-border border border-transparent  focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default SearchBar;
