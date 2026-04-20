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

// ...existing code...
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
}

// Type guard to narrow unknown/ object to BaseItem
function isBaseItem(x: unknown): x is BaseItem {
  return typeof x === "object" && x !== null && "value" in x && typeof (x as any).value === "string";
}

const ComboboxComponent = <T extends BaseItem>({
  data,
  placeholder = "Select an item",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  renderItem,
  renderValue,
  onValueChange,
}: ComboboxComponentProps<T>) => {
  return (
    <Combobox
      items={data}
      onValueChange={(selectedItem) => {
        console.log("Combobox library returned:", selectedItem); // Debug

        // If the library returned the full item object
        if (isBaseItem(selectedItem)) {
          onValueChange?.(selectedItem.value, selectedItem as T);
        }
        // If the library returned just the value string
        else if (typeof selectedItem === "string") {
          const item = data.find((d) => d.value === selectedItem);
          onValueChange?.(selectedItem, item);
        }
      }}
    >
// ...existing code...
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="form-inp w-64 justify-between font-normal"
          >
            {renderValue && renderValue !== null ? (
              <ComboboxValue>
                {(item: T) => (item ? renderValue(item) : placeholder)}
              </ComboboxValue>
            ) : (
              <ComboboxValue placeholder={placeholder} />
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
            <ComboboxItem className="form-input flex items-center gap-2" key={item.value} value={item}>
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
