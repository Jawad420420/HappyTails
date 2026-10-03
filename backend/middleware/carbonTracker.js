import { co2 } from "@tgwf/co2";

const carbonEstimator = new co2({ model: "swd" });

export const carbonStats = {
  requests: 0,
  totalBytes: 0,
  totalCO2: 0,
};

export const carbonTracker = (req, res, next) => {
  let responseBytes = 0;

  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);

  res.write = (chunk, ...args) => {
    if (chunk) {
      responseBytes += Buffer.isBuffer(chunk)
        ? chunk.length
        : Buffer.byteLength(chunk);
    }

    return originalWrite(chunk, ...args);
  };

  res.end = (chunk, ...args) => {
    if (chunk) {
      responseBytes += Buffer.isBuffer(chunk)
        ? chunk.length
        : Buffer.byteLength(chunk);
    }

    const requestBytes =
      Number(req.headers["content-length"] || 0) ||
      Buffer.byteLength(JSON.stringify(req.body || {}));

    const totalBytes = requestBytes + responseBytes;

    // false = server is not assumed to be hosted on green energy
    const emissions = carbonEstimator.perByte(totalBytes, false);

    carbonStats.requests += 1;
    carbonStats.totalBytes += totalBytes;
    carbonStats.totalCO2 += emissions;

    console.log(
      `[Carbon] ${req.method} ${req.originalUrl} | ` +
      `${(totalBytes / 1024).toFixed(2)} KB | ` +
      `${emissions.toFixed(6)} g CO2`
    );

    return originalEnd(chunk, ...args);
  };

  next();
};