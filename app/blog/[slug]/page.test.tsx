/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";

jest.mock('next/navigation', () => ({
  useParams: () => ({
    slug: 'test-post'
  }),
  useSearchParams: () => null
}));

describe("Blog Page", () => {
  it("renders blog page", () => {
    const { container } = render(
      <Page />
    );
    
    expect(container).toHaveTextContent("Slug: test-post");
  });
});
