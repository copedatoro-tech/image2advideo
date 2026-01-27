// video-jobs.ts

type VideoJobStatus = "pending" | "processing" | "done" | "error";

interface VideoJob {
  sessionId: string;
  email: string;
  status: VideoJobStatus;
  createdAt: number;
}

const jobs = new Map<string, VideoJob>();

export function createJob(sessionId: string, email: string) {
  jobs.set(sessionId, {
    sessionId,
    email,
    status: "pending",
    createdAt: Date.now(),
  });

  console.log("🎬 Job created:", sessionId);
}

export function startJob(sessionId: string) {
  const job = jobs.get(sessionId);
  if (!job) return;

  job.status = "processing";
  console.log("🚀 Job started:", sessionId);

  // simulăm generarea video (AI)
  setTimeout(() => {
    job.status = "done";
    console.log("✅ Job finished:", sessionId);
  }, 5000);
}

export function getJob(sessionId: string) {
  return jobs.get(sessionId) || null;
}
