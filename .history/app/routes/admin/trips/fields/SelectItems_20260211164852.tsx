import { selectItems, comboBoxItems } from "~/constants";
import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";

import { ComboboxComponent } from "components/index";

interface SelectItemsProps {
  onChange?: (field: string, value: string) => void;
  error: string | null;
  groupType: string;
  travelStyle: string;
  interest: string;
  budget: string;
}
const SelectItems = ({
  onChange,
  error,
  groupType,
  travelStyle,
  interest,
  budget,
}: SelectItemsProps) => {
  const fieldLabels: Record<string, string> = {
    groupType: "Group Type",
    travelStyle: "Travel Style",
    interest: "Interests",
    budget: "Budget",
  };

  const fieldDescriptions: Record<string, string> = {
    groupType: "Select who you're traveling with",
    travelStyle: "Choose your preferred travel style",
    interest: "Select your interests",
    budget: "Choose your budget range",
  };

  const fieldSearchPlaceholders: Record<string, string> = {
    groupType: "Search group types...",
    travelStyle: "Search travel styles...",
    interest: "Search interests...",
    budget: "Search budget options...",
  };

  const fieldPlaceholders: Record<string, string> = {
    groupType: "Select group type",
    travelStyle: "Select travel style",
    interest: "Select interests",
    budget: "Select budget",
  };

  // Convert string arrays to BaseItem format
  const getComboBoxData = (key: keyof typeof comboBoxItems) => {
    return comboBoxItems[key].map((item) => ({
      value: item,
    }));
  };

  return (
    <>
      {selectItems.map((key) => (
        <Field key={key}>
          <FieldLabel className="form-label" htmlFor={key}>
            {fieldLabels[key]}
          </FieldLabel>
          <ComboboxComponent
            data={getComboBoxData(key)}
            placeholder={fieldPlaceholders[key]}
            onValueChange={(value, item) => {
              console.log(`${key} changed:`, value, item); // Debug log
              if (item && value) {
                onChange?.(key, item.value);
              }
            }}
            searchPlaceholder={`${fieldSearchPlaceholders[key]}...`}
            emptyMessage={`No ${key} found`}
            className="w-64"
            renderItem={(item) => <>{item.value}</>}
            renderValue={(item) =>
              item ? (
                <div className="flex flex-row items-center gap-1 px-0">
                  <span>{item.value}</span>
                </div>
              ) : null
            }
          />
          <FieldDescription className="text-xs">
            {fieldDescriptions[key]}
          </FieldDescription>
        </Field>
      ))}
    </>
  );
};
export default SelectItems;
