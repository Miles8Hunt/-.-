import { baseUrl, recursionUrl, fibonacciUrl, sortingUrl, stackUrl, queueUrl, listUrl } from "../constants";


describe("Тест роутинга главной страницы", function() {

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(500);
  })

  it('Переход на страницу "Строка" осуществляется корректно', function() {
    cy.visit(recursionUrl);
    cy.contains('Строка');
  });

  it('Переход на страницу "Фибоначчи" осуществляется корректно', function() {
    cy.visit(fibonacciUrl);
    cy.contains('Последовательность Фибоначчи');
  });

  it('Переход на страницу "Сортировка массива" осуществляется корректно', function() {
    cy.visit(sortingUrl);
    cy.contains('Сортировка массива');
  });

  it('Переход на страницу "Стек" осуществляется корректно', function() {
    cy.visit(stackUrl);
    cy.contains('Стек');
  });

  it('Переход на страницу "Очередь" осуществляется корректно', function() {
    cy.visit(queueUrl);
    cy.contains('Очередь');
  });

  it('Переход на страницу "Связный список" осуществляется корректно', function() {
    cy.visit(listUrl);
    cy.contains('Связный список');
  });
});
