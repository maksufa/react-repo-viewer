import React from "react";
import { render, screen } from "@testing-library/react";
import Root from "./Root";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

test("renders table headers", () => {
  render(<Root />);
  const nameHeader = screen.getByText(/name/i);
  expect(nameHeader).toBeInTheDocument();

  const starsHeader = screen.getByText(/stars/i);
  expect(starsHeader).toBeInTheDocument();

  const forksHeader = screen.getByText(/forks/i);
  expect(forksHeader).toBeInTheDocument();
});
