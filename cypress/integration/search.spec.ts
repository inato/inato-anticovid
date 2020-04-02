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
            cy.contains(/\d+ trials found/)
              .invoke("text")
              .as("TotalNumberOfTrials");

            // should show first 20 trial cards
            cy.get(".ais-Hits-item").should("have.length", 20);

            // in the first card
            cy.get(".ais-Hits-item:first")
              .children()
              .within(() => {
                // there is a trial reference
                cy.contains(/NCT\d+/).should("be.visible");
                // a registration date
                cy.contains("Registered on").should("be.visible");
              });
          });

        // use search bar
        getSearchContainer().within(() => {
          // search for a prefix NCT04321
          cy.get("input").type("NCT04321");
          // multiple trials found
          cy.contains(/\d+ trials found/)
            .invoke("text")
            .shouldNotEqAlias("@TotalNumberOfTrials");
          // type 993, text is now NCT04321993
          cy.get("input").type("993");
          // exactly 1 trial found
          cy.contains("1 trial found");
          // type abc, text is now NCT04321993abc
          cy.get("input").type("abc");
          // no trials found
          cy.contains("0 trial found");
          // empty result shows up
          cy.contains("No trial was found with these criteria");
          cy.contains("Try to broaden your search or remove some filters");
          // clear search results
          cy.get("button[type=reset]").click();
          cy.get("input").should("have.text", "");
          cy.contains(/\d+ trials found/)
            .invoke("text")
            .shouldEqAlias("@TotalNumberOfTrials");
        });

        // open filters
        if (deviceType !== "large") {
          getOpenFiltersBtn().click();
        }

        // use filters
        getFilters()
          // now visible on all devices
          .should("be.visible")
          // toggle the published results flag
          .contains("Only with published results")
          .parent()
          .within(() => {
            // capture the count of published results
            cy.get(".ais-ToggleRefinement-count")
              .invoke("text")
              .as("OnlyPublishedCount");
            // and click on the checkbox
            cy.get(".ais-ToggleRefinement-checkbox").click();
          });

        // close filters
        if (deviceType !== "large") {
          getCloseFiltersBtn().click();
          getFilters().should("not.be.visible");
        }

        // check that the results are filtered
        getSearchContainer().within(() => {
          cy.get<string>("@OnlyPublishedCount").then(count => {
            cy.contains(`${count} trials found`);
            cy.get(".ais-Hits-item").should(
              "have.length.greaterThan",
              // cypress does not have a "have.length.greaterThanOrEqual"
              parseInt(count) - 1
            );
          });
        });

        // open filters
        if (deviceType !== "large") {
          getOpenFiltersBtn().click();
        }

        // reset filters
        getFilters()
          .contains("button", "reset filters")
          .click();
        getSearchContainer()
          .contains(/\d+ trials found/)
          .invoke("text")
          .shouldEqAlias("@TotalNumberOfTrials");

        // close filters
        if (deviceType !== "large") {
          getCloseFiltersBtn().click();
          getFilters().should("not.be.visible");
        }

        // use first suggestion
        getSearchContainer().within(() => {
          cy.server();
          cy.route("POST", /\/queries/).as("AlgoliaQuery");
          cy.contains("or try our suggestions")
            .parent()
            .get("a:first")
            .click();
          cy.wait("@AlgoliaQuery");
          cy.contains(/\d+ trials found/)
            .invoke("text")
            .shouldNotEqAlias("@TotalNumberOfTrials");
        });

        // open filters
        if (deviceType !== "large") {
          getOpenFiltersBtn().click();
        }

        // reset filters
        getFilters()
          .contains("button", "reset filters")
          .click();
        getSearchContainer()
          .contains(/\d+ trials found/)
          .invoke("text")
          .shouldEqAlias("@TotalNumberOfTrials");

        // close filters
        if (deviceType !== "large") {
          getCloseFiltersBtn().click();
          getFilters().should("not.be.visible");
        }
      });
    });
  });
});
