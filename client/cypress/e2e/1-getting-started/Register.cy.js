/// <reference types="cypress" />

describe("open bdswiss login app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("displays login form", () => {
    cy.get("#Card").should("have.length", 1);
    cy.get("#Icon").should("have.length", 1);
    cy.get("#Title").should("have.length", 1);
    cy.get("#name").first().should("have.text", "Name:");
    cy.get("#email").last().should("have.text", "Email Address:");
    cy.get("#password").last().should("have.text", "Password:");
  });

  it("can fill the form", () => {
    cy.get('[data-cy="name"]').type("George").should("have.value", "George");
    cy.get('[data-cy="email"]')
      .type("BDSwiss@rocks.com")
      .should("have.value", "BDSwiss@rocks.com");
    cy.get('[data-cy="password"]')
      .type("Testing123!")
      .should("have.value", "Testing123!");
  });

  it("should display error message on short name", () => {
    cy.get('[data-cy="name"]').type("a");
    cy.get('[data-cy="email"]').click();
    cy.get("#formerrorname").should("have.text", "Too Short!");
  });

  it("should display error message on wrong email address", () => {
    cy.get('[data-cy="email"]').type("BDSwiss");
    cy.get('[data-cy="password"]').click();
    cy.get("#formerror").should("have.text", "Invalid email");
  });

  it("should display error message on empty password ", () => {
    cy.get('[data-cy="password"]').click();
    cy.get('[data-cy="name"]').click();
    cy.get("#formerrorpassword").should("have.text", "Password is Required");
  });

  it("should display error message on wrong password", () => {
    cy.get('[data-cy="password"]').type("123");
    cy.get('[data-cy="name"]').click();
    cy.get("#formerrorpassword").should(
      "have.text",
      "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    );
  });
});
