import { Header } from "components/index";
import { FieldSet } from "~/components/ui/field";
import { useState, useEffect } from "react";

import { Countries } from "./trips/fields/index";
import { Duration } from "./trips/fields/index";
import { SelectItems } from "./trips/fields/index";

import { Maps } from "./trips/fields/index";

import { cn } from "~/lib/utils";
import { account } from "~/appwrite/client";
import { useNavigate } from "react-router-dom";

type TripFormData = {
  country: string;
  duration: number | "";
  selectedItems: {
    groupType: string;
    travelStyle: string;
    interest: string;
    budget: string;
  };
};

const CreateTrip = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
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
          setCountries([]);
          return;
        }

        const countryData = data
          .sort((a: any, b: any) => {
            const nameA = a.name.common.toLowerCase();
            const nameB = b.name.common.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          })
          .filter((country: any) => {
            return (
              country.name.common !== "Antarctica" &&
              country.name.common !== "North Korea"
            );
          })
          .map((country: any) => ({
            flag: country.flags?.svg || "",
            name: country.name.common,
            coordinates: country.latlng || [0, 0],
            value: country.name.common,
            openStreetMap: country.maps?.openStreetMaps || "",
          }));

        setCountries(countryData);
        // console.log("Countries loaded:", countryData);
      } catch (error) {
        console.error("Fetch error:", error);
        setCountries([]);
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchCountries();
  }, []);

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    duration: "",
    selectedItems: {
      groupType: "",
      travelStyle: "",
      interest: "",
      budget: "",
    },
  });

  const requiredFields =
    !formData.country ||
    !formData.duration ||
    !formData.selectedItems.groupType ||
    !formData.selectedItems.travelStyle ||
    !formData.selectedItems.interest ||
    !formData.selectedItems.budget;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (requiredFields) {
      setLoading(false);
      return;
    }

    const user = await account.get();
    if (!user.$id) {
      console.log("User not authenticated");
      setError("You must be logged in to create a trip.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData.selectedItems,
          country: formData.country,
          duration: formData.duration,
          userId: user.$id,
        }),
      });
      const result = await response.json();

      if (!response.ok || result.error) {
        console.error("API Error:", result.error);
        setError(result.details || result.error || "Failed to generate trip");
        return;
      }

      if (result?.$id) {
        navigate(`/admin/trips/${result.$id}`);
      } else {
        console.error("Unexpected API response:", result);
        setError("Failed to create trip. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (country: Country | null) => {
    console.log("Selected:", country);
    setSelectedCountry(country);
    setFormData((prevData) => ({
      ...prevData,
      country: country ? country.name : "",
    }));
  };

  const handleSelectItemsChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedItems: {
        ...prevData.selectedItems,
        [field]: value,
      },
    }));
  };

  return (
    <main className="all-users wrapper">
      <Header title="Create Trip" description="Generate AI travel plans" />
      <section className="wrapper-lg">
        <form className="trip-form px-4 py-8 mb-14" onSubmit={handleSubmit}>
          <FieldSet>
            <Countries
              countries={countries}
              onCountryChange={handleCountryChange}
              error={error}
              formData={formData.country}
            />
            <Duration
              label="Duration"
              placeholder="Enter number of days"
              description="Enter the number of days you want to spend in the country."
              error={error}
              formData={formData.duration}
              onChange={(value: number) => {
                setFormData((prevData) => ({
                  ...prevData,
                  duration: value,
                }));
              }}
            />
            <SelectItems
              onChange={handleSelectItemsChange}
              error={error}
              formData={formData.selectedItems}
            />
            <Maps selectedCountry={selectedCountry} />
            <div>
              <button
                className={cn(
                  `flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-sm w-full md:w-sm mx-auto py-3 rounded-md text-white cursor-pointer`,
                  loading && "cursor-not-allowed bg-blue-400 hover:bg-blue-400",
                )}
                type="submit"
                disabled={loading}
              >
                {" "}
                <img
                  className={cn(`size-4`, loading && "animate-spin")}
                  src={
                    loading
                      ? "/assets/icons/loader.svg"
                      : "/assets/icons/magicStar.svg"
                  }
                  alt="Loading"
                />
                {loading ? "Generating..." : "Generate Trip"}
              </button>
              {error && (
                <p className="text-red-500 text-sm text-center transition duration-200 animate-[pulse_1s_ease-in-out]">
                  {error}
                </p>
              )}
            </div>
          </FieldSet>
        </form>
      </section>
    </main>
  );
};
export default CreateTrip;
