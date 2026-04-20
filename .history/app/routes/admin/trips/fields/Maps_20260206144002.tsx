import { useMemo } from "react";
import { Label } from "~/components/ui/label";
import { Field } from "~/components/ui/field";

interface Country {
  flag: string;
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap: string;
}

interface MapsProps {
  selectedCountry: Country | null;
}

const Maps = ({ selectedCountry }: MapsProps) => {
  const mapUrl = useMemo(() => {
    if (!selectedCountry || !selectedCountry.coordinates) {
      // Default world view
      return "https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik";
    }

    const [lat, lng] = selectedCountry.coordinates;
    // OpenStreetMap embed - zoom level 5 for country view
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-5},${lat-5},${lng+5},${lat+5}&layer=mapnik&marker=${lat},${lng}`;
  }, [selectedCountry]);

  console.log("Selected country in Maps:", selectedCountry);

  return (
    <Field>
      <Label className="form-label">
        Location on the world map
        {selectedCountry && (
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({selectedCountry.name})
          </span>
        )}
      </Label>
      <iframe
        key={selectedCountry?.value || "default-map"}
        src={mapUrl}
        className="h-70 w-full rounded-md border"
        loading="lazy"
        title={selectedCountry ? `Map of ${selectedCountry.name}` : "World map"}
      />
    </Field>
  );
};

export default Maps;