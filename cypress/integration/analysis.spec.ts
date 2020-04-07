/// <reference path="../support/index.d.ts" />

import {
  devices,
  getFeedback,
  getFooter,
  getHeader,
  getIntro,
  getTableau
} from "./utils";

describe("Analysis page", () => {
  devices.forEach(deviceType => {
    describe(deviceType, () => {
      beforeEach(() => {
        // prevent window.fetch, fallback on xhr for cypress compat
        cy.on("window:before:load", win => {
          delete win.fetch;
        });

        // select the device
        cy.device(deviceType);

        // go to root page
        cy.visit("/");
      });

      it("smoke test analysis page", () => {
        // should redirect to analysis page
        cy.location("pathname").should("eq", "/analysis");

        // should have a header
        getHeader()
          .should("be.visible")
          .within(() => {
            // should have the logo top left
            cy.get(`[alt="Inato Anti-Covid Logo"]`);

            // Should have links to analysis and search trial pages
            cy.contains("a", "Analysis").should("have.class", "active");
            cy.contains("a", "Search trials");

            // Should have send us feedback link
            cy.contains("a", "Send us feedback").shouldBeVisibleWhen(
              deviceType === "large"
            );
          });

        // Should have intro section
        getIntro()
          .should("be.visible")
          .within(() => {
            cy.contains("What is anticovid?");
            cy.contains("Where the data comes from").click();
            cy.contains("Most of the data comes");
            cy.contains("Who we are").click();
            cy.contains("Anticovid is provided by Inato");
          });

        // Should have tableau section
        getTableau()
          .should("be.visible")
          .within(() => {
            cy.contains("Clinical research for Covid-19");
          });

        // Should have a feedback section
        getFeedback()
          .shouldBeVisibleWhen(deviceType !== "large")
          .within(() => {
            cy.contains("Any questions or comments?");
            cy.contains("a", "Send us feedback");
          });

        // Should have footer section
        getFooter()
          .should("be.visible")
          .within(() => {
            cy.server();
            cy.route("POST", /hooks\.zapier\.com/, { status: "success" });

            cy.contains("Stay updated with new analysis");
            cy.get("input").type("hello@mail.co");
            cy.get("button").click();
            cy.contains("You have been successfully subscribed");

            cy.contains("Want to go further?");
            cy.contains("searching trials").click();
            cy.location("pathname").should("eq", "/search");
          });
      });
    });
  });
});
