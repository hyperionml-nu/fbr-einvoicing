import "dotenv/config";
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { app } from "../src/app.js";

let server: Server;
let baseUrl = "";

before(async () => {
  server = createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert(address && typeof address === "object");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe("root route", () => {
  test("returns API landing metadata", async () => {
    const response = await fetch(`${baseUrl}/`);
    assert.equal(response.status, 200);

    const body = await response.json() as Record<string, any>;
    assert.equal(body.ok, true);
    assert.equal(body.service, "fbr-einvoicing-api");
    assert.equal(body.docs, "/api-docs");
    assert.equal(body.health, "/health");
  });
});
