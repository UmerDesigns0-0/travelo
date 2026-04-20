import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";

import { Input } from "~/components/ui/input";

interface Inputs {
  label: string;
  placeholder: string;
  description: string;
}

const OtherInps = ({label, placeholder, description}: Inputs) => {
  return (
    <Field className="flex flex-col gap-1.5">
      <FieldLabel className="form-label">{label}</FieldLabel>
      <Input key={key} className="form-inp" placeholder={placeholder} />
      <FieldDescription className="text-xs">
        {description}
      </FieldDescription>
    </Field>
  );
};
export default OtherInps;
