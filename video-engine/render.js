const { exec } = require("child_process")
const path = require("path")
const fs = require("fs")

const inputDir = path.join(__dirname, "input")
const outputPublic = path.join(__dirname, "..", "public", "videos")

if (!fs.existsSync(outputPublic)) {
  fs.mkdirSync(outputPublic, { recursive: true })
}

const outputFile = path.join(outputPublic, "result.mp4")

const cmd = `
ffmpeg -y -framerate 1 -i "${inputDir}/%d.jpg" \
-c:v libx264 -r 30 -pix_fmt yuv420p "${outputFile}"
`

exec(cmd, (err) => {
  if (err) {
    console.error("FFMPEG ERROR:", err)
    process.exit(1)
  }
  console.log("VIDEO GENERAT:", outputFile)
})
