import { Header } from "components/index";
import { FieldSet } from "~/components/ui/field";

import { Countries } from "./trips/fields/index";
import { OtherInps } from "./trips/fields/index";
import { SelectItems } from "./trips/fields/index";

const CreateTrip = () => {
  return (
    <main className="all-users wrapper">
      <Header title="Create Trip" description="Generate AI travel plans" />
      <section className="wrapper-lg">
        <form className="trip-form px-4 mb-14">
          
          <FieldSet><div className="flex flex-col-6 gap-4">
            <Countries />
            <OtherInps
              label="Duration"
              placeholder="Enter number of days"
              description="Enter the number of days you want to spend in the country."
            />
            <SelectItems /></div>
          </FieldSet>
        </form>
      </section>
    </main>
  );
};
export default CreateTrip;
