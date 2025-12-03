// GSAP Page Fade In
window.onload = () => {
    gsap.from("body", { opacity: 0, duration: 1.2 });
};

// Login Function
function loginUser() {
    window.location.href = "intro.html";
}

// Dashboard Navigation
function goTo(page) {
    window.location.href = page;
}

// ------------ CHATGPT API --------------------
const API_KEY = "YOUR_OPENAI_API_KEY";

async function sendMessage() {
    const input = document.getElementById("userInput").value;
    if (!input) return;

    addChatMessage("user", input);
    document.getElementById("userInput").value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an AI medical assistant." },
                { role: "user", content: input }
            ]
        })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    addChatMessage("bot", botReply);
}

// Add Message to Chat UI
function addChatMessage(sender, text) {
    const box = document.getElementById("chatBox");
    const div = document.createElement("div");

    div.classList.add("chat-msg");
    div.classList.add(sender);
    div.innerText = text;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}
