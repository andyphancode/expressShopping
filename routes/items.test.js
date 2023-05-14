process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let items = require("../fakeDb");

let item = { name: "test", price: 1 };

beforeEach(async () => {
    items.push(item)
  });
  
afterEach(async () => {
    items = []
  });


// Test for returning item(s)

describe("GET /items", function () {
    test("Get all items", async function () {
        const resp = await request(app).get('/items');
        const { items } = resp.body;
        expect(resp.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
})

describe("GET /items/:name", function () {
    test("Gets single item", async function () {
        const resp = await request(app).get(`/items/${item.name}`);
        console.log(item.name, resp.body)
        expect(resp.statusCode).toBe(200);
        expect(resp.body.items).toEqual(item);
    });

    test("404 handling", async function() {
        const resp = await request(app).get(`/items/3450982453890289503`);
        expect(resp.statusCode).toBe(404);
    })
})



// Test for creating item

describe("POST /items", function () {
    test("Create new item", async function () {
      const response = await request(app)
        .post(`/items`)
        .send({
          name: "Bag",
          price: 0
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.items.name).toEqual("Bag");
      expect(response.body.items.price).toEqual(0);
    });
  });

// Test for updating item

describe("PATCH /items/:name", function () {
    test("Update an item", async function () {
      const response = await request(app)
        .patch(`/items/${item.name}`)
        .send({
          name: "Bag"
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual({
        name: "Bag"
      });
    });
  
    test("404 handling", async function () {
      const response = await request(app).patch(`/items/12492148`);
      expect(response.statusCode).toBe(404);
    });
  });

// Test for deleting item

describe("DELETE /items/:name", function () {
    test("Delete an item", async function () {
      const response = await request(app)
        .delete(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Bag was deleted" });
    });
  });

