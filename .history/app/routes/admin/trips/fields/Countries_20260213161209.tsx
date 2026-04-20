import { ComboboxComponent } from "components/index";
import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";
import { cn } from "~/lib/utils";

interface CountriesProps {
  countries: Country[];
  onCountryChange: (country: Country | null) => void;
  error: boolean;
  formData: string;
}
const Countries = ({
  countries,
  onCountryChange,
  error,
  formData,
}: CountriesProps) => {
  return (
    <Field>
      <FieldLabel className="form-label" htmlFor="country">
        Country
      </FieldLabel>
      <ComboboxComponent<Country>
        data={countries}
        placeholder="Select a country"
        searchPlaceholder="Search countries..."
        emptyMessage="No countries found."
        className={cn(`w-64`, error && !formData && "border-red-500 border")}
        onValueChange={(value, item) => {
          onCountryChange(item || null);
        }}
        renderItem={(item) => (
          <>
            <img
              src={item.flag}
              alt={item.name}
              className="size-5 mr-2"
              loading="lazy"
            />
            {item.name}
          </>
        )}
        renderValue={(item) =>
          item ? (
            <div className="flex flex-row items-center gap-1 px-0 whitespace-normal wrap-break-word">
              <img src={item.flag} alt={item.name} className="size-5 mr-2" />
              <span>{item.name}</span>
            </div>
          ) : null
        }
      />
      <FieldDescription className="text-xs">
        {error && !formData ? (
          <span className="text-red-500">Please select a country.</span>
        ) : (
          "Select the country you want to visit."
        )}
      </FieldDescription>
    </Field>
  );
};

export default Countries;
