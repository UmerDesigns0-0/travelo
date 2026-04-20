import { Label } from "~/components/ui/label";
import { Field } from "~/components/ui/field";

const Maps = () => {
  return (
    <Field>
      <Label className="form-label">Location on the world map</Label>
      <iframe
        src={
          "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13619.33293116635!2d73.0688345!3d31.4187205!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a2f5be33f3%3A0x6a214e1f73edd114!2sClock%20Tower%20Faisalabad!5e0!3m2!1sen!2s!4v1770027355108!5m2!1sen!2s"
        }
        className="h-70 w-full rounded-md border"
        loading="lazy"
      />
    </Field>
  );
};

export default Maps;
