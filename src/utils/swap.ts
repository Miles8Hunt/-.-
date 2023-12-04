import { ElementTypes, SortingTypes } from "../types/element-states";


export const swap = (
  value: ElementTypes[] | SortingTypes[] | number[],
  firstItem: number,
  secondItem: number
) => {
  return ([value[firstItem], value[secondItem]] = [
    value[secondItem],
    value[firstItem],
  ]);
};

export const swapTest = (array: string) => {
  const newArray = array.split("");
  const end = newArray.length - 1;
  const middle = Math.ceil(newArray.length / 2);
  for (let i = 0; i < middle; i++) {
    let j = end - i;
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
