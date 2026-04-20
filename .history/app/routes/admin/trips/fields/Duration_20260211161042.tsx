import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";

import { Input } from "~/components/ui/input";

interface Inputs {
  label: string;
  placeholder: string;
  description: string;
  onChange?: (value: number) => void;
  error: string | null;
  formData: number | "";
}

const Duration = ({
  label,
  placeholder,
  description,
  onChange,
  error,
  formData,
}: Inputs) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Handle the change as needed
    if (
      value === "" ||
      (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 365)
    ) {
      onChange?.(Number(value));
    }
  };
  return (
    <Field className="flex flex-col gap-1.5">
      <FieldLabel className="form-label">{label}</FieldLabel>
      <Input
        className="form-inp"
        type="number"
        min={1}
        max={365}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <FieldDescription className="text-xs">
        {error && !formData ? (
          <span className="text-red-500">
            Please enter a valid duration (between 1 and 365).
          </span>
        ) : (
          description
        )}
      </FieldDescription>
    </Field>
  );
};
export default Duration;
