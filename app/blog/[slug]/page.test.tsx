/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";

describe("Blog Page", () => {
  it("renders blog page", async () => {
    await render(
      <Page 
        params={Promise.resolve({ slug: "test-post" })} 
        searchParams={Promise.resolve({})} 
      />
    );
    // Add your assertions here
  });
});
