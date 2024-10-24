import "dotenv/config";
import express from "express";
import { verifyKeyMiddleware } from "discord-interactions";

const app = express();
const PORT = process.env.PORT || 3000;

app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.PUBLIC_KEY),
  (req, res) => {
    res.status(201).send("Interaction received!");
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
