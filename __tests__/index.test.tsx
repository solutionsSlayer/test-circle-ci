/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/pages/home/index";

describe("Home", () => {
  it("renders the calculator component", () => {
    render(<Home />);
    
    // Verify calculator is rendered by checking for its inputs
    expect(screen.getByPlaceholderText("Number A")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Number B")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
