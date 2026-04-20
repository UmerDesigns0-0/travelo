import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "~/components/ui/combobox";
import { Button } from "~/components/ui/button";
import { ChevronDown } from "lucide-react";

import type { ReactNode } from "react";

interface BaseItem {
  value: string;
  [key: string]: any; // Allow any additional properties
}

interface ComboboxComponentProps<T extends BaseItem> {
  data: T[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  // Function to render each item in the list
  renderItem: (item: T) => ReactNode;
  // Function to render the selected value (optional)
  renderValue?: (item: T) => ReactNode;
  // Callback when value changes
  onValueChange?: (value: string, item: T | undefined) => void;
  value?: string;
}

const ComboboxComponent = <T extends BaseItem>({
  data,
  placeholder = "Select an item",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  renderItem,
  renderValue,
  onValueChange,
  value,
}: ComboboxComponentProps<T>) => {
  return (
    <Combobox
      items={data}
      value={value}
      onValueChange={(val) => {
        if (!val) return; // Guard against null/empty

        const stringValue =
          typeof val === "object"
            ? (val as any).value // If library returns object
            : (val as string); // If library returns string

        const item = data.find((d) => d.value === stringValue);
        onValueChange?.(stringValue, item);
      }}
    >
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="form-inp w-64 justify-between font-normal"
          >
            {selectedItem ? (
              renderValue ? (
                renderValue(selectedItem)
              ) : (
                selectedItem.value
              )
            ) : (
              placeholder
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder={searchPlaceholder} />
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              className="form-input flex items-center gap-2"
              key={item.value}
              value={item.value}
            >
              {renderItem(item)}
              {/* <img src={item.flag} alt={item.name} className="size-5 mr-1" />
              {item.name} */}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
export default ComboboxComponent;
