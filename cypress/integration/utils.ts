// Header
export const getHeader = () => cy.dataCy("header");

// Analysis
export const getIntro = () => cy.dataCy("analysis/intro");
export const getTableau = () => cy.dataCy("analysis/tableau");
export const getFooter = () => cy.dataCy("analysis/footer");
export const getDisclaimer = () => cy.dataCy("analysis/disclaimer");
export const getFeedback = () => cy.dataCy("analysis/feedback");

// Search
export const getFilters = () => cy.dataCy("search/filters");
export const getSearchContainer = () => cy.dataCy("search/container");
export const getOpenFiltersBtn = () => cy.dataCy("search/filters/mobile-open");
export const getCloseFiltersBtn = () =>
  cy.dataCy("search/filters/mobile-close");

// Device types
export const devices: DeviceType[] = ["large", "medium", "small"];
