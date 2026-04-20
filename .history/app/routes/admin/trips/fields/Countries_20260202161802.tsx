import { ComboboxComponent } from "components/index";
import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";

declare interface Country {
  flag: string;
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap: string;
};

const Countries = ({ countries }: { countries: Country[] }) => {
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
        renderItem={(item) => (
          <>
            <img src={item.flag} alt={item.name} className="size-5 mr-2" />
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
        Enter the name of the country you want to visit.
      </FieldDescription>
    </Field>
  );
};

export default Countries;
