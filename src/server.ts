import dotenv from "dotenv";
import app from "./app";

// Load environment variables
dotenv.config();

// Define the port
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Successfully connected to API");
});

// Start the server using the app from app.ts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
