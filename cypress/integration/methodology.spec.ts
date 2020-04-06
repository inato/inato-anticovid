/// <reference path="../support/index.d.ts" />

import {
    devices,
    getFeedback,
    getFooter,
    getHeader,
    getMethodologyMain,
  } from "./utils";
  
  describe("Methodology page", () => {
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
          cy.visit("/methodology");
        });
  
        it("smoke test methodology page", () => {  
          // should have a header
          getHeader()
            .should("be.visible")
            .within(() => {
              // should have the logo top left
              cy.get(`[alt="Inato Anti-Covid Logo"]`);
  
              // Should have links to analysis and search trial pages
              cy.contains("a", "Analysis");
              cy.contains("a", "Search trials");
              cy.contains("a", "Methodology").should("have.class", "active");
  
              // Should have send us feedback link
              cy.contains("a", "Send us feedback").shouldBeVisibleWhen(
                deviceType === "large"
              );
            });
  
          // Should have the main section
          getMethodologyMain()
            .should("be.visible")
            .within(() => {
              cy.contains("Methodology");
              cy.contains("Where do we find trials?").click();
              cy.contains("Trials listed in Anticovid");
              cy.contains("How often is updated our dataset?").click();
              cy.contains("Every day");
              cy.contains("Where do we find publications of results?").click();
              cy.contains("we are leveraging several aggregators");
              cy.contains("What processing is done for each trial?").click();
              cy.contains("First, already structured data");
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
  
              cy.contains("Explore ongoing clinical trials");
              cy.contains("searching trials").click();
              cy.location("pathname").should("eq", "/search");
            });
        });
      });
    });
  });
  