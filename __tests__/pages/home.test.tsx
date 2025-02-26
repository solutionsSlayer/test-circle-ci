import { render, screen } from "@testing-library/react";
import Home from "@/pages/home";

describe("Home Page", () => {
  it("renders calculator component", () => {
    render(<Home />);
    
    // Check that calculator is rendered
    expect(screen.getByText("Calculator")).toBeInTheDocument();
    
    // Check page title
    expect(document.title).toBe("Create Next App");
    
    // Check calculator interface elements
    expect(screen.getByPlaceholderText("Number A")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Number B")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Calculate")).toBeInTheDocument();
  });
}); 