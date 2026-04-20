import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";

import { Input } from "~/components/ui/input";

interface Inputs {
  label: string;
  placeholder: string;
  description: string;
  onChange?: (value: number) => void;
}

const OtherInps = ({label, placeholder, description, onChange}: Inputs) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Handle the change as needed
    if (value === "" || (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 999)) {
      return;
    }
  };
  return (
    <Field onChange={onChange} className="flex flex-col gap-1.5">
      <FieldLabel className="form-label">{label}</FieldLabel>
      <Input className="form-inp" type="number" min={1} max={365} placeholder={placeholder} onChange={handleChange} />
      <FieldDescription className="text-xs">
        {description}
      </FieldDescription>
    </Field>
  );
};
export default OtherInps;
