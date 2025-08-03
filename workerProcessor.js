import { parentPort, workerData } from "node:worker_threads";

function heavyComputation(file) {
  // Simulate a heavy computation
  let count = 0;
  for (let i = 0; i < 1e9; i++) {
    count += i % 2;
  }
  return {
    task: "heavyComputation",
    frameDetected: count % 500,
    doneBy: "workerProcessor",
  };
}

const result = heavyComputation(workerData.file);
parentPort.postMessage(result);
