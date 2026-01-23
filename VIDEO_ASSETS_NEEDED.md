# Video Assets Required

## Hero Background Video

The `CinematicHero` component expects video files at:
- `/public/videos/hero-supercar.mp4` (primary, H.264 codec)
- `/public/videos/hero-supercar.webm` (fallback, VP9 codec)

### Specifications:
- **Resolution:** 1920x1080 (Full HD minimum)
- **Duration:** 10-30 seconds (looping)
- **File Size:** < 5MB (optimized for web)
- **Framerate:** 30fps
- **Content:** High-quality footage of a luxury supercar on a track or in motion
- **Audio:** None (video will be muted)

### Recommended Sources:
1. **Pexels Videos** - https://www.pexels.com/videos/
2. **Pixabay Videos** - https://pixabay.com/videos/
3. **Coverr** - https://coverr.co/
4. **Videvo** - https://www.videvo.net/

### Search Terms:
- "luxury car driving"
- "supercar track"
- "sports car motion"
- "premium vehicle cinematic"

### Optimization:
After downloading, compress using:
- **FFmpeg:** `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=1920:1080 hero-supercar.mp4`
- **Online Tools:** CloudConvert, Online Video Compressor

---

## Fallback Poster Image

A poster image is also required at `/public/images/hero-poster.jpg` for:
- Video loading states
- Browsers that don't support video
- Low-bandwidth connections

Currently, a placeholder SVG exists. Replace with a high-quality still frame from your video or a professional supercar photograph.

---

## Blueprint SVGs

The `StickyVehicleDetails` component uses blueprint overlays at:
- `/public/images/blueprints/blueprint-generic.svg` (currently a placeholder)

For production, create or source technical wireframe drawings of each vehicle model in your inventory.

---

**Note:** Until actual video files are added, the `CinematicHero` component will show a fallback poster image. The site is fully functional but the video background animation will not display.
