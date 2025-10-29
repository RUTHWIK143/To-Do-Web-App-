// Helper selectors
const qs = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);

// Tab switching
qsa(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    qsa(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;
    qsa("[data-panel]").forEach(p => (p.hidden = p.id !== target));
  });
});

/* ---------------------------
   TODO APP
--------------------------- */
const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const list = qs("#todoList");
const input = qs("#newTask");

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    const div = document.createElement("div");
    div.textContent = t;
    div.className = "todo-item";
    div.addEventListener("click", () => {
      tasks.splice(i, 1);
      saveTasks();
    });
    list.appendChild(div);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

qs("#addTaskBtn").addEventListener("click", () => {
  if (input.value.trim()) {
    tasks.push(input.value.trim());
    input.value = "";
    saveTasks();
  }
});

renderTasks();

/* ---------------------------
   WEATHER (needs API key)
--------------------------- */
const API_KEY = "YOUR_API_KEY";

qs("#fetchWeather").addEventListener("click", async () => {
  const city = qs("#cityInput").value.trim();
  if (!city) return;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await res.json();
  qs("#weatherContent").textContent = `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
});

/* ---------------------------
   CHAT SIMULATION
--------------------------- */
const chatMessages = JSON.parse(localStorage.getItem("chat") || "[]");
const msgBox = qs("#messages");
const chatInput = qs("#chatInput");

function renderChat() {
  msgBox.innerHTML = "";
  chatMessages.forEach(m => {
    const div = document.createElement("div");
    div.textContent = m;
    msgBox.appendChild(div);
  });
  msgBox.scrollTop = msgBox.scrollHeight;
}

qs("#sendMsg").addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;
  chatMessages.push(text);
  localStorage.setItem("chat", JSON.stringify(chatMessages));
  chatInput.value = "";
  renderChat();
});

renderChat();

/* ---------------------------
   PORTFOLIO ACTIVITY CHART
--------------------------- */
const canvas = qs("#activityChart");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const data = Array.from({ length: 20 }, () => Math.random() * 100);
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = i * 40;
    const y = 160 - v;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.strokeStyle = "#6ee7b7";
  ctx.lineWidth = 2;
  ctx.stroke();
}
