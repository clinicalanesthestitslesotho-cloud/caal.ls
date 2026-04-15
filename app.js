const API = "/api"; // production safe

// ======================
// AUTH CHECK
// ======================
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

// ======================
// LOGIN
// ======================
async function login() {
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("message").innerText = "Invalid login";
    }

  } catch (err) {
    alert("Server error");
  }
}

// ======================
// LOGOUT
// ======================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// ======================
// LOAD UPDATES
// ======================
async function loadUpdates() {
  try {
    const res = await fetch(`${API}/updates`);
    const data = await res.json();

    const container = document.getElementById("updates");
    if (!container) return;

    container.innerHTML = "";

    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <img src="/uploads/${item.image}" />
        <p>${item.text}</p>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

// ======================
// POST UPDATE (ADMIN)
// ======================
async function postUpdate() {
  const formData = new FormData();
  formData.append("title", document.getElementById("title").value);
  formData.append("content", document.getElementById("content").value);
  formData.append("image", document.getElementById("image").files[0]);

  await fetch(`${API}/updates`, {
    method: "POST",
    body: formData
  });

  alert("Posted!");
}

// ======================
// AUTO LOAD
// ======================
window.addEventListener("load", () => {
  if (window.location.pathname.includes("dashboard")) {
    checkAuth();
    loadUpdates();
  }

  if (window.location.pathname.includes("admin")) {
    checkAuth();
  }
});
