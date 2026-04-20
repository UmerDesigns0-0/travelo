import { selectItems } from "~/constants";
import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

import { ComboboxComponent } from "components/index";
import { s } from "node_modules/react-router/dist/development/index-react-server-client-IoJGLOqV.mjs";
import { Search } from "lucide-react";

const SelectItems = () => {
  return (
    <>
      {selectItems.map((key) => () => (
        <Field>
          <FieldLabel className="form-label" htmlFor={key}>
            {label}
          </FieldLabel>
          <ComboboxComponent<Country>
            data={key}
            placeholder={key}
            searchPlaceholder={searchPlaceholder}
            emptyMessage={emptyMessage}
            className="w-64"
            renderItem={(item) => <>{item}</>}
            renderValue={(item) =>
              item ? (
                <div className="flex flex-row items-center gap-1 px-0">
                  <span>{key}</span>
                </div>
              ) : null
            }
          />
          <FieldDescription className="text-xs">
            Enter the name of the country you want to visit.
          </FieldDescription>
        </Field>
      ))}
    </>
  );
};
export default SelectItems;
