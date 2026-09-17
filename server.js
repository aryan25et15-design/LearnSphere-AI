const http = require("http");

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Test route
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "online",
      app: "LearnSphere AI"
    }));
    return;
  }

  // AI chat route
  if (req.method === "POST" && req.url === "/api/chat") {
    if (!OPENAI_API_KEY) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        error: "OPENAI_API_KEY is not configured."
      }));
      return;
    }

    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        const message = data.message;

        if (!message || typeof message !== "string") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            error: "Message is required."
          }));
          return;
        }

        const response = await fetch(
          "https://api.openai.com/v1/responses",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
              model: "gpt-5.6-luna",
              input: message
            })
          }
        );

        const result = await response.json();

        if (!response.ok) {
          res.writeHead(response.status, {
            "Content-Type": "application/json"
          });

          res.end(JSON.stringify({
            error: result.error || "OpenAI API error"
          }));

          return;
        }

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          reply: result.output_text || "No response received."
        }));

      } catch (error) {
        console.error(error);

        res.writeHead(500, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          error: "Server error."
        }));
      }
    });

    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    error: "Route not found."
  }));
});

server.listen(PORT, () => {
  console.log(`LearnSphere AI server running on port ${PORT}`);
});
