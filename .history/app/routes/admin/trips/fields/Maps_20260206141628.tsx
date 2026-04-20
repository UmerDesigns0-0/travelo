import { Label } from "~/components/ui/label";
import { Field } from "~/components/ui/field";

const Maps = ({ selectedCountry }: { selectedCountry: string }) => {
  return (
    <Field>
      <Label className="form-label">Location on the world map</Label>
      <iframe
        src={
          "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19714623.639426894!2d0!3d20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s"
        }
        className="h-70 w-full rounded-md border"
        loading="lazy"
      />
    </Field>
  );
};

export default Maps;
