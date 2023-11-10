export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type ElementTypes = {
  letter: string;
  state: ElementStates;
};

export type SortingTypes = {
  value: number;
  state: ElementStates;
};

export type NodeTypes<T> = {
  value: T;
  next: NodeTypes<T> | null;
};

export type CircleTypes = {
  modifiedIndex: number;
  changingIndex: number;
};
