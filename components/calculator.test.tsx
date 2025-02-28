import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders calculator interface', () => {
    render(<Calculator />);

    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Number A')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Number B')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });

  it('performs calculation and updates history', async () => {
    render(<Calculator />);

    // Setup inputs
    const inputA = screen.getByPlaceholderText('Number A');
    const inputB = screen.getByPlaceholderText('Number B');
    const operation = screen.getByRole('combobox');

    fireEvent.change(inputA, { target: { value: '5' } });
    fireEvent.change(inputB, { target: { value: '3' } });
    fireEvent.change(operation, { target: { value: '+' } });

    // Mock API responses
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve()) // POST request
      .mockImplementationOnce(() =>
        Promise.resolve({
          // GET request
          json: () => Promise.resolve([{ a: 5, b: 3, operator: '+', result: 8 }]),
        })
      );

    // Perform calculation
    fireEvent.click(screen.getByText('Calculate'));

    // Check result
    expect(screen.getByText('Result: 8')).toBeInTheDocument();

    // Wait for history update
    const historyEntry = await screen.findByText('5 + 3 = 8');
    expect(historyEntry).toBeInTheDocument();
  });

  it('handles division by zero', () => {
    render(<Calculator />);

    const inputA = screen.getByPlaceholderText('Number A');
    const inputB = screen.getByPlaceholderText('Number B');
    const operation = screen.getByRole('combobox');

    fireEvent.change(inputA, { target: { value: '10' } });
    fireEvent.change(inputB, { target: { value: '0' } });
    fireEvent.change(operation, { target: { value: '/' } });

    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    fireEvent.click(screen.getByText('Calculate'));

    expect(alertMock).toHaveBeenCalledWith('Cannot divide by zero');
    alertMock.mockRestore();
  });
});
