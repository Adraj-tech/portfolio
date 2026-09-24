
const KNOWLEDGE = [
  {
    keywords: ["hi", "hello", "hey", "yo", "sup"],
    reply: "Hey there! 👋 I'm Adarsh's portfolio assistant. Ask me about his projects, skills, education, or how to contact him."
  },
  {
    keywords: ["project", "projects", "work", "built", "made", "portfolio"],
    reply: "Adarsh has built a few cool things:<br>🌦 <b>Weather Report App</b> — real-time weather using a live API.<br>📝 <b>Bharat Diaries</b> — a full-stack blogging platform with auth, deployed on Render + Neon PostgreSQL.<br>🚆 <b>Railway Ticket Confirmation Predictor</b> — a machine learning project he's currently building, in progress!<br>Scroll to the Projects section to see live demo links!"
  },
  {
    keywords: ["currently", "working on", "right now", "these days", "in progress", "railway", "ticket", "train", "predictor", "confirmation"],
    reply: "🚧 Right now Adarsh is building a <b>Railway Ticket Confirmation Predictor</b> — a machine learning project that predicts whether a waitlisted/RAC train ticket will get confirmed, based on historical booking data."
  },
  {
    keywords: ["skill", "skills", "tech", "technology", "stack", "language", "languages", "know"],
    reply: "Adarsh works with <b>HTML, CSS, JavaScript, Python, C, Machine Learning, Git, and Bootstrap</b>, plus Node.js, Express.js and PostgreSQL for full-stack work. He's also actively exploring AI/ML frameworks and deep learning."
  },
  {
    keywords: ["certification", "certifications", "certificate", "certified", "udemy", "course", "courses"],
    reply: "Adarsh has completed:<br>🏆 <b>Complete Full Stack Web Development</b> — Udemy<br>🏆 <b>Machine Learning</b> — Udemy"
  },
  {
    keywords: ["hobby", "hobbies", "free time", "fun", "interest", "interests", "cricket", "chess", "play"],
    reply: "Outside of tech, Adarsh enjoys 🏏 <b>Cricket</b> and ♟️ <b>Chess</b>!"
  },
  {
    keywords: ["ai", "ml", "machine learning", "artificial intelligence", "aiml", "deep learning"],
    reply: "Adarsh is a 3rd-year B.Tech student specializing in <b>Artificial Intelligence and Machine Learning</b> at BIT Mesra — his goal is to become a well-rounded AI engineer bridging cutting-edge tech with practical solutions."
  },
  {
    keywords: ["education", "college", "university", "study", "studying", "degree", "school", "bit", "mesra", "timeline"],
    reply: "🎓 B.Tech (AIML), Birla Institute of Technology, Mesra — 2024 to Present<br>📘 12th, BSEB Patna — 2021–2023<br>📗 10th, Don Bosco High School, Siwan (Bihar) — 2020–2021"
  },
  {
    keywords: ["contact", "email", "mail", "reach", "phone", "number", "call"],
    reply: "You can reach Adarsh at <b>adarshraj22336@gmail.com</b> or call/WhatsApp <b>+91-9341270429</b>. There's also a Contact section below with clickable icons!"
  },
  {
    keywords: ["location", "where", "live", "based", "city", "address"],
    reply: "Adarsh is based in <b>Patna, Bihar, India</b> (studying at BIT Mesra)."
  },
  {
    keywords: ["resume", "cv", "download"],
    reply: "You can download Adarsh's resume using the 'Download Resume' button in the About section!"
  },
  {
    keywords: ["github", "linkedin", "social", "instagram", "twitter"],
    reply: "You'll find all of Adarsh's social links — GitHub, LinkedIn, Instagram, Twitter — in the footer at the bottom of this page. 🔗"
  },
  {
    keywords: ["hire", "job", "work with", "available", "opportunity", "freelance"],
    reply: "Adarsh is a student currently exploring opportunities and open to internships/collaborations — the best way to reach out is via email or the contact section!"
  },
  {
    keywords: ["who are you", "what are you", "bot", "robot"],
    reply: "I'm a lightweight AI assistant built right into this site — no server, no API key, just JavaScript matching your question to what I know about Adarsh. 🤖"
  },
  {
    keywords: ["thank", "thanks", "thank you"],
    reply: "You're welcome! Let me know if you want to know anything else about Adarsh. 😊"
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    reply: "Thanks for stopping by! Feel free to reopen this chat anytime. 👋"
  }
];

const FALLBACKS = [
  "I'm not sure about that one — try asking about Adarsh's projects, skills, education, or contact info!",
  "Hmm, I don't have an answer for that yet. Try asking about his projects or skills!",
  "I couldn't quite catch that. Ask me about Adarsh's education, tech stack, or how to reach him."
];

function getBotReply(userText) {
  const text = userText.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    for (const kw of entry.keywords) {
      if (text.includes(kw)) {
        const score = kw.length;
        if (score > bestScore) {
          bestScore = score;
          best = entry;
        }
      }
    }
  }

  if (best) return best.reply;
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("ai-chat-toggle");
  const chatWindow = document.getElementById("ai-chat-window");
  const closeBtn = document.getElementById("ai-chat-close");
  const messagesEl = document.getElementById("ai-chat-messages");
  const inputEl = document.getElementById("ai-chat-input");
  const sendBtn = document.getElementById("ai-chat-send");
  const chips = document.querySelectorAll(".ai-suggestion-chip");

  let greeted = false;

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = "ai-msg ai-msg-" + sender;
    msg.innerHTML = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "ai-msg ai-msg-bot ai-typing";
    typing.id = "ai-typing-indicator";
    typing.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById("ai-typing-indicator");
    if (t) t.remove();
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    inputEl.value = "";
    showTyping();

    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      removeTyping();
      addMessage(getBotReply(text), "bot");
    }, delay);
  }

  toggleBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
    if (!greeted) {
      greeted = true;
      showTyping();
      setTimeout(() => {
        removeTyping();
        addMessage("Hi! I'm an AI assistant for Adarsh's portfolio. Ask me about his projects, skills, education, or how to get in touch! 🤖", "bot");
      }, 600);
    }
  });

  closeBtn.addEventListener("click", () => chatWindow.classList.remove("open"));

  sendBtn.addEventListener("click", () => handleUserMessage(inputEl.value));
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserMessage(inputEl.value);
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => handleUserMessage(chip.textContent));
  });
});