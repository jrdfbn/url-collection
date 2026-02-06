const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Data file paths
const urlsDataPath = path.join(__dirname, "data", "urls.json");
const aboutDataPath = path.join(__dirname, "data", "about.json");

// Helper function to read data
const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

// Helper function to write data
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// ===== URLs API =====
// Get all URLs
app.get("/api/urls", (req, res) => {
  const data = readData(urlsDataPath);
  res.json(data || { urls: [] });
});

// Add new URL
app.post("/api/urls", (req, res) => {
  const { name, url, description, category, tags } = req.body;

  if (!name || !url || !description || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = readData(urlsDataPath) || { urls: [] };
  const newEntry = {
    id: Date.now(),
    name,
    url,
    description,
    category,
    tags: tags || [],
    createdAt: new Date().toISOString(),
  };

  data.urls.push(newEntry);
  writeData(urlsDataPath, data);

  res.status(201).json(newEntry);
});

// Delete URL
app.delete("/api/urls/:id", (req, res) => {
  const { id } = req.params;
  const data = readData(urlsDataPath);

  if (!data) {
    return res.status(404).json({ error: "Data not found" });
  }

  const index = data.urls.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "URL not found" });
  }

  data.urls.splice(index, 1);
  writeData(urlsDataPath, data);

  res.json({ message: "URL deleted successfully" });
});

// Get categories
app.get("/api/categories", (req, res) => {
  const categories = [
    { id: "online-tools", name: "Online Tools", icon: "🔗" },
    { id: "desktop-apps", name: "Desktop Apps", icon: "💻" },
    { id: "chrome-extensions", name: "Chrome Extensions", icon: "🌐" },
    { id: "vscode-extensions", name: "VSCode Extensions", icon: "📝" },
    { id: "misc", name: "Misc", icon: "📦" },
  ];
  res.json(categories);
});

// ===== About Me API =====
// Get About Me data
app.get("/api/about", (req, res) => {
  const data = readData(aboutDataPath);
  if (!data) {
    return res.status(404).json({ error: "About data not found" });
  }
  res.json(data);
});

// Update About Me data
app.put("/api/about", (req, res) => {
  const newData = req.body;

  if (!newData.name || !newData.tagline) {
    return res.status(400).json({ error: "Name and tagline are required" });
  }

  writeData(aboutDataPath, newData);
  res.json({ message: "About data updated successfully", data: newData });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
