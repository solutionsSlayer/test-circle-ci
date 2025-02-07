import { GET, POST } from "./route";
import httpMocks from "node-mocks-http";
import { NextRequest, NextResponse } from "next/server";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data) => ({ json: data, status: 200 })),
  },
  NextRequest: jest.fn().mockImplementation((req) => ({
    json: () => Promise.resolve(JSON.parse(req.body))
  }))
}));

describe("API /api/history", () => {
  it("devrait appeler GET et retourner une réponse", async () => {
    const spy = jest.spyOn(global, "fetch");
    
    const response = await GET();
    
    expect(spy).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  it("devrait appeler POST et stocker une opération", async () => {
    const req = new NextRequest(JSON.stringify({
      a: 1,
      b: 2,
      operator: '+',
      result: 3
    }));
    
    const response = await POST(req);
    
    expect(response.status).toBe(200);
  });
});