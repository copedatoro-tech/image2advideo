"use client";
// ... restul importurilor tale

async function checkRenderStatus() {
  const renderRes = await fetch("/api/render-video", {
    method: "POST",
    body: JSON.stringify({ sessionId: "your-id" })
  });
  
  const renderData = await renderRes.json();
  
  if (renderData.success && renderData.videoUrl) {
    const filename = renderData.videoUrl.split("/").pop();
    console.log("Video gata:", filename);
  }
}