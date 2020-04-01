/// <reference path="../support/index.d.ts" />

import {
  devices,
  getHeader,
  getFilters,
  getCloseFiltersBtn,
  getOpenFiltersBtn,
  getSearchContainer
} from "./utils";

describe("Search page", () => {
  devices.forEach(deviceType => {
    describe(deviceType, () => {
      beforeEach(() => {
        // prevent window.fetch, fallback on xhr for cypress compat
        cy.on("window:before:load", win => {
          delete win.fetch;
        });

        // select the device
        cy.device(deviceType);

        // go to search page
        cy.visit("/search");
      });

      it("smoke test search page", () => {
        // should have a header
        getHeader().should("be.visible");

        // should have a filters panel only visible by default on large devices
        getFilters()
          .shouldBeVisibleWhen(deviceType === "large")
          .within(() => {
            // the close filters button should not be visible
            getCloseFiltersBtn().should("not.be.visible");

            // should have a reset filters button
            cy.contains("button", "reset filters");

            // should have major sections
            cy.contains("Only with published results");
            cy.contains("Recruitment Status");
            cy.contains("Therapeutic Classes")
              .parent()
              // within the therapeutic classes section
              .within(() => {
                // there should be an algolia search input
                cy.get(".ais-SearchBox-input");
                // and a show more button
                cy.contains("button", "Show more");
              });
            cy.contains("Registration date")
              .parent()
              // within the registration date section
              .within(() => {
                // there should be a slider
                cy.get(".rheostat");
              });
            cy.contains("Surrogate Outcome");
            cy.contains("Study Type");
            cy.contains("Countries");
          });

        // should have a open filters button not visible on large devices
        getOpenFiltersBtn().shouldBeVisibleWhen(deviceType !== "large");

        // should have a search container
        getSearchContainer()
          .should("be.visible")
          .within(() => {
            // should have a search box
            cy.get("input").should(
              "have.attr",
              "placeholder",
              "Search by keyword, drug, NCTID, ..."
            );

            // should have suggestions
            cy.contains("or try our suggestions")
              .parent()
              .within(() => {
                cy.get("a").should("have.length.greaterThan", 0);
              });

            // should show number of trials found
            cy.contains(/\d+ trials found/);

            // should show first 20 trial cards
            cy.get(".ais-Hits-item").should("have.length", 20);

            // in the first card
            cy.get(".ais-Hits-item:first")
              .children()
              .within(() => {
                // there is a trial reference
                cy.contains("NCT04325672").should("be.visible");
                // a registration date
                cy.contains("Registered on").should("be.visible");
              });
          });
      });
    });
  });
});
