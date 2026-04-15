console.log("App loaded");

// ======================
// SLIDER
// ======================
let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll(".slides");

  slides.forEach(s => s.style.display = "none");

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 4000);
}

// ======================
// TABS
// ======================
const tabs = document.querySelectorAll(".tablink");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    // remove active states
    document.querySelectorAll(".tabcontent").forEach(c =>
      c.classList.remove("active-tab")
    );

    tabs.forEach(t => t.classList.remove("active"));

    // activate selected
    document.getElementById(target).classList.add("active-tab");
    tab.classList.add("active");
  });
});

// ======================
// LOAD UPDATES
// ======================
async function loadUpdates() {
  try {
    const res = await fetch('/api/updates'); // production-safe
    const data = await res.json();

    const container = document.getElementById("updates");
    container.innerHTML = "";

    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<h3>${item.text}</h3>`;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Failed to load updates", err);
  }
}

// ======================
// INIT
// ======================
window.addEventListener("load", () => {
  showSlides();
  loadUpdates();
});
