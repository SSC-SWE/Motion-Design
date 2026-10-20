# Motion-Design

A motion-design methodology for AI agents, distilled from [@flxrnc's "Opus 5.5 Motion Lab"](https://x.com/flxrnc/status/2105311836190978392) and the *Projection Booth* Prompt Motion Pack.

The core idea: **a great animation is a directed prompt plus every follow-up it needed — not a lucky one-shot.** This repo turns that into skills an AI agent (Hermes, Claude, Codex) can run.

## What's inside

| Skill | What it does |
|---|---|
| `motion-brief` | Interviews you into a directed prompt — asks better questions instead of guessing |
| `motion-prompt` | The directed-prompt anatomy (GOAL/TIME/SHOTS/BRAND/OUTPUT/LOOK/BEATS/MOTION/QA) + render contract |
| `motion-numbers` | Easing, springs, durations, stagger, beat grid, camera — the numbers cheat sheet |
| `motion-lab-loop` | Render → look → fix. Frame-numbered follow-ups, not feelings |
| `motion-sound-export` | Sound, seamless loops, and export for X |

Plus:

- `templates/prompt-pack.md` — blank copy-ready template
- `packs/projection-booth.md` — the worked example, transcribed
- `examples/hyperframes-beat/` — a worked HyperFrames composition

## Use it

1. Tell your agent to load `skills/motion-brief/SKILL.md` and interview you.
2. Answer the questions. Adjectives get translated into numbers.
3. The agent writes the directed prompt, renders, and runs the lab loop.
4. Sound and export come last.

## Attribution

Methodology and the Projection Booth pack are from @flxrnc (Florence) — "Opus 5.5 Motion Lab: Make Claude Animate Like a Studio". Reproduced here as skills.
