# 📁 High-Performance Media Processing Backend

This project demonstrates a production-grade Node.js backend that efficiently handles **large file uploads** using:

- 🔄 Streaming and Buffering
- 🔧 Child Processes (`spawn`)
- 🧠 Worker Threads for CPU-bound tasks
- 🚀 Clustering for full CPU utilization

---

## 🧠 Features

- File streaming with backpressure-safe chunks
- Child process for metadata extraction
- Worker threads for heavy CPU simulations
- Cluster-based load balancing across all cores
- Real-time logging of chunks, memory usage, and process PID

