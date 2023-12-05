import { queueUrl, input, circle, circleItem, changingState, defaultState, addButton, deleteButton, clearButton } from "../constants";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";


const array = ["A", "B", "C"];
const input1 = 'A';
const input2 = 'B';
const input3 = 'C';
const pushItem = (val) => {
  cy.get(input).type(val);
  cy.get(addButton).should('not.be.disabled');
  cy.get(addButton).click();
  cy.get(deleteButton).should('not.be.disabled');
  cy.wait(SHORT_DELAY_IN_MS);
};

describe("Проверка визуализации алгоритма 'очередь'", () => {
  beforeEach(() => {
    cy.visit(queueUrl);
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
  });

//========================================================================================================

  it("Добавление элемента в очередь работает корректно", () => {
    cy.get(input).type(input1);
    cy.get(addButton).should('not.be.disabled');
    cy.get(addButton).click();

    cy.get(addButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
    });

    cy.get(circleItem).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should("have.text", "head");
      cy.get(item[0]).children('div').invoke('last').should("have.text", "tail");
    });
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('not.be.disabled');
    cy.get(clearButton).should('not.be.disabled');

    cy.wait(DELAY_IN_MS);

    cy.get(input).type(input2);
    cy.get(addButton).should('not.be.disabled');
    cy.get(addButton).click();

    cy.get(addButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
    });

    cy.get(circleItem).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should("have.text", "head");
      cy.get(item[0]).children('div').invoke('last').should("not.have.text", "tail");
      cy.get(item[1]).children('div').invoke('last').should("have.text", "tail");
    });
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('not.be.disabled');
    cy.get(clearButton).should('not.be.disabled');

    cy.wait(DELAY_IN_MS);

    cy.get(input).type(input3);
    cy.get(addButton).should('not.be.disabled');
    cy.get(addButton).click();
    
    cy.get(addButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
    });

    cy.get(circleItem).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should("have.text", "head");
      cy.get(item[0]).children('div').invoke('last').should("not.have.text", "tail");
      cy.get(item[1]).children('div').invoke('last').should("not.have.text", "tail");
      cy.get(item[2]).children('div').invoke('last').should("have.text", "tail");
    });
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('not.be.disabled');
    cy.get(clearButton).should('not.be.disabled');
  });

//========================================================================================================

  it("Удаление элемента из очереди работает корректно", () => {
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');

    array.map(val => { pushItem(val) });

    cy.get(deleteButton).click();
    cy.get(deleteButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).should('have.text', '');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleItem).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should("not.have.text", "head");
      cy.get(item[1]).children('div').invoke('first').should("have.text", "head");
      cy.get(item[2]).children('div').invoke('last').should("have.text", "tail");
    });

    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('not.be.disabled');
    cy.get(clearButton).should('not.be.disabled');
  });

//========================================================================================================

  it("Очистка очереди работает корректно", () => {
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');

    array.map(val => { pushItem(val) });

    cy.get(clearButton).click();
    
    cy.get(clearButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0]).should('have.text', '');
      cy.get(item[1]).should('have.text', '');
      cy.get(item[2]).should('have.text', '');
    });

    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
  });
});
