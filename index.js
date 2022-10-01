import express  from "express"; 
import bodyParser from "body-parser";

// Routes 
import { drinksRouter } from "./routes/drinks.js"; 
import { foodRouter } from "./routes/food.js"; 
import { merchRouter } from "./routes/merch.js"; 

// Database 
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const app = express(); 

const PORT = process.env.PORT || 8000; 

app.use(bodyParser.urlencoded({ extended: false }))

// Database - JSON file for storage
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
app.db = db; 
await db.read(); 
await db.write(); 

// Routes 
app.use("/drinks", drinksRouter);
app.use("/food", foodRouter); 
app.use("/merch", merchRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 