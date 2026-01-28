const { spawn } = require("child_process");
const path = require("path");

function runRender(jobDir) {
  return new Promise((resolve) => {
    const renderProcess = spawn("node", [
      path.join(process.cwd(), "video-engine/render.js"),
      jobDir,
    ]);

    renderProcess.stdout.on("data", (data) => {
      console.log("🎬 Render:", data.toString());
    });

    renderProcess.stderr.on("data", (data) => {
      console.error("❌ Render error:", data.toString());
    });

    renderProcess.on("close", (code) => {
      resolve(code);
    });
  });
}

module.exports = { runRender };
