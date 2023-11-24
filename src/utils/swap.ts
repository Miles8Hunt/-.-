import { ElementTypes, SortingTypes } from "../types/element-states";


export const swap = (
  value: ElementTypes[] | SortingTypes[],
  firstItem: number,
  secondItem: number
) => {
  return ([value[firstItem], value[secondItem]] = [
    value[secondItem],
    value[firstItem],
  ]);
};
