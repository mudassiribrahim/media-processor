import express from "express";
import cluster from "cluster";
import multer from "multer";
import path from "path";
import mediaController from "./controllers/media-controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

app.post("/upload", upload.single("file"), mediaController.handleUpload);

app.listen(PORT, () =>
  console.log(
    ` Server is running at http://localhost:${PORT} | PID: ${process.pid} | Worker: ${cluster.worker?.id}`
  )
);
