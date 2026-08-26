import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Russian AURUM landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ru">/i);
  assert.match(html, /Один кошелёк/);
  assert.match(html, /href="\/servisy"/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("renders the canonical services hub and ChatGPT intent page", async () => {
  const hubResponse = await render("/servisy");
  assert.equal(hubResponse.status, 200);
  const hub = await hubResponse.text();
  assert.match(hub, /Как оплачивать зарубежные сервисы/);
  assert.match(hub, /href="\/servisy\/steam"/);
  assert.match(hub, /href="\/servisy\/chatgpt"/);
  assert.match(hub, /"@type":"CollectionPage"/);

  const pageResponse = await render("/servisy/chatgpt");
  assert.equal(pageResponse.status, 200);
  const page = await pageResponse.text();
  assert.match(page, /Виртуальная карта для оплаты ChatGPT/);
  assert.match(page, /Официальный источник/);
  assert.match(page, /"@type":"FAQPage"/);
  assert.match(page, /"@type":"BreadcrumbList"/);
  assert.match(page, /Нет гарантии|не гарантирует/i);
});

test("publishes a machine-readable Russian intent map", async () => {
  const response = await render("/.well-known/search-intents.json", "application/json");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/i);
  const data = await response.json();
  assert.equal(data.language, "ru");
  assert.equal(data.market, "Россия");
  assert.ok(data.intents.length >= 20);
  assert.ok(data.intents.some((intent) => intent.id === "ru-service-chatgpt"));
  assert.ok(data.intents.every((intent) => intent.canonicalPath));
});
