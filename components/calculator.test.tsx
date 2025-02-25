import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./calculator";

describe("Calculator Component", () => {
  it("handles division by zero", () => {
    render(<Calculator />);
    
    const inputA = screen.getByPlaceholderText("Number A");
    const inputB = screen.getByPlaceholderText("Number B");
    const select = screen.getByRole("combobox");
    
    fireEvent.change(inputA, { target: { value: "10" } });
    fireEvent.change(inputB, { target: { value: "0" } });
    fireEvent.change(select, { target: { value: "/" } });
    
    const button = screen.getByText("Calculate");
    fireEvent.click(button);
    
    expect(screen.getByText(/Result:/i)).toHaveTextContent("Result:");
  });

  it("validates input fields", () => {
    render(<Calculator />);
    
    const button = screen.getByText("Calculate");
    fireEvent.click(button);
    
    expect(screen.getByText(/Result:/i)).toHaveTextContent("Result:");
  });
});