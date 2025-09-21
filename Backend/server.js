const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const dbPath = path.join(__dirname, 'contacts.db');
let db = null;


app.use(express.json());

// API to get all contacts
app.get("/users-contact-details", async (req, res) => {
  const contacts = await db.all("SELECT * FROM contacts");
  res.json(contacts);
}); 




// API to add a new contact
app.post("/add-users-contact-details", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const dbResponse = await db.run(
      "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );
    res.status(201).json({
      message: "Contact Added Successfully",
      contactId: dbResponse.lastID
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// API to delete a contact by ID
app.delete("/delete-users-contact-details/:id", async (req, res) => {
  const { id } = req.params;    
    try {
        const dbResponse = await db.run(
            "DELETE FROM contacts WHERE id = ?",
            [id]
        );
        if (dbResponse.changes === 0) {
            res.status(404).json({ error: "Contact Not Found" });
        } else {
            res.json({ message: "Contact Deleted Successfully" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


// Init DB + Server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create table if missing
    await db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT
      )
    `);
    
    app.listen(5000, () => {
      console.log("🚀 Server running at http://localhost:5000");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
