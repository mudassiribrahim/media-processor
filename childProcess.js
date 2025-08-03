// childProcessor.js

const fs = require("fs");

// filePath passed as CLI argument (from spawn)
const filePath = process.argv[2];

fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error("Error reading file stats:", err);
    process.exit(1);
  }

  const result = {
    fileSizeKB: (stats.size / 1024).toFixed(2),
    processedBy: "child_process",
    timestamp: new Date().toISOString(),
  };

  // Send JSON result to parent via stdout
  console.log(JSON.stringify(result));
});
