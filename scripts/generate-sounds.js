/**
 * Generates correct.wav (ascending ding) and wrong.wav (descending buzz)
 * into assets/sounds/. Run once with: node scripts/generate-sounds.js
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'sounds');
fs.mkdirSync(OUT_DIR, { recursive: true });

function writeWav(filePath, sampleRate, samples) {
  const dataSize = samples.length * 2; // 16-bit
  const buf = Buffer.alloc(44 + dataSize);

  buf.write('RIFF', 0, 'ascii');
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write('WAVE', 8, 'ascii');
  buf.write('fmt ', 12, 'ascii');
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);            // PCM
  buf.writeUInt16LE(1, 22);            // mono
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36, 'ascii');
  buf.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-32768, Math.min(32767, Math.round(samples[i])));
    buf.writeInt16LE(clamped, 44 + i * 2);
  }

  fs.writeFileSync(filePath, buf);
  console.log('Written:', filePath);
}

const SR = 22050;

// ── Correct: two ascending tones (C5 → E5) ──────────────────────────────────
function makeCorrect() {
  const tones = [
    { freq: 523.25, dur: 0.13 },  // C5
    { freq: 659.25, dur: 0.20 },  // E5
  ];
  const gap = Math.floor(SR * 0.03);
  const allSamples = [];

  for (const { freq, dur } of tones) {
    const n = Math.floor(SR * dur);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const attack  = Math.min(1, i / (SR * 0.008));
      const release = Math.min(1, (n - i) / (SR * 0.07));
      allSamples.push(Math.sin(2 * Math.PI * freq * t) * attack * release * 0x7FFF * 0.75);
    }
    // tiny gap of silence between tones
    for (let i = 0; i < gap; i++) allSamples.push(0);
  }

  writeWav(path.join(OUT_DIR, 'correct.wav'), SR, allSamples);
}

// ── Wrong: descending sweep with vibrato ─────────────────────────────────────
function makeWrong() {
  const dur = 0.38;
  const n = Math.floor(SR * dur);
  const samples = [];

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const progress = i / n;
    const freq = 320 - progress * 130 + Math.sin(2 * Math.PI * 14 * t) * 7;
    const attack  = Math.min(1, i / (SR * 0.008));
    const release = Math.min(1, (n - i) / (SR * 0.09));
    samples.push(Math.sin(2 * Math.PI * freq * t) * attack * release * 0x7FFF * 0.70);
  }

  writeWav(path.join(OUT_DIR, 'wrong.wav'), SR, samples);
}

makeCorrect();
makeWrong();
