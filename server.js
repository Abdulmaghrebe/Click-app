import express from "express";
import ytdl from "ytdl-core";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// تقديم الملفات الثابتة (الفرونت إند)
app.use(express.static(path.join(__dirname, "public")));

// API لتحميل الفيديو
app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL) {
    return res.status(400).send("يرجى إدخال رابط فيديو صحيح!");
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, ""); // تنظيف الاسم

    res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);
    ytdl(videoURL, { quality: "highestvideo" }).pipe(res);
  } catch (error) {
    res.status(500).send("❌ حدث خطأ أثناء تنزيل الفيديو");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
});
