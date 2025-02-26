/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/pages/home";

describe("Calculator", () => {
  beforeEach(() => {
    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("performs calculation correctly", async () => {
    render(<Home />);
    
    // Fill in the fields
    const inputA = screen.getByPlaceholderText("Number A");
    const inputB = screen.getByPlaceholderText("Number B");
    const operation = screen.getByRole("combobox");
    
    fireEvent.change(inputA, { target: { value: "5" } });
    fireEvent.change(inputB, { target: { value: "3" } });
    fireEvent.change(operation, { target: { value: "+" } });
    
    // Mock API responses
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { a: 5, b: 3, operator: "+", result: 8 }
        ])
      }));

    // Perform calculation
    fireEvent.click(screen.getByText("Calculate"));
    
    // Check result
    expect(screen.getByText("Result: 8")).toBeInTheDocument();
    
    // Wait for history update
    await waitFor(() => {
      const historyItem = screen.getByRole("listitem");
      expect(historyItem).toHaveTextContent("5 + 3 = 8");
    });
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