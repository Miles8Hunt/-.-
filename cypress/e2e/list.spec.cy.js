import { listUrl, inputValue, indexValue, circle, circleSmall, circleItem,
         defaultState, changingState, modifiedState,
         addAtHeadButton, addAtTailButton, addAtIndexButton,
         deleteAtHeadButton, deleteAtTailButton, deleteAtIndexButton,
} from "../constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";


const value = "A";
const index = "1";

const getCirclesData = (array) => {
  cy.get(circle).then((item) => {
    cy.get(item).children().each((el) => {
      array.push(el.text());
    });
  });
};

describe("Проверка визуализации алгоритма 'Связанный список'", () => {
  beforeEach(() => {
    cy.visit(listUrl);
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get(inputValue).should('have.value', '');
    cy.get(indexValue).should('have.value', '');
    cy.get(addAtHeadButton).should('be.disabled');
    cy.get(addAtTailButton).should('be.disabled');
    cy.get(deleteAtHeadButton).should('not.be.disabled');
    cy.get(deleteAtTailButton).should('not.be.disabled');
    cy.get(addAtIndexButton).should('be.disabled');
    cy.get(deleteAtIndexButton).should('be.disabled');
  });

//========================================================================================================

  it("Добавление элемента в head реализовано корректно", () => {
    cy.get(inputValue).type(value);
    cy.get(addAtHeadButton).should('not.be.disabled');
    cy.get(addAtHeadButton).click();

    cy.get(addAtHeadButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));

    cy.get(circleItem).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[0]).find(circleSmall).children().should('have.text', value);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[0]).children().should('have.text', value);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should('have.text', value);
    });

    cy.get(inputValue).should('have.text', '');
    cy.get(addAtHeadButton).should('be.disabled');
  });

//========================================================================================================

  it("Добавление элемента в tail реализовано корректно", () => {
    let circlesArr = [];
    getCirclesData(circlesArr);
    cy.get(inputValue).type(value);
    cy.get(addAtTailButton).should('not.be.disabled');
    cy.get(addAtTailButton).click();

    cy.get(addAtTailButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));

    cy.get(circleItem).then((item) => {
      cy.get(item[circlesArr.length - 1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[circlesArr.length - 1]).find(circleSmall).children().should('have.text', value);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[circlesArr.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[circlesArr.length]).children().should('have.text', value);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[circlesArr.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[circlesArr.length]).children().should('have.text', value);
    });

    cy.get(inputValue).should('have.text', '');
    cy.get(addAtTailButton).should('be.disabled');
  });

//========================================================================================================

  it("Добавление элемента по индексу реализовано корректно", () => {
    cy.get(inputValue).type(value);
    cy.get(indexValue).type(index);
    cy.get(addAtIndexButton).should('not.be.disabled');
    cy.get(addAtIndexButton).click();

    cy.get(addAtIndexButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleItem).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[0]).find(circleSmall).children().should("have.text", value);
      cy.get(item[0])
        .find(`[class*=${defaultState}]`)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleItem).then((item) => {
      cy.get(item[0])
        .find(`[class*=${changingState}]`)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[1])
        .find(`[class*=${defaultState}]`)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[1]).find(circleSmall).children().should("have.text", value);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
    });

    cy.get(indexValue).should('have.text', '');
    cy.get(inputValue).should('have.text', '');
    cy.get(addAtIndexButton).should('be.disabled');
  });

//========================================================================================================

  it("Удаление элемента из head реализовано корректно", () => {
    let circlesArr = [];
    getCirclesData(circlesArr);
    cy.get(deleteAtHeadButton).should('not.be.disabled');
    cy.get(deleteAtHeadButton).click();

    cy.get(deleteAtHeadButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));

    cy.get(circleItem).then((item) => {
      cy.get(item[0]).children().then((item) => {
        cy.get(item[1]).children().should("have.text", "");
      });
    });

    cy.get(circleItem).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[0])
        .find(circleSmall)
        .children()
        .should("have.text", circlesArr[0]);
    });
  });

//========================================================================================================

  it("Удаление элемента из tail реализовано корректно", () => {
    let circlesArr = [];
    getCirclesData(circlesArr);
    cy.get(deleteAtTailButton).should('not.be.disabled');
    cy.get(deleteAtTailButton).click();

    cy.get(deleteAtTailButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));

    cy.get(circleItem).then((item) => {
      cy.get(item[circlesArr.length - 1])
        .children()
        .then((item) => {
          cy.get(item[1]).children().should("have.text", "");
        });
    });

    cy.get(circleItem).then((item) => {
      cy.get(item[circlesArr.length - 1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[circlesArr.length - 1])
        .find(circleSmall)
        .children()
        .should("have.text", circlesArr[circlesArr.length - 1]);
    });
  });

//========================================================================================================

  it("Удаление элемента по индексу реализовано корректно", () => {
    let circlesArr = [];
    getCirclesData(circlesArr);
    cy.get(indexValue).type(index);
    cy.get(deleteAtIndexButton).should('not.be.disabled');
    cy.get(deleteAtIndexButton).click();

    cy.get(deleteAtIndexButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[1]).children().should("have.text", "");
    });

    cy.get(circleItem).then((item) => {
      cy.get(item[index])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[1])
        .find(circleSmall)
        .children()
        .should("have.text", circlesArr[index]);
    });
    
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(indexValue).should("have.text", "");
    cy.get(deleteAtIndexButton).should("be.disabled");
  });
});
