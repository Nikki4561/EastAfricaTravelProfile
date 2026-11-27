const test = require("node:test");
const assert = require("node:assert/strict");
const MemoryManager = require("../memoryManager.js");

// fake storage 4 testing
function makeManager(memories) {
  let data = JSON.stringify(memories);

  return new MemoryManager({
    getItem: () => data,
    setItem: (key, value) => {
      data = value;
    }
  });
}

// test 4 deleting mem
test("Delete saved memory", () => {
  const manager = makeManager([
    { country: "Kenya", place: "Nairobi" },
    { country: "Tanzania", place: "Zanzibar" }
  ]);

  assert.equal(manager.deleteMemory(0), true);
  assert.deepEqual(manager.getMemories(), [
    { country: "Tanzania", place: "Zanzibar" }
  ]);
});

// test 4 invalid input
test("Reject invalid memory index", () => {
  const manager = makeManager([
    { country: "Kenya" }
  ]);

  assert.equal(manager.deleteMemory(5), false);
  assert.equal(manager.getMemories().length, 1);
});

// test 4 empty list
test("Cannot delete from empty list", () => {
  const manager = makeManager([]);

  assert.equal(manager.deleteMemory(0), false);
  assert.equal(manager.getMemories().length, 0);
});

// test 4 country filter
test("Filter mem by country", () => {
  const manager = makeManager([
    { country: "Kenya", place: "Nairobi" },
    { country: "Tanzania", place: "Zanzibar" }
  ]);

  assert.deepEqual(manager.filterMemories("Kenya"), [
    { country: "Kenya", place: "Nairobi" }
  ]);
});

// test 4 all countries
test("Show all saved mem", () => {
  const manager = makeManager([
    { country: "Kenya" },
    { country: "Tanzania" },
    { country: "Seychelles" },
    { country: "Mauritius" }
  ]);

  assert.deepEqual(
    manager.filterMemories("all"),
    manager.getMemories()
  );
});

// test 4 no saved mem
test("No mem 4 selected country", () => {
  const manager = makeManager([
    { country: "Kenya" }
  ]);

  assert.deepEqual(manager.filterMemories("Mauritius"), []);
});
