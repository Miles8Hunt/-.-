import { NodeTypes } from "../types/element-states";
import { randomLinkedList } from "../utils/randomLinkedList";


class ListNode<T> implements NodeTypes<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

interface ILinkedList<T> {
  addHead: (element: T) => void;
  addTail: (element: T) => void;
  
  deleteHead: () => void;
  deleteTail: () => void;

  addIndex: (index: number, val: T) => void;
  deleteIndex: (index: number) => void;

  getFirstNode: () => NodeTypes<T> | null;
  getLastNode: () => NodeTypes<T> | null;
  getIndexNode: (index: number) => NodeTypes<T> | null;

  getArray: () => NodeTypes<T>[];
  getSize: () => number;
}


class LinkedList<T> implements ILinkedList<T> {
  private head: ListNode<T> | null;
  private size: number;
  constructor(values: T[] = []) {
    this.head = null;
    this.size = 0;
    for (let value of values) {
      this.addTail(value);
    }
  }

  addHead(value: T) {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  addTail(value: T) {
    const newNode = new ListNode(value);
    if (this.head === null) {
      this.head = newNode;
      this.size++;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
    this.size++;
  }

  deleteHead() {
    if (this.head === null) {
      return;
    }
    this.head = this.head.next;
    this.size--;
  }

  deleteTail() {
    if (this.head === null) {
      return;
    }

    if (this.head.next === null) {
      this.head = null;
      return;
    }

    let current = this.head;
    while (current.next != null && current.next.next != null) {
      current = current.next;
    }

    current.next = null;
    this.size--;
  }

  addIndex(index: number, value: T) {
    const newNode = new ListNode(value);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1 && current !== null; ++i) {
      current = current.next;
    }
    if (current === null) {
      return;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  deleteIndex(index: number) {
    if (this.head === null) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1 && current !== null; ++i) {
      if (current.next) current = current.next;
    }

    if (current === null || current.next === null) {
      return;
    }

    current.next = current.next.next;
    this.size--;
  }

  getFirstNode() {
    if (this.head === null) {
      return null;
    }
    return this.head;
  }

  getLastNode() {
    if (this.head === null) {
      return null;
    }

    let lastNode = this.head;
    while (lastNode.next !== null) {
      lastNode = lastNode.next;
    }
    
    return lastNode;
  }

  getIndexNode(index: number) {
    let current: ListNode<T> | null = this.head;
    let i = 0;

    while (current !== null && i < index) {
      current = current.next;
      i++;
    }

    return current !== null && i === index ? current : null;
  }

  getArray() {
    const result = [];
    let current = this.head;
    
    while (current) {
      result.push(current);
      current = current.next;
    }

    return result;
  }

  getSize(): number {
    return this.size;
  }
}

export const linkedList = new LinkedList<string>(randomLinkedList());
