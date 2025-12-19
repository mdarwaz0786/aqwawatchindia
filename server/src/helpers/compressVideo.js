import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";
import fs from "fs";
import ApiError from "./apiError.js";

ffmpeg.setFfmpegPath(ffmpegPath);

const compressVideo = async (
  buffer,
  folder = "common",
  maxSizeMB = 20,
  resolution = 720,
  startBitrate = 1000,
  minBitrate = 500
) => {
  const uploadDir = path.join(process.cwd(), "uploads", folder);
  const tempDir = path.join(process.cwd(), "uploads", "temp");

  fs.mkdirSync(uploadDir, { recursive: true });
  fs.mkdirSync(tempDir, { recursive: true });

  const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const tempInputPath = path.join(tempDir, `${baseName}-input.mp4`);
  const outputPath = path.join(uploadDir, `${baseName}.mp4`);

  fs.writeFileSync(tempInputPath, buffer);

  try {
    let currentBitrate = startBitrate;

    while (currentBitrate >= minBitrate) {
      await new Promise((resolve, reject) => {
        ffmpeg(tempInputPath)
          .videoCodec("libx264")
          .audioCodec("aac")
          .outputOptions([
            `-vf scale=-2:${resolution}`,
            `-b:v ${currentBitrate}k`,
            "-preset veryfast",
            "-movflags +faststart",
          ])
          .save(outputPath)
          .on("end", resolve)
          .on("error", reject);
      });

      const sizeMB = fs.statSync(outputPath).size / (1024 * 1024);

      if (sizeMB <= maxSizeMB) {
        fs.unlinkSync(tempInputPath);
        return `uploads/${folder}/${baseName}.mp4`;
      };

      fs.unlinkSync(outputPath);
      currentBitrate -= 250;
    };

    throw new ApiError(422, "Unable to compress video under size limit. Please upload a shorter video.");
  } catch (err) {
    if (fs.existsSync(tempInputPath)) fs.unlinkSync(tempInputPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    throw new ApiError(400, err.message || "Video is corrupted or unsupported format.");
  }
};

export default compressVideo;
