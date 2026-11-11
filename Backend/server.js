import app from "./src/app.js";
import { connectDatabase } from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

await connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
