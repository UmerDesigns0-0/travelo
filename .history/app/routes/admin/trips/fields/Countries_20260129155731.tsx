import { ComboboxComponent } from "components/index";
import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";

interface Country {
  flag: string;
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap: string;
}

export const loader = async () => {
  try {
    // Specify the fields you need
    const fields = "name,flag,latlng,maps,flags";
    const response = await fetch(
      `https://restcountries.com/v3.1/all?fields=${fields}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("API did not return an array:", data);
      return [];
    }

    const countrySort = data.sort((a: any, b: any) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    console.log("API Response:", countrySort);

    return data.map((country: any) => ({
      flag: country.flags?.svg || "",
      name: country.name.common,
      coordinates: country.latlng || [0, 0],
      value: (country.flags?.svg || "") + " " + country.name.common,
      openStreetMap: country.maps?.openStreetMaps || "",
    }));
  } catch (error) {
    console.error("Loader error:", error);
    return [];
  }
};
const Countries = ({ loaderData }: any) => {
  const countries = loaderData as Country[];

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
            <div className="flex flex-row items-center gap-1 px-0">
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
