export const randomLinkedList = () => {

  const maxsize = 4;
  const minsize = 4;
  const size = Math.floor(Math.random() * (maxsize - minsize + 1)) + minsize;
  const arr: string[] = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    arr.push(String(randomNumber));
  }

  return arr;
};
