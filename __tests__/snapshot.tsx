/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import Home from "@/pages/home";

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

it("renders homepage unchanged", async () => {
  const { container } = render(<Home />);
  await new Promise(resolve => setTimeout(resolve, 0)); // Allow async operations to complete
  expect(container).toMatchSnapshot();
});
