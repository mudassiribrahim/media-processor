const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const crypto = require("crypto");

// Generate SHA256 hash of the uploaded file
function generateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (chunk) => {
      hash.update(chunk);
    });

    stream.on("end", () => {
      resolve(hash.digest("hex"));
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
}

generateFileHash(workerData.file)
  .then((hash) => {
    parentPort.postMessage({
      task: "file hash generation",
      hash,
      doneBy: "worker_thread",
    });
  })
  .catch((err) => {
    parentPort.postMessage({
      error: err.message,
      doneBy: "worker_thread",
    });
  });
