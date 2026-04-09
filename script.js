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
