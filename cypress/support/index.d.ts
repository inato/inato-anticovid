/// <reference types="cypress" />

type DeviceType = "small" | "medium" | "large";

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    device(type: DeviceType): Chainable<Element>;
  }
}
