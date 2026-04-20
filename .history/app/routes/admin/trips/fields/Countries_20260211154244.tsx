import { ComboboxComponent } from "components/index";
import { error } from "console";
import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";
import { cn } from "~/lib/utils";

interface CountriesProps {
  countries: Country[];
  onCountryChange: (country: Country | null) => void;
  error: string | null;
  formData: string;
}
const Countries = ({ countries, onCountryChange }: CountriesProps) => {
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
        className="w-64"
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
            <div
              className={cn(
                `flex flex-row items-center gap-1 px-0 whitespace-normal wrap-break-word`,
              )}
            >
              <img src={item.flag} alt={item.name} className="size-5 mr-2" />
              <span>{item.name}</span>
            </div>
          ) : null
        }
      />
      <FieldDescription className="text-xs">
        Enter the name of the country you want to visit.
      </FieldDescription>
    </Field>
  );
};

export default Countries;
