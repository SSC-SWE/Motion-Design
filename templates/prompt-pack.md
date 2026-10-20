# Prompt Pack — <NAME>

Copy-ready directed prompt. Fill every line before sending. See `skills/motion-prompt/SKILL.md` for what each line does and `packs/projection-booth.md` for a filled example.

## GOAL

One sentence — what should the viewer feel or do?

## TIME

`<duration> s · <canvas> · <fps> fps · <frame count> frames · [seamless loop | one-shot]`

## BRAND

```
HERO:    <subject, with exact proportions and colors>
ROUTINE: <what the hero does>
PALETTE: <2-4 colors with hex>
SET:     <environment>
```

## OUTPUT

`<engine + exact numbers>` — e.g. "A HyperFrames composition, 1920×1080, 24 fps, 144 frames." or "One HTML file, three.js, 1920×1080, 60 fps, 16 s seamless loop."

## SHOTS

Per shot: frame range · one hero move · handoff (cut / match cut / mask wipe). Default to the cut.

## LOOK

Materials, not adjectives. Lighting, camera (fov 35–50), depth of field.

## BEATS

Second by second. One event per line.

## MOTION

Camera path, hero move, ranked secondary (50–70%, +100–200 ms), ambient (<5%, slow sine).

## QA

Before rendering the full clip, render stills at the key frames and check them against these numbers.

## BAN LIST

Defaults to name and avoid: purple/blue gradients, glow, lens flares, floating particles, everything fading in at once, fade-and-slide-up, centered layouts, text moving while read.

## RENDER CONTRACT

- Every frame is a pure function of t: `renderAt(t)`, no clock/timer.
- Seeded randomness only; no unseeded `Math.random`.
- Render frames `0..N-1` (frame N == frame 0).
- Loop closes: `renderAt(N) == renderAt(0)` in pose and velocity.
