const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const generateVideo = () => {
  const uniqueFileName = `video_${uuidv4()}.mp4`; // Nume unic video
  const videoPath = path.join(__dirname, 'public', 'videos', uniqueFileName);

  // Codul pentru generarea video-ului
  // Scrierea fișierului în directorul videos
  fs.writeFileSync(videoPath, videoBuffer);

  return uniqueFileName; // Returnează numele video-ului
};
