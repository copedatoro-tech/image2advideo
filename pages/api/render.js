import { spawn } from "child_process";
import path from "path";

export default function handler(req, res) {
  const { jobDir } = req.body;

  if (!jobDir) {
    return res.status(400).json({ error: "Missing jobDir" });
  }

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
    res.status(200).json({ code });
  });
}
