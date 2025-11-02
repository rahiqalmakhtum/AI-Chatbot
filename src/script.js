const toggle = document.getElementById("toggle-night");
const html = document.documentElement;
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
  wrapper.className = "self-start rounded-lg p-4 mb-4 max-w-[75%]";

  const innerDiv = document.createElement("div");
  innerDiv.className = "flex gap-4";

  const img = document.createElement("img");
  img.src = "./assets/gemini.png";
  img.alt = "Gemini Logo";
  img.className =
    "h-12 w-12 bg-[#dbe6fb] dark:bg-[#263145] rounded-full p-1 -mt-1";

  const message = document.createElement("p");
  message.textContent = "Just a sec...";

  innerDiv.appendChild(img);
  innerDiv.appendChild(message);
  wrapper.appendChild(innerDiv);

  return wrapper;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const prompt = input.value.trim();
  if (!prompt) return;

  // reset input and buttons
  input.value = "";
  attach.classList.remove("hidden");
  send.classList.add("hidden");

  // create message element
  const messageElement = createUserMessage(prompt);

  // append to chat
  chatContainer.appendChild(messageElement);

  // scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    const messageElement = createBotMessage(prompt);

    chatContainer.appendChild(messageElement);

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 600);
};

form.addEventListener("submit", handleSubmit);
