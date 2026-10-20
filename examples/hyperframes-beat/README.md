# hyperframes-beat

A worked HyperFrames example from the Motion-Design lab. It applies the core rules from the skills to a real HyperFrames composition:

- **Beat grid** — 120 BPM → a 0.5 s beat; one pulse lands per beat.
- **"Make it pop" as a number** — scale 1.0 → 1.08 → 1.0, one 6-frame pulse per beat, ease-out up / ease-in down (from `motion-lab-loop`).
- **One hero** — a single disc; the caption is secondary and dimmed to 45% opacity.
- **Deterministic / seamless** — pure GSAP timeline, no clock, no `Math.random`; the loop closes so frame 96 == frame 0.

## Verify

```bash
npm run check    # lint + runtime + layout + motion + contrast
npm run render   # renders out.mp4 (draft quality)
```

`check` passes with 0 errors (1 advisory warning: the composition nests `<div>`s inside a single timed `<section>`, which the linter flags as a sub-composition candidate — left as one file on purpose for a minimal example).

The beat is authored in seconds (0.5 s), not frames, so it renders correctly at any frame rate.
