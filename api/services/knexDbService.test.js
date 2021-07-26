const TestDb = require("../../db/test/testDb");
const KnexDbService = require("./knexDbService");

let testDb;
let knexDb;
let knexDbService;
let entity;

const tableName = "widgets";
const entityName = "widget";

beforeAll(async () => {
  testDb = new TestDb();
  knexDb = await testDb.getKnexDb();
  await knexDb.schema.createTable(tableName, (table) => {
    table.bigincrements("id").primary();
    table.text("name").notNullable().defaultTo("");
    table.integer("height").notNullable().defaultTo(0);
    table.boolean("is_sold").notNullable().defaultTo(true);
  });
});

beforeEach(async () => {
  await testDb.resetDb();
  knexDbService = new KnexDbService(knexDb, tableName, entityName);
});

afterAll(async () => {
  await knexDb.schema.dropTableIfExists(tableName);
  return testDb.destroy();
});

describe("KnexDbService", () => {
  describe("create(entity)", () => {
    beforeAll(() => {
      entity = {
        name: "gear",
        height: 20,
        is_sold: true,
      };
    });

    test("should return object with all properties of the entity", async () => {
      expect(knexDbService.create(entity)).resolves.toMatchObject(entity);
    });

    test("should return object with an id", async () => {
      expect(knexDbService.create(entity)).resolves.toEqual(
        expect.objectContaining({
          id: expect.any(String),
        })
      );
    });
  });
});
