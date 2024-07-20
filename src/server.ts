import dotenv from "dotenv";
import app from "./app"; // Import the app from app.ts

// Load environment variables
dotenv.config();

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server using the app from app.ts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
