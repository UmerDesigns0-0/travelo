// import { selectItems } from "~/constants";
// import { Field, FieldLabel, FieldDescription } from "~/components/ui/field";
// import { Input } from "~/components/ui/input";

// import { ComboboxComponent } from "components/index";

// const SelectItems = () => {
//   return (
//     <>
//       {selectItems.map((key) => (
//         <div key={key}>
//           <FieldLabel htmlFor={key} className="form-label capitalize">
//             {key}
//           </FieldLabel>
//           <Input className="form-inp" placeholder={key} />
//                 <Field>
//         <FieldLabel className="form-label" htmlFor="country">
//           Country
//         </FieldLabel>
//         <ComboboxComponent<Country>
//           data={}
//           placeholder="Select a country"
//           searchPlaceholder="Search countries..."
//           emptyMessage="No countries found."
//           className="w-64"
//           renderItem={(item) => (
//             <>
//               <img src={item.flag} alt={item.name} className="size-5 mr-2" />
//               {item.name}
//             </>
//           )}
//           renderValue={(item) =>
//             item ? (
//               <div className="flex flex-row items-center gap-1 px-0">
//                 <img src={item.flag} alt={item.name} className="size-5 mr-2" />
//                 <span>{item.name}</span>
//               </div>
//             ) : null
//           }
//         />
//         <FieldDescription className="text-xs">
//           Enter the name of the country you want to visit.
//         </FieldDescription>
//       </Field>
//         </div>
//       ))}
//     </>
//   );
// };
// export default SelectItems;
