import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./calculator";

test("Addition works correctly", () => {
    render(<Calculator />);
    const inputA = screen.getByPlaceholderText("Number A");
    const inputB = screen.getByPlaceholderText("Number B");
    const select = screen.getByRole("combobox");
    const button = screen.getByText("Calculate");
    const result = screen.getByText(/Result:/i);

    fireEvent.change(inputA, { target: { value: "5" } });
    fireEvent.change(inputB, { target: { value: "3" } });
    fireEvent.change(select, { target: { value: "+" } });
    fireEvent.click(button);

    expect(result).toHaveTextContent("Result: 8");
});