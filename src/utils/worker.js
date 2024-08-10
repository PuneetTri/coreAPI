const { parentPort, workerData } = require("worker_threads");

const { code, reqData } = workerData;

const func = new Function("req", "res", code);

let responseSent = false;

// Simulate an Express `res` object
const res = {
  status: (statusCode) => {
    return {
      json: (response) => {
        responseSent = true;
        parentPort.postMessage({
          success: true,
          response: { statusCode, response },
        });
      },
      send: (response) => {
        responseSent = true;
        parentPort.postMessage({
          success: true,
          response: { statusCode, response },
        });
      },
    };
  },
  json: (response) => {
    responseSent = true;
    parentPort.postMessage({
      success: true,
      response: { statusCode: 200, response },
    });
  },
  send: (response) => {
    responseSent = true;
    parentPort.postMessage({
      success: true,
      response: { statusCode: 200, response },
    });
  },
};

try {
  // Execute the user's code
  Promise.resolve(func(reqData, res))
    .then(() => {
      // If no response was sent, indicate that execution completed successfully
      if (!responseSent) {
        parentPort.postMessage({
          success: true,
          response: { statusCode: 200, response: "Execution completed." },
        });
      }
    })
    .catch((error) =>
      parentPort.postMessage({ success: false, error: error.message })
    );
} catch (error) {
  parentPort.postMessage({ success: false, error: error.message });
}
