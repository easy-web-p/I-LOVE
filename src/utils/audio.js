/**
 * Audio Engine & Romantic Music Presets
 * Provides real HTML5 audio playback, time syncing, and curated royalty-free tracks
 */

export const ROMANTIC_AUDIO_PRESETS = [
  {
    id: "preset-piano-canon",
    title: "Canon in D (Romantic Piano Solo)",
    artist: "Johann Pachelbel (Classical)",
    // High-reliability CDN audio stream for romance / weddings
    url: "https://cdn.freesound.org/previews/612/612607_5674468-lq.mp3",
    duration: 180,
    genre: "Piano"
  },
  {
    id: "preset-acoustic-warmth",
    title: "Acoustic Love & Warm Sun 🌅",
    artist: "Acoustic Romance Ensemble",
    url: "https://cdn.freesound.org/previews/416/416179_5121236-lq.mp3",
    duration: 142,
    genre: "Acoustic"
  },
  {
    id: "preset-lofi-heartbeat",
    title: "Midnight Cafe & Gentle Rain 🌧️☕",
    artist: "Lo-Fi Romance Beats",
    url: "https://cdn.freesound.org/previews/530/530415_11239851-lq.mp3",
    duration: 165,
    genre: "Lo-Fi"
  },
  {
    id: "preset-musicbox-fairytale",
    title: "Music Box Sweet Lullaby 🎠✨",
    artist: "Fairytale Music Box",
    url: "https://cdn.freesound.org/previews/469/469424_7037-lq.mp3",
    duration: 95,
    genre: "Music Box"
  }
];

export function formatAudioTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
