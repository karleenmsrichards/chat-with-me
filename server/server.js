require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const PORT = process.env.PORT || 3001;

const CLIENT_ID = process.env.CLIENT_ID;
app.use(express.json());
app.use(cors({ origin: true }));

app.get("/clientId", (req, res) => {
  try {
    const clientId = CLIENT_ID;
    if (!clientId) {
      throw new Error("Client ID not found.");
    }
    res.json({ clientId }).status(200);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/verifyToken", (req, res) => {
  const { email, name } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401);
  }

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];
  }
  verify().catch((error) => error);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
