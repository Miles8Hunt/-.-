import { fibonacciUrl, input, circle } from "../constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";


describe("Проверка визуализации алгоритма 'Последовательность Фибоначчи'", () => {
  beforeEach(() => {
    cy.visit(fibonacciUrl);
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get(input).should('have.value', '');
    cy.get('button').last().as('button');
    cy.get('@button').should('be.disabled');
    cy.get('@button').should('have.text', 'Рассчитать')
  });

  it("Визуализация алгоритма Фибоначчи работает корректно", () => {
    cy.get(input).type('5');
    cy.get('button').last().as('button');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button')
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[0]).children().should("have.text", '1');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
      cy.get(item[2]).children().should("have.text", '2');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
      cy.get(item[2]).children().should("have.text", '2');
      cy.get(item[3]).children().should("have.text", '3');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
      cy.get(item[2]).children().should("have.text", '2');
      cy.get(item[3]).children().should("have.text", '3');
      cy.get(item[4]).children().should("have.text", '5');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
      cy.get(item[2]).children().should("have.text", '2');
      cy.get(item[3]).children().should("have.text", '3');
      cy.get(item[4]).children().should("have.text", '5');
      cy.get(item[5]).children().should("have.text", '8');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(input).should('have.value', '');
    cy.get('@button').should('be.disabled');
  });
});
