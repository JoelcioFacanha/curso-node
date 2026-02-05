const handlers = require("../handlers");

describe("handlers", () => {
  test("home handler", () => {
    const req = {};
    const res = { render: jest.fn() };
    handlers.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe("home");
  });
});

describe("about handler", () => {
  test("about handler", () => {
    const req = {};
    const res = { render: jest.fn() };
    handlers.about(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("about");
    expect(res.render.mock.calls[0][1]).toHaveProperty("fortune");
  });
});

describe("notFound handler", () => {
  test("notFound handler", () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), render: jest.fn() };
    handlers.notFound(req, res);
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.render.mock.calls[0][0]).toBe("404");
  });
});

describe("serverError handler", () => {
  test("serverError handler", () => {
    const err = new Error("some error");
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), render: jest.fn() };
    const next = jest.fn();
    handlers.serverError(err, req, res, next);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("500");
  });
});
