interface IStack<T> {
  size: number;
  index: number;
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getArray: () => T[];
  clear: () => void;
}

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  get size() {
    return this.container.length;
  }
  get index() {
    return this.size - 1;
  }
  push = (item: T): void => {
    this.container.push(item);
  }
  pop = (): void => {
    this.container.pop();
  }
  peak = (): T | null => {
    if (this.size > 0) {
      return this.container[this.container.length - 1];
    } else {
      return null;
    }
  }
  getArray = () => {
   return this.container;
  }
  clear = (): void => {
    if (this.size > 0) {
      this.container = [];
    } 
  }
};

export const stack = new Stack<string>();
