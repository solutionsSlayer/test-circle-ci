/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/pages/home/index";

describe("Calculator", () => {
  it("performs calculation correctly", () => {
    render(<Home />);
    
    // Remplir les champs
    const inputA = screen.getByPlaceholderText("Number A");
    const inputB = screen.getByPlaceholderText("Number B");
    const operation = screen.getByRole("combobox");
    
    fireEvent.change(inputA, { target: { value: "5" } });
    fireEvent.change(inputB, { target: { value: "3" } });
    fireEvent.change(operation, { target: { value: "+" } });
    
    // Cliquer sur Calculate
    fireEvent.click(screen.getByText("Calculate"));
    
    // Vérifier le résultat
    expect(screen.getByText("Result: 8")).toBeInTheDocument();
  });

  it("adds calculation to history", () => {
    render(<Home />);
    
    // Effectuer un calcul
    const inputA = screen.getByPlaceholderText("Number A");
    const inputB = screen.getByPlaceholderText("Number B");
    const operation = screen.getByRole("combobox");
    
    fireEvent.change(inputA, { target: { value: "5" } });
    fireEvent.change(inputB, { target: { value: "3" } });
    fireEvent.change(operation, { target: { value: "+" } });
    fireEvent.click(screen.getByText("Calculate"));
    
    // Vérifier l'historique
    expect(screen.getByText("5 + 3 = 8")).toBeInTheDocument();
  });
}); 