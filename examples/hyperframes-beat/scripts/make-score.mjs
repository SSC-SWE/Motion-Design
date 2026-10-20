// Synthesize the Motion-Design ad score: 120 BPM kick, off-beat tick, and a whoosh at each phase cut.
// Pure Node, no deps, seeded PRNG so the score is reproducible. Output: assets/score_raw.wav
// (normalize to -14 LUFS / -2 dBTP with ffmpeg loudnorm afterwards).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 48000;
const DUR = 15;
const N = SR * DUR;
const L = new Float64Array(N);
const R = new Float64Array(N);

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20261020);

function kick(t0, amp = 0.6) {
  const dur = 0.16;
  const s0 = Math.round(t0 * SR);
  for (let i = 0; i < dur * SR; i++) {
    const t = i / SR;
    const f = 58 * Math.exp(-t * 4) + 38;
    const env = Math.exp(-t * 26);
    const v = Math.sin(2 * Math.PI * f * t) * env * amp;
    const idx = s0 + i;
    if (idx < N) {
      L[idx] += v;
      R[idx] += v;
    }
  }
}

function tick(t0, amp = 0.18) {
  const dur = 0.05;
  const s0 = Math.round(t0 * SR);
  for (let i = 0; i < dur * SR; i++) {
    const t = i / SR;
    const n = rnd() * 2 - 1;
    const env = Math.exp(-t * 90);
    const v = n * env * amp;
    const idx = s0 + i;
    if (idx < N) {
      L[idx] += v;
      R[idx] += v;
    }
  }
}

function whoosh(t0, amp = 0.28) {
  const dur = 0.5;
  const s0 = Math.round(t0 * SR);
  let lp = 0;
  for (let i = 0; i < dur * SR; i++) {
    const t = i / SR;
    const env = Math.sin((Math.PI * t) / dur);
    const n = rnd() * 2 - 1;
    lp = lp * 0.86 + n * 0.14;
    const v = lp * env * amp;
    const idx = s0 + i;
    if (idx < N) {
      L[idx] += v;
      R[idx] += v;
    }
  }
}

// 120 BPM: beat every 0.5 s, 30 beats.
for (let b = 0; b < 30; b++) {
  const t = b * 0.5;
  kick(t);
  tick(t + 0.25); // off-beat
}

// Whoosh at each phase cut.
for (const t of [0, 2.5, 6.5, 10.5, 13]) {
  whoosh(t);
}

// 16-bit stereo WAV.
function writeWav(path) {
  const dataLen = N * 2 * 2;
  const buf = Buffer.alloc(44 + dataLen);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataLen, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2 * 2, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataLen, 40);
  let o = 44;
  let peak = 0;
  for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const g = peak > 0 ? 0.7 / peak : 1; // -3 dB headroom before loudnorm
  for (let i = 0; i < N; i++) {
    buf.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(L[i] * g * 32767))), o);
    o += 2;
    buf.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(R[i] * g * 32767))), o);
    o += 2;
  }
  writeFileSync(path, buf);
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");
mkdirSync(outDir, { recursive: true });
writeWav(join(outDir, "score_raw.wav"));
console.log("wrote assets/score_raw.wav");
