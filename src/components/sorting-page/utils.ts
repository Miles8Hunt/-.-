import { ElementStates, SortingTypes } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { swap } from '../../utils/swap';


export const randomArray = () => {

  const size = Math.floor(Math.random() * (17 - 3)) + 3;
  const arr: Array<SortingTypes> = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    arr.push({ value: randomNumber, state: ElementStates.Default });
  }

  return arr;
};

export const bubbleSortTest = (arr: number[], order: Direction): number[] => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if ( order === Direction.Ascending
             ? arr[j] > arr[j + 1]
             : arr[j] < arr[j + 1]
      ) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};

export const selectionSortTest = (
  arr: number[],
  order: Direction
): number[] => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      if ( order === Direction.Ascending
             ? arr[j] < arr[maxInd]
             : arr[j] > arr[maxInd]
      ) {
        maxInd = j;
      }
    }
    swap(arr, maxInd, i);
  }
  return arr;
};
