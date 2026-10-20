# hyperframes-beat — "The Lab Loop" ad

A 15 s one-shot motion ad for the Motion-Design methodology. It applies the lab rules to a real HyperFrames composition:

- **Beat grid** — 120 BPM → 0.5 s beat; the amber disc pulses once per beat.
- **Directed structure** — four phases PROMPT → RENDER → LOOK → FIX, each its own clip (hard cut between phases).
- **"Make it pop" as a number** — the disc pulse is scale 1.0 → 1.18 → 1.0, ease-out up / ease-in down.
- **One hero per shot** — one word per phase; sublines dimmed to 45%.
- **Frame-numbered follow-up** — LOOK shows "frame 84 · peaks late" and the disc nudges ±6 px, then FIX lands "move it 2 frames earlier".
- **Deterministic** — pure GSAP timeline, no clock, no `Math.random`.

## Files

- `index.html` — the composition (15 s, 1920×1080).
- `scripts/make-score.mjs` — synthesizes the 120 BPM score (seeded PRNG, no samples).
- `assets/score.wav` — the score, normalized with ffmpeg loudnorm (I=−14 / TP=−2; measures −16.8 LUFS single-pass).

## Verify

```bash
node scripts/make-score.mjs    # regenerate the raw score
ffmpeg -y -i assets/score_raw.wav -af "loudnorm=I=-14:TP=-2:LRA=11" -ar 48000 assets/score.wav
npm run check                  # lint + runtime + layout + motion + contrast
npm run render                 # renders out.mp4
```

`check` passes with 0 errors, 9/9 contrast. 5 advisory `nested_structure_needs_subcomposition` warnings: each phase nests an `<h1>`/`<p>` inside a timed `<section>`, which the linter prefers as sub-compositions — left single-file on purpose.
