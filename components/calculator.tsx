"use client";

import { useState } from "react";

export default function Calculator() {
    const [firstValue, setFirstValue] = useState<number | null>(null);
    const [secondValue, setSecondValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);
    const [history, setHistory] = useState<{ a: number; b: number; operator: string; result: number | string }[]>([]);

    const handleValueChange = (type: "first" | "second", e: React.ChangeEvent<HTMLInputElement>) => {
        if (operation === "/" && Number(e.target.value) === 0) {
            alert("Cannot divide by zero");
            return;
        }
        
        if (type === "first") {
            setFirstValue(Number(e.target.value));
        } else {
            setSecondValue(Number(e.target.value));
        }
    }

    const handleCalculate = async () => {
        if (firstValue === null || secondValue === null) {
            alert("Please enter a value");
            return;
        }

        let calculatedResult: number;
        switch(operation) {
            case "+":
                calculatedResult = firstValue + secondValue;
                break;
            case "-":
                calculatedResult = firstValue - secondValue;
                break;
            case "*":
                calculatedResult = firstValue * secondValue;
                break;
            case "/":
                if (secondValue === 0) {
                    alert("Cannot divide by zero");
                    return;
                }
                calculatedResult = firstValue / secondValue;
                break;
            default:
                alert("Please select an operation");
                return;
        }

        setResult(calculatedResult);

        // Send operation to API
        await fetch("/api/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                a: firstValue,
                b: secondValue,
                operator: operation,
                result: calculatedResult
            }),
        });

        // Update history
        const response = await fetch("/api/history");
        const data = await response.json();
        setHistory(data);
    }

    return (
        <div>
            <h1>Calculator</h1>
            <div className="flex">
                <input 
                    type="number" 
                    value={firstValue ?? ""} 
                    onChange={(e) => handleValueChange('first', e)}
                    placeholder="Number A"
                />
                <select 
                    value={operation} 
                    onChange={(e) => setOperation(e.target.value)}
                >
                    <option value="" disabled>Select operation</option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <input 
                    type="number" 
                    value={secondValue ?? ""} 
                    onChange={(e) => handleValueChange("second", e)}
                    placeholder="Number B"
                />
            </div>
            <button onClick={handleCalculate}>Calculate</button>
            <p>Result: {result}</p>

            <h3>History:</h3>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        {entry.a} {entry.operator} {entry.b} = {entry.result}
                    </li>
                ))}
            </ul>
        </div>
    );
}
