// @ts-nocheck

document.addEventListener("DOMContentLoaded", function () {

    const addBtn = document.getElementById("addBtn");
    const toolsMenu = document.getElementById("toolsMenu");
    const closeTools = document.getElementById("closeTools");

    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");

    const menuBtn = document.getElementById("menuBtn");
    const profileBtn = document.getElementById("profileBtn");
    const micBtn = document.getElementById("micBtn");

    const mainContent = document.getElementById("mainContent");
    const welcome = document.getElementById("welcome");

    const navItems = document.querySelectorAll(".nav-item");
    const toolItems = document.querySelectorAll(".tool-item");


    // =========================
    // PLUS BUTTON
    // =========================

    addBtn.addEventListener("click", function () {

        toolsMenu.classList.toggle("show");

    });


    // =========================
    // CLOSE PLUS MENU
    // =========================

    closeTools.addEventListener("click", function () {

        toolsMenu.classList.remove("show");

    });


    // =========================
    // SEND MESSAGE
    // =========================

    function sendMessage() {

        const text = messageInput.value.trim();

        if (text === "") {

            messageInput.focus();

            return;
        }


        // Hide welcome screen

        welcome.style.display = "none";


        // =========================
        // USER MESSAGE
        // =========================

        const message = document.createElement("div");

        message.className = "user-message";

        message.innerHTML = `
            <div class="message-bubble">
                ${escapeHTML(text)}
            </div>
        `;

        mainContent.appendChild(message);


        // Clear input

        messageInput.value = "";


        // Scroll down

        mainContent.scrollTop =
            mainContent.scrollHeight;


        // =========================
        // AI MESSAGE
        // =========================

        const aiMessage =
            document.createElement("div");

        aiMessage.className = "ai-message";

        aiMessage.innerHTML = `
            <div class="ai-bubble">

                <div class="ai-name">
                    🤖 AI Study Helper
                </div>

                <div class="ai-thinking">
                    Thinking...
                </div>

            </div>
        `;

        mainContent.appendChild(aiMessage);


        mainContent.scrollTop =
            mainContent.scrollHeight;


        // =========================
        // TEMPORARY AI RESPONSE
        // =========================

        setTimeout(function () {

            const thinking =
                aiMessage.querySelector(".ai-thinking");

            if (thinking) {

                thinking.textContent =
                    "Your AI answer will appear here.";

            }

            mainContent.scrollTop =
                mainContent.scrollHeight;

        }, 1200);

    }


    // SEND BUTTON

    sendBtn.addEventListener("click", function () {

        sendMessage();

    });


    // ENTER KEY

    messageInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    // =========================
    // MENU
    // =========================

    menuBtn.addEventListener("click", function () {

        showPanel(
            "☰ Menu",
            `
                <button class="panel-button" id="newChatBtn">
                    ➕ New Chat
                </button>

                <button class="panel-button" id="historyBtn">
                    🕘 History
                </button>

                <button class="panel-button" id="studyToolsBtn">
                    🧰 Study Tools
                </button>

                <button class="panel-button" id="settingsBtn">
                    ⚙️ Settings
                </button>
            `
        );


        document.getElementById("newChatBtn").onclick =
            function () {

                newChat();

                closePanel();

            };


        document.getElementById("historyBtn").onclick =
            function () {

                showFeature(
                    "🕘 History",
                    "آپ کی پچھلی study conversations یہاں نظر آئیں گی۔"
                );

            };


        document.getElementById("studyToolsBtn").onclick =
            function () {

                showFeature(
                    "🧰 Study Tools",
                    "یہاں آپ کے مختلف study tools موجود ہوں گے۔"
                );

            };


        document.getElementById("settingsBtn").onclick =
            function () {

                showFeature(
                    "⚙️ Settings",
                    "App settings یہاں manage کی جائیں گی۔"
                );

            };

    });


    // =========================
    // PROFILE
    // =========================

    profileBtn.addEventListener("click", function () {

        showFeature(
            "👤 Profile",
            "یہ آپ کا Profile Area ہے۔ یہاں بعد میں account، settings اور preferences شامل ہوں گی۔"
        );

    });


    // =========================
    // MICROPHONE
    // =========================

    micBtn.addEventListener("click", function () {

        showFeature(
            "🎤 Voice",
            "یہ Voice Input Area ہے۔ بعد میں یہاں microphone اور voice-to-text functionality شامل کی جائے گی۔"
        );

    });


    // =========================
    // TOOL BUTTONS
    // =========================

    toolItems.forEach(function (tool) {

        tool.addEventListener("click", function () {

            const name = tool.dataset.name;

            toolsMenu.classList.remove("show");


            const features = {

                "Image": [
                    "📷 Add Image",
                    "یہاں بعد میں تصویر upload کرنے کا option آئے گا۔"
                ],

                "File": [
                    "📁 Add File",
                    "یہاں بعد میں file upload اور reading functionality آئے گی۔"
                ],

                "PDF": [
                    "📄 Create PDF",
                    "یہاں بعد میں PDF create اور edit کرنے کے options آئیں گے۔"
                ],

                "Excel": [
                    "📊 Create Excel",
                    "یہاں بعد میں spreadsheet create اور edit کی جائے گی۔"
                ],

                "Document": [
                    "📝 Document",
                    "یہاں بعد میں documents create اور edit کیے جائیں گے۔"
                ],

                "Generate Image": [
                    "🎨 Generate Image",
                    "یہاں بعد میں AI image generation functionality آئے گی۔"
                ],

                "Link": [
                    "🔗 Add Link",
                    "یہاں بعد میں webpage یا link کو analyze کرنے کا option آئے گا۔"
                ],

                "Quiz": [
                    "🧠 Create Quiz",
                    "یہاں بعد میں AI سے study quizzes بنائے جائیں گے۔"
                ]

            };


            const feature = features[name];


            if (feature) {

                showFeature(
                    feature[0],
                    feature[1]
                );

            }

        });

    });


    // =========================
    // BOTTOM NAVIGATION
    // =========================

    navItems.forEach(function (item) {

        item.addEventListener("click", function () {


            navItems.forEach(function (nav) {

                nav.classList.remove("active");

            });


            item.classList.add("active");


            const page = item.dataset.page;


            // HOME

            if (page === "Home") {

                closePanel();

                toolsMenu.classList.remove("show");

                messageInput.focus();

            }


            // HISTORY

            if (page === "History") {

                showFeature(
                    "🕘 History",
                    "آپ کی previous study chats یہاں نظر آئیں گی۔"
                );

            }


            // PROFILE

            if (page === "Profile") {

                showFeature(
                    "👤 Profile",
                    "آپ کا profile area یہاں ہوگا۔"
                );

            }

        });

    });


    // =========================
    // SHOW FEATURE
    // =========================

    function showFeature(title, description) {

        showPanel(
            title,
            `
                <div class="feature-icon">
                    ${title.substring(0, 2)}
                </div>

                <h2>${title}</h2>

                <p class="feature-description">
                    ${description}
                </p>

                <div class="feature-status">

                    ✓ یہ button صحیح طرح کام کر رہا ہے۔

                    <br><br>

                    اصل functionality اگلے مرحلے میں شامل کریں گے۔

                </div>
            `
        );

    }


    // =========================
    // CREATE PANEL
    // =========================

    function showPanel(title, content) {

        closePanel();


        const panel =
            document.createElement("div");


        panel.id = "activePanel";

        panel.className = "active-panel";


        panel.innerHTML = `

            <div class="panel-header">

                <button id="panelBack">
                    ←
                </button>

                <strong>
                    ${title}
                </strong>

                <button id="panelClose">
                    ×
                </button>

            </div>


            <div class="panel-content">

                ${content}

            </div>

        `;


        document.body.appendChild(panel);


        document.getElementById("panelBack").onclick =
            closePanel;


        document.getElementById("panelClose").onclick =
            closePanel;

    }


    // =========================
    // CLOSE PANEL
    // =========================

    function closePanel() {

        const panel =
            document.getElementById("activePanel");


        if (panel) {

            panel.remove();

        }

    }


    // =========================
    // NEW CHAT
    // =========================

    function newChat() {


        // Remove user messages

        document
            .querySelectorAll(".user-message")
            .forEach(function (message) {

                message.remove();

            });


        // Remove AI messages

        document
            .querySelectorAll(".ai-message")
            .forEach(function (message) {

                message.remove();

            });


        // Show welcome screen

        welcome.style.display = "flex";


        // Clear input

        messageInput.value = "";


        // Focus input

        messageInput.focus();

    }


    // =========================
    // SECURITY
    // =========================

    function escapeHTML(text) {

        const div =
            document.createElement("div");


        div.textContent = text;


        return div.innerHTML;

    }


    // =========================
    // PANEL DESIGN
    // =========================

    const panelStyle =
        document.createElement("style");


    panelStyle.textContent = `

        .active-panel {

            position: fixed;

            inset: 0;

            z-index: 9999;

            background: #f7f8fc;

            overflow-y: auto;

        }


        .panel-header {

            height: 64px;

            background: white;

            border-bottom: 1px solid #e5e7ef;

            display: flex;

            align-items: center;

            justify-content: space-between;

            padding: 0 14px;

            font-size: 17px;

        }


        .panel-header button {

            width: 40px;

            height: 40px;

            border: none;

            border-radius: 50%;

            background: #f1f2f7;

            font-size: 23px;

            cursor: pointer;

        }


        .panel-content {

            padding: 25px 18px;

            text-align: center;

        }


        .panel-button {

            width: 100%;

            padding: 18px;

            margin-bottom: 10px;

            border: 1px solid #e5e7ef;

            border-radius: 15px;

            background: white;

            text-align: left;

            font-size: 16px;

            cursor: pointer;

        }


        .panel-button:active {

            transform: scale(.98);

            background: #f0f1f7;

        }


        .feature-icon {

            font-size: 55px;

            margin: 35px 0 15px;

        }


        .feature-description {

            color: #737887;

            line-height: 1.7;

            font-size: 15px;

            margin-top: 12px;

        }


        .feature-status {

            background: white;

            border: 1px solid #e5e7ef;

            border-radius: 18px;

            padding: 20px;

            margin-top: 25px;

            line-height: 1.5;

        }


        /* USER MESSAGE */

        .user-message {

            width: 100%;

            display: flex;

            justify-content: flex-end;

            margin: 15px 0;

        }


        .message-bubble {

            max-width: 80%;

            background: #5b5ce2;

            color: white;

            padding: 12px 16px;

            border-radius: 18px 18px 4px 18px;

            font-size: 15px;

            line-height: 1.5;

            word-break: break-word;

        }


        /* AI MESSAGE */

        .ai-message {

            width: 100%;

            display: flex;

            justify-content: flex-start;

            margin: 15px 0;

        }


        .ai-bubble {

            max-width: 85%;

            background: white;

            border: 1px solid #e5e7ef;

            color: #171923;

            padding: 14px 16px;

            border-radius: 18px 18px 18px 4px;

            font-size: 15px;

            line-height: 1.6;

            box-shadow: 0 4px 15px rgba(30, 35, 70, 0.05);

        }


        .ai-name {

            font-weight: bold;

            margin-bottom: 6px;

        }


        .ai-thinking {

            color: #737887;

        }

    `;


    document.head.appendChild(panelStyle);


    console.log(
        "AI Study Helper loaded successfully."
    );

});