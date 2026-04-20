import { Label } from "~/components/ui/label";
import { Field } from "~/components/ui/field";


interface MapsProps {
  selectedCountry: Country | null;
}

const Maps = ({ selectedCountry }: MapsProps) => {
  // Default to world view
  const getMapUrl = () => {
    if (!selectedCountry || !selectedCountry.coordinates) {
      return "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19714623.639426894!2d0!3d20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s";
    }

    const [lat, lng] = selectedCountry.coordinates;
    // Google Maps embed URL with coordinates
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d500000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s`;
  };

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
        key={selectedCountry?.name || "default"} // Force re-render when country changes
        src={getMapUrl()}
        className="h-70 w-full rounded-md border"
        loading="lazy"
      />
    </Field>
  );
};

export default Maps;