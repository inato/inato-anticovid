/// <reference types="cypress" />

type DeviceType = "small" | "medium" | "large";

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(label: string): Chainable<Element>;

    /**
     * Custom command to set the viewport to a known device type.
     * @example cy.device('small')
     */
    device(type: DeviceType): Chainable<Element>;

    /**
     * Custom command to check if element is visible based on predicate.
     * @example cy.shouldBeVisibleWhen(device === 'small')
     */
    shouldBeVisibleWhen(pred: boolean): Chainable<Element>;

    /**
     * Custom command to check if element is equal to an alias.
     * @example cy.shouldEqAlias("@myAlias")
     */
    shouldEqAlias(alias: string): Chainable<Element>;

    /**
     * Custom command to check if element is not equal to an alias.
     * @example cy.shouldNotEqAlias("@myAlias")
     */
    shouldNotEqAlias(alias: string): Chainable<Element>;
  }
}
