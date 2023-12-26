import { Direction } from "../../../types/direction";
import { bubbleSortTest } from "../utils";


describe('Тест сортировки пузырьком:', () => {

  it('Пустой массив по возрастанию отсортирован корректно', () => {
    expect(bubbleSortTest([], Direction.Ascending)).toEqual([]);
  });

  it('Пустой массив по убыванию отсортирован корректно', () => {
    expect(bubbleSortTest([], Direction.Descending)).toEqual([]);
  });

  it('Пустой массив из одного элемента по возрастанию отсортирован корректно', () => {
    expect(bubbleSortTest([7], Direction.Ascending)).toEqual([7]);
  });

  it('Пустой массив из одного элемента по убыванию отсортирован корректно', () => {
    expect(bubbleSortTest([7], Direction.Descending)).toEqual([7]);
  });

  it('Пустой массив из нескольких элементов по возрастанию отсортирован корректно', () => {
    expect(bubbleSortTest([1, 27, 11, 10, 4, 32], Direction.Ascending)).toEqual([1, 4, 10, 11, 27, 32]);
  });

  it('Пустой массив из нескольких элементов по убыванию отсортирован корректно', () => {
    expect(bubbleSortTest([1, 27, 11, 10, 4, 32], Direction.Descending)).toEqual([32, 27, 11, 10, 4, 1]);
  });
});
