const toggle = document.getElementById("toggle-night");
const html = document.documentElement;
const quickStart = document.querySelector(".quick-start");
const form = document.querySelector(".prompt-form");
const input = document.getElementById("prompt-input");
const attach = document.getElementById("attach");
const send = document.getElementById("send");
const chatContainer = document.querySelector(".chat-container");

toggle.addEventListener("click", () => {
  html.classList.toggle("dark");
});

input.addEventListener("input", () => {
  if (input.value.trim().length > 0) {
    attach.classList.add("hidden");
    send.classList.remove("hidden");
  } else {
    send.classList.add("hidden");
    attach.classList.remove("hidden");
  }
});

const createUserMessage = (content) => {
  const wrapper = document.createElement("div");
  wrapper.className =
    "self-end leading-relaxed bg-[#dbe6fb] dark:bg-[#263145] rounded-tr-lg rounded-tl-lg rounded-bl-lg rounded-br-sm p-4 mb-4 max-w-[75%]";
  wrapper.textContent = content;
  return wrapper;
};

const createBotMessage = (content) => {
  const wrapper = document.createElement("div");
  wrapper.className = "self-start rounded-lg py-4 pr-4 mb-4 max-w-[75%]";

  const innerDiv = document.createElement("div");
  innerDiv.className = "flex gap-4";

  const img = document.createElement("img");
  img.src = "./assets/gemini.png";
  img.alt = "Gemini Logo";
  img.className =
    "avatar h-12 w-12 bg-[#dbe6fb] dark:bg-[#263145] rounded-full p-1 -mt-2";

  const message = document.createElement("p");
  message.textContent = "Just a sec...";

  innerDiv.appendChild(img);
  innerDiv.appendChild(message);
  wrapper.appendChild(innerDiv);

  return wrapper;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const prompt = input.value.trim();
  if (!prompt) return;

  input.value = "";
  attach.classList.remove("hidden");
  send.classList.add("hidden");
  quickStart.classList.add("hidden");

  chatContainer.appendChild(createUserMessage(prompt));
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const botPlaceholder = createBotMessage("Just a sec...");
  chatContainer.appendChild(botPlaceholder);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const res = await fetch("http://localhost:3000/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();

  const loadingImg = botPlaceholder.querySelector("img");
  loadingImg.classList.remove("avatar"); // Remove rotating class
  botPlaceholder.querySelector("p").textContent = data.text;
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

form.addEventListener("submit", handleSubmit);
