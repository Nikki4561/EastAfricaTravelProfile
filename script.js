const form = document.getElementById("memoryForm");
const memoryList = document.getElementById("memoryList");
const countrySelect = document.getElementById("country");

// gettin the most recent saved memories
const manager = new MemoryManager(localStorage);
let memories = manager.getMemories();

// showing the memeories tht weere saved 
function showMemories() {
  memoryList.innerHTML = "";

  memories.forEach(function (item, index) {
    const country = document.getElementById("filterCountry").value;

    // only show selected country
    if (country !== "all" && item.country !== country) {
      return;
    }
    const card = document.createElement("div");
    card.className = "memory-card";

    const title = document.createElement("h3");
    title.textContent = item.country + " - " + item.place;

    const description = document.createElement("p");
    description.textContent = item.memory;

    card.appendChild(title);
    card.appendChild(description);

    // button 4 deleting mem
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Memory";

    deleteButton.addEventListener("click", function () {
      if (manager.deleteMemory(index)) {
        memories = manager.getMemories();
        showMemories();
      }
    });

    card.appendChild(deleteButton);
    memoryList.appendChild(card);
  });
}

// to save the new memory
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const country = countrySelect.value;
  const place = document.getElementById("place").value.trim();
  const memory = document.getElementById("memory").value.trim();

  if (!country || !place || !memory) {
    alert("Please complete all fields!");
    return;
  }

  memories.push({
    country: country,
    place: place,
    memory: memory,
  });

  manager.saveMemories(memories);

  showMemories();
  form.reset();
});

// the heart buttons to be able to select the country 
document.querySelectorAll(".countries .heart").forEach(function (button) {
  button.addEventListener("click", function () {
    countrySelect.value = button.dataset.country;
    countrySelect.scrollIntoView({ behavior: "smooth" });
  });
});


showMemories();

// updates mem when country changes
document.getElementById("filterCountry")
  .addEventListener("change", showMemories);
