// Header
export const getHeader = () => cy.dataCy("header");

// Analysis
export const getIntro = () => cy.dataCy("analysis/intro");
export const getTableau = () => cy.dataCy("analysis/tableau");

// Search
export const getFilters = () => cy.dataCy("search/filters");
export const getSearchContainer = () => cy.dataCy("search/container");
export const getOpenFiltersBtn = () => cy.dataCy("search/filters/mobile-open");
export const getCloseFiltersBtn = () =>
cy.dataCy("search/filters/mobile-close");

// Methodology
export const getMethodologyMain = () => cy.dataCy("methodology/main");

// Common
export const getFooter = () => cy.dataCy("CTAFooter");
export const getDisclaimer = () => cy.dataCy("disclaimer");
export const getFeedback = () => cy.dataCy("feedback");

// Device types
export const devices: DeviceType[] = ["large", "medium", "small"];
