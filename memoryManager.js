// manages saved trvel mem
class MemoryManager {
  constructor(storage) {
    this.storage = storage;
  }

  getMemories() {
    return JSON.parse(this.storage.getItem("memories")) || [];
  }

  saveMemories(memories) {
    this.storage.setItem("memories", JSON.stringify(memories));
  }

  // deletes unwanted mem
  // filter mem by country
  filterMemories(country) {
    const memories = this.getMemories();

    if (country === "all") {
      return memories;
    }

    return memories.filter(function (item) {
      return item.country === country;
    });
  }

  deleteMemory(index) {
    const memories = this.getMemories();

    // checks 4 invalid input
    if (!Number.isInteger(index) || index < 0 || index >= memories.length) {
      return false;
    }

    memories.splice(index, 1);
    this.saveMemories(memories);
    return true;
  }
}

// added 4 auto testing
if (typeof module !== "undefined") {
  module.exports = MemoryManager;
}
