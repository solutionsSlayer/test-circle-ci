/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClientPage from "./client-page";

jest.mock('next/navigation', () => ({
  useParams: () => ({
    slug: 'test-post'
  }),
  useSearchParams: () => null
}));

describe("Blog Page", () => {
  it("renders blog page", () => {
    const { container } = render(
      <ClientPage />
    );
    
    expect(container).toHaveTextContent("Slug: test-post");
  });
});
