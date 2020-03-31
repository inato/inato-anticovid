/// <reference path="../support/index.d.ts" />

const getHeader = () => cy.dataCy("header");
const getIntro = () => cy.dataCy("analysis/intro");
const getTableau = () => cy.dataCy("analysis/tableau");
const getFooter = () => cy.dataCy("analysis/footer");
const getDisclaimer = () => cy.dataCy("analysis/disclaimer");
const getFeedback = () => cy.dataCy("analysis/feedback");

const devices: DeviceType[] = ["large", "medium", "small"];
describe("Analysis page", () => {
  devices.forEach(deviceType => {
    describe(deviceType, () => {
      beforeEach(() => {
        cy.on("window:before:load", win => {
          delete win.fetch;
        });
        cy.device(deviceType);
        cy.visit("/");
      });

      it("smoke test analysis page", () => {
        // should redirect to analysis page
        cy.location("pathname").should("eq", "/analysis");

        // should have a header
        getHeader().within(() => {
          // should have the logo top left
          cy.get(`[alt="Inato Anti-Covid Logo"]`);

          // Should have links to analysis and search trial pages
          cy.contains("a", "Analysis").should("have.class", "active");
          cy.contains("a", "Search trials");

          // Should have send us feedback link
          cy.contains("a", "Send us feedback").then($elt => {
            // is visible only on large device
            const isVisible = deviceType === "large";
            cy.wrap($elt.is(":visible")).should("eq", isVisible);
          });
        });

        // Should have intro section
        getIntro().within(() => {
          cy.contains("What is anticovid?");
          cy.contains("Where the data comes from").click();
          cy.contains("Most of the data comes");
          cy.contains("Who we are").click();
          cy.contains("Anticovid is provided by Inato");
        });

        // Should have tableau section
        getTableau().within(() => {
          cy.contains("Clinical research for Covid-19");
        });

        // Should have a feeback section
        getFeedback()
          .within(() => {
            cy.contains("Any questions or comments?");
            cy.contains("a", "Send us feedback");
          })
          .then(e =>
            cy.wrap(e).then($elt => {
              // is not visible on large device
              const isVisible = deviceType !== "large";
              cy.wrap($elt.is(":visible")).should("eq", isVisible);
            })
          );

        // Should have footer section
        getFooter().within(() => {
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
