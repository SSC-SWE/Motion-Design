# Motion-Design — Agent Instructions

A motion-design methodology repo. It turns the "Opus 5.5 Motion Lab" workflow into skills an AI agent can follow: how to interview for a brief, write a directed prompt, hit the motion numbers, run the render→look→fix loop, and finish with sound and export.

Source material: @flxrnc's "Opus 5.5 Motion Lab: Make Claude Animate Like a Studio" (X article) and the "Projection Booth" Prompt Motion Pack (PDF). Faithful transcription: `packs/projection-booth.md`.

## The workflow (in order)

1. **`motion-brief`** — interview first. Never write a prompt from a vague ask. Extract GOAL, TIME, story, BRAND, engine, mood, loop, sound. Push back on adjectives.
2. **`motion-prompt`** — fill the directed-prompt anatomy + render contract.
3. **`motion-numbers`** — pull easing, springs, durations, beat grid, camera from the cheat sheet. Every adjective becomes a number.
4. **`motion-lab-loop`** — render, look, fix. Point at frames, not feelings. 2-4 rounds is normal.
5. **`motion-sound-export`** — sound, seamless loop, export for X.

Load the matching skill before each phase. Each skill's SKILL.md is self-contained.

## Non-negotiable rules

- **No vague prompts.** A prompt without GOAL/TIME/BRAND/OUTPUT gets the model's default look. Run `motion-brief` first.
- **Every adjective becomes a number.** "Premium" → materials + easing + spring damping. "Make it pop" → a 6-frame scale pulse on the beat.
- **Every frame is a pure function of t.** No clocks, no unseeded `Math.random`, render frames 0..N-1. The render contract is non-negotiable.
- **One hero per shot.** Everything else starts later and moves less.
- **Receipts.** Post the prompt and every follow-up with the finished piece. "One prompt" without follow-ups is dishonest.

## Engine rule of thumb

| Piece | Engine |
|---|---|
| One idea under 10 s | plain HTML (or three.js if 3D) |
| A series, template, or data-driven video | Remotion |
| Thinking in web pages + GSAP timelines | HyperFrames |
| 3D scene | three.js |
| Motion inside a product UI | GSAP / Motion |

Put the engine plus its numbers in the OUTPUT line: "A HyperFrames composition, 1920×1080, 24 fps, 144 frames."

## Repo layout

```
skills/           — the five SKILL.md files (also mirrored to ~/.hermes/skills/motion-design/)
templates/        — blank directed-prompt template
packs/            — the transcribed Projection Booth pack (filled example)
examples/         — a worked HyperFrames composition
```

Skills are the source of truth here. Keep them current in `skills/` and mirror changes to `~/.hermes/skills/motion-design/`.
