console.log("Website loaded");

// Example: fetch updates
async function loadUpdates() {
    const res = await fetch('http://localhost:3000/api/updates');
    const data = await res.json();

    const container = document.getElementById("updates");

    data.forEach(item => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${item.text}</h3>`;
        container.appendChild(div);
    });
}

loadUpdates();
<script>
// TAB FUNCTION
function openTab(tabId) {
  let tabs = document.getElementsByClassName("tabcontent");

  // hide all sections
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }

  // show selected section
  document.getElementById(tabId).style.display = "block";
}

// Show default tab on load
window.onload = function () {
  showSlides(); // keep your slider working
  openTab("about"); // default tab
};
</script>
