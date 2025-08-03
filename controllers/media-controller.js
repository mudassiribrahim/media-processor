import fs, { read } from "fs";
import spawn from "child_process";
import { Worker } from "worker_threads";

const handleUpload = (req, res) => {
  const filePath = req.file.path;
  const readStream = fs.createReadStream(filePath);

  let totalBytes = 0;
  let chunkIndex = 0;

  console.log(`Starting upload for file: ${filePath}`);

  readStream.on("data", (chunk) => {
    const buffer = Buffer.from(chunk);
    totalBytes += buffer.length;
    chunkIndex++;
  });

  readStream.on("end", () => {
    console.log(`stream completed running child process for file: ${filePath}`);
  });

  const childProcess = spawn("node", ["childProcessor.js", filePath]);

  let childOutput = "";

  childProcess.stdout.on("data", (data) => {
    childOutput += data.toString();
  });
  childProcess.stderr.on("data", (data) => {
    console.error(`Child process error: ${data}`);
  });

  childProcess.on("close", (code) => {
    if (code === 0) {
      console.log(`Child process exited with code ${code}`);
    } else {
      console.error(`Child process exited with code ${code}`);
    }
  });

  let childResult = {};

  try {
    childResult = JSON.parse(childOutput);
  } catch (error) {
    console.error(`Error parsing child process output: ${error}`);
  }
  const worker = new Worker("./workerProcessor.js", {
    workerData: { file: filePath },
  });

  worker.on("message", (workerResult) => {
    console.log(`Worker result: ${JSON.stringify(result)}`);
  });

  res.json({
    message: "File uploaded successfully",
    file: req.file.filename,
    totalChunks: chunkIndex,
    streamSizeKB: (totalBytes / 1024).toFixed(2),
    childProcessResult: childResult,
    workerResult: workerResult,
  });

  worker.on("error", (error) => {
    console.error(`Worker error: ${error}`);
    res.status(500).json({ error: "Error processing file" });
  });

  readStream.on("error", (error) => {
    console.error(`Error uploading file: ${error}`);
    res.status(500).json({ error: "Error uploading file" });
  });
};

export default {
  handleUpload,
};
