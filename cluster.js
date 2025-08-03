import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;
if (cluster.isMaster) {
  {
    console.log(`Master ${process.pid} is running`);
    console.log(`Forking ${numCPUs} workers...`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork(); // Restart worker
    });
  }
} else {
  {
    import("./server.js");
  }
}
