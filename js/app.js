import { OPENAI_API_KEY } from "../config.js"
import { FIREBASE_CONFIG} from "../config.js"

// FirebaseのSDKをimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// Firebaseの設定
const firebaseConfig = FIREBASE_CONFIG;

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, "chat");

onChildAdded(dbRef, function (data) {
  const msg = data.val();
  const className = msg.source === 'user' ? 'outgoing' : 'incoming';
  chatbox.appendChild(createChatLi(msg.text, className));
  chatbox.scrollTo(0, chatbox.scrollHeight);
});

// ここから下。AIチャットボットアプリのコード 
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message
const API_KEY = OPENAI_API_KEY;
const inputInitHeight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};
const generateResponse = (chatElement) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };
  // Send POST request to API, get response and set the reponse as paragraph text
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      const aiResponse = data.choices[0].message.content.trim();

      // Save AI response to Firebase
      const aiResponseRef = push(dbRef);
      set(aiResponseRef, { text: aiResponse, source: 'ai' });
      const tempThinking = document.getElementById("temp-thinking");
      if (tempThinking) {
        tempThinking.remove();
      }
    })
    .catch(() => {
      console.error("Error with OpenAI API:", error);
    })
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Save user message to Firebase
  const newPostRef = push(dbRef);
  set(newPostRef, { text: userMessage, source: 'user' });

  // Create and append temporary "Thinking..." message
  const tempChatLi = createChatLi("考え中...", "incoming");
  tempChatLi.id = "temp-thinking"; // Assign an ID for easy removal
  chatbox.appendChild(tempChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Generate AI response
  generateResponse(tempChatLi);

  // setTimeout(() => {
  //   const incomingChatLi = createChatLi("考え中...", "incoming");
  //   chatbox.appendChild(incomingChatLi);
  //   chatbox.scrollTo(0, chatbox.scrollHeight);
  //   generateResponse(incomingChatLi);
  // }, 600);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
