import { Label } from "~/components/ui/label";
import { Field } from "~/components/ui/field";

interface MapsProps {
  selectedCountry: Country | null;
}

const Maps = ({ selectedCountry }: MapsProps) => {
  const getMapUrl = () => {
    if (!selectedCountry || !selectedCountry.coordinates) {
      return "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19714623.639426894!2d0!3d20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s";
    }

    const [lat, lng] = selectedCountry.coordinates;
    // simpler, reliable embed using q=lat,lng
    return `https://www.google.com/maps?q=${lat},${lng}&z=6&output=embed`;
  };

  const iframeKey = selectedCountry?.coordinates?.join(",") || "default";

  return (
    <Field>
      <Label className="form-label">
        <div className="flex flex-col md:flex-row">
          <p>
            Location on the world map:
          </p>
          <p>{selectedCountry && (
              <span className="ml-0.5 text-sm font-medium text-muted-foreground">
                ({selectedCountry.name})
              </span>
            )}</p>
        </div>
      </Label>
      <iframe
        key={iframeKey} // force reload when coords change
        src={getMapUrl()}
        className="h-70 w-full rounded-md border"
        loading="lazy"
      />
    </Field>
  );
};

export default Maps;
