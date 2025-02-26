/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Home from "@/pages/home";

describe("Calculator", () => {
  beforeEach(() => {
    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
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
    
    await act(async () => {
      fireEvent.change(inputA, { target: { value: "5" } });
      fireEvent.change(inputB, { target: { value: "3" } });
      fireEvent.change(operation, { target: { value: "+" } });
    });

    // Mock API responses
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { a: 5, b: 3, operator: "+", result: 8 }
        ])
      }));

    // Perform calculation
    await act(async () => {
      fireEvent.click(screen.getByText("Calculate"));
    });

    // Wait for history update
    await waitFor(() => {
      expect(screen.getByText("Result: 8")).toBeInTheDocument();
      const historyItem = screen.getByRole("listitem");
      expect(historyItem).toHaveTextContent("5 + 3 = 8");
    });
  });

  it("adds calculation to history", async () => {
    render(<Home />);
    
    // Fill in the fields
    const inputA = screen.getByPlaceholderText("Number A");
    const inputB = screen.getByPlaceholderText("Number B");
    const operation = screen.getByRole("combobox");
    
    await act(async () => {
      fireEvent.change(inputA, { target: { value: "5" } });
      fireEvent.change(inputB, { target: { value: "3" } });
      fireEvent.change(operation, { target: { value: "+" } });
    });

    // Mock API responses
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { a: 5, b: 3, operator: "+", result: 8 }
        ])
      }));

    await act(async () => {
      fireEvent.click(screen.getByText("Calculate"));
    });

    // Wait for the history to update
    await waitFor(() => {
      const historyItem = screen.getByRole("listitem");
      expect(historyItem).toHaveTextContent(/5.*\+.*3.*=.*8/);
    });
  });
}); 