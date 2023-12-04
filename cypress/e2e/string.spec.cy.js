import { input, circle, modifiedState, defaultState, changingState } from "../constants";
import { DELAY_IN_MS } from "../../src/constants/delays";


describe("Проверка визуализации алгоритма 'Строка'", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get(input).should('have.value', '');
    cy.get('button').last().as('button');
    cy.get('@button').should('be.disabled');
    cy.get('@button').should('have.text', 'Развернуть')
  })

  it("Визуализация алгоритма разворота строки работает корректно", () => {
    cy.get(input).type('hello');
    cy.get('button').last().as('button');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button')
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[0]).children().should("have.text", 'h');

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[1]).children().should("have.text", 'e');

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[2]).children().should("have.text", 'l');

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[3]).children().should("have.text", 'l');

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[4]).children().should("have.text", 'o');

      cy.wait(DELAY_IN_MS);

      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[0]).children().should("have.text", 'o');

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[1]).children().should("have.text", 'e');

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[2]).children().should("have.text", 'l');

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[3]).children().should("have.text", 'l');

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[4]).children().should("have.text", 'h');

      cy.wait(DELAY_IN_MS);

      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[0]).children().should("have.text", 'o');

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[1]).children().should("have.text", 'l');

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[2]).children().should("have.text", 'l');

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[3]).children().should("have.text", 'e');

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[4]).children().should("have.text", 'h');

      cy.wait(DELAY_IN_MS);

      cy.get(input).should('have.text', '');
      cy.get('@button').should('be.disabled');
    });
  });
});
