# Sp*tify sucks! 🎵

> A clean, fast, truly free music player built out of pure frustration with paying for Spotify Premium just to listen to music without ads, forced shuffles, or hourly skip limits.

🌐 **Live App**: [https://spotify-sucks.vercel.app/](https://spotify-sucks.vercel.app/)  
📂 **GitHub Repository**: [https://github.com/darshan-technophile/Spotify-sucks](https://github.com/darshan-technophile/Spotify-sucks)

---

## ⚡ Why This Exists

Listening to uninterrupted music shouldn't require monthly paywalls, 30-second audio commercial interruptions, forced shuffle play, and 6-skip hourly restrictions.

**Sp*tify sucks!** was born out of frustration with subscribing to Spotify Premium just to get an ad-free, unhindered listening experience. It delivers a distraction-free, minimalist web player powered by full-length SoundCloud streaming, official album artwork, and an ultra-fast search engine.

---

## ✨ Features

- **🚫 100% Ad-Free**: Zero audio advertisements, zero interruptions.
- **🎧 Full-Length Master Tracks**: Streams complete songs (never 30-second preview snippets).
- **⚡ Instant 0ms Search**: Verified hit catalog matches on every keystroke with zero latency, plus spam-filtered global search.
- **🖼️ High-Res Album Covers**: Automatically resolves crisp 600×600 album artwork for all tracks.
- **🎛️ Modern Waveform Player**: Interactive scrubbing, real-time playback progress, dynamic waveform visualization, and volume controls.
- **📑 Full Queue Management**: Add tracks to queue, play up next, reorder, or remove songs on the fly.
- **🔗 Direct Link Support**: Paste any `soundcloud.com/...` track URL directly into search to stream immediately.
- **🌍 Regional Trending Music**: Browse popular music tailored to your region (Global, US, UK, India, France, Germany, Japan, Australia, Brazil, Canada).
- **⌨️ Keyboard Shortcuts**:
  - `Space` — Play / Pause
  - `←` / `→` — Rewind / Forward 10 seconds
  - `Ctrl/Cmd` + `→` — Skip to next track in queue
  - `Q` — Open / Close queue drawer
  - `M` — Mute / Unmute audio

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Audio Engine**: Official SoundCloud Widget API + HTML5 Audio
- **Backend / API**: Express.js (Local Dev) & Vercel Serverless Function (`/api/search.ts`)
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/darshan-technophile/Spotify-sucks.git
   cd Spotify-sucks
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🚢 Deployment to Vercel

This repository is pre-configured for seamless zero-config deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Import the repository in your Vercel Dashboard.
3. Vercel automatically detects Vite and the `/api/search.ts` serverless function.
4. Deploy!

---

## 👤 Credits & Author

Created with ❤️ by **Darshan**
- GitHub: [@darshan-technophile](https://github.com/darshan-technophile)
- Repository: [Spotify-sucks](https://github.com/darshan-technophile/Spotify-sucks)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
