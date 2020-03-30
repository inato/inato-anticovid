/// <reference path="../support/index.d.ts" />

const devices: DeviceType[] = ["large", "medium", "small"];
describe("Analysis page", () => {
  devices.forEach(deviceType => {
    describe(deviceType, () => {
      beforeEach(() => {
        cy.device(deviceType);
      });

      it("smoke test analysis page", () => {
        cy.visit("/");
        // should redirect to analysis page
        cy.location("pathname").should("eq", "/analysis");

        // should have the logo top left
        cy.get(`[alt="Inato Anti-Covid Logo"]`);

        // Should have links to analysis and search trial pages
        cy.contains("a", "Analysis").should("have.class", "active");
        cy.contains("a", "Search trials");

        // Should have send us feedback link
        // cy.contains("a", "Send us feedback").should("be.visible");

        // Should have section What is anticovid
        cy.contains("What is anticovid?")
          .parent()
          .within(() => {
            cy.contains("Where the data comes from").click();
            cy.contains("Most of the data comes");
            cy.contains("Who we are").click();
            cy.contains("Anticovid is provided by Inato");
          });

        // Should have tableau section
        cy.contains("Clinical research for Covid-19")
          .parent()
          .within(() => {
            // cy.contains("iframe");
          });

        // Should have Stay updated section
        cy.contains("Stay updated with new analysis")
          .parent()
          .within(() => {
            cy.get("input").type("hello@mail.co");
            // cy.get("button").click();
          });

        // Should have a Want to go further section
        cy.contains("Want to go further?")
          .parent()
          .within(() => {
            cy.get("a").click();
            cy.location("pathname").should("eq", "/search");
          });
      });
    });
  });
});
