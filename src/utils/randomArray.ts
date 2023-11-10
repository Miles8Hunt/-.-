import { ElementStates, SortingTypes } from "../types/element-states";


export const randomArray = () => {

  const size = Math.floor(Math.random() * (17 - 3)) + 3;
  const arr: Array<SortingTypes> = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    arr.push({ value: randomNumber, state: ElementStates.Default });
  }

  return arr;
};
