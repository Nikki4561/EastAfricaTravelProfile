const form = document.getElementById("memoryForm");
const memoryList = document.getElementById("memoryList");
const countrySelect = document.getElementById("country");

// gettin the most recent saved memories
let memories = JSON.parse(localStorage.getItem("memories")) || [];

// showing the memeories tht weere saved 
function showMemories() {
  memoryList.innerHTML = "";

  memories.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "memory-card";

    const title = document.createElement("h3");
    title.textContent = item.country + " - " + item.place;

    const description = document.createElement("p");
    description.textContent = item.memory;

    card.appendChild(title);
    card.appendChild(description);
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

  localStorage.setItem("memories", JSON.stringify(memories));

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
