// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("device", (type: "small" | "medium" | "large") => {
  switch (type) {
    case "large":
      return cy.viewport(1920, 1080);
    case "medium":
      return cy.viewport(1024, 768);
    case "small":
    default:
      return cy.viewport(320, 568);
  }
});

Cypress.Commands.add("dataCy", (attr: string) => cy.get(`[data-cy="${attr}"]`));

Cypress.Commands.add(
  "shouldBeVisibleWhen",
  { prevSubject: true },
  (subject: Cypress.Chainable<Element>, pred: boolean) =>
    cy.wrap(subject).should(pred ? "be.visible" : "not.be.visible")
);
