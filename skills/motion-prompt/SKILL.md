---
name: motion-prompt
description: Use when writing an animation prompt. Fill the directed-prompt anatomy.
version: 0.1.0
author: SSC-SWE, Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [motion-design, animation, prompting, render-contract]
    related_skills: [motion-brief, motion-numbers, motion-lab-loop, motion-sound-export]
---

# Directed Motion Prompt

Write animation prompts that remove every decision the model would otherwise make. Each line of the template closes one way the render goes wrong, and every number is a decision you take back from the model.

Run `motion-brief` first; this skill turns that brief into a copy-ready prompt.

## When to Use

- Writing the first prompt for a new motion piece.
- Converting a filled brief into a prompt.
- Checking whether an existing prompt is missing a line.

Don't use for: the follow-up prompts after a render (that's `motion-lab-loop`).

## The anatomy

Fill every line. See `templates/prompt-pack.md` for the blank form and `packs/projection-booth.md` for a filled one.

- **GOAL** — one sentence, what the viewer should feel or do.
- **TIME** — duration, canvas, fps, frame count, loop/one-shot. Everything hangs off this.
- **BRAND** — HERO (exact proportions + colors), ROUTINE, PALETTE (hex), SET.
- **OUTPUT** — the engine plus its numbers: "A HyperFrames composition, 1920×1080, 24 fps, 144 frames." Never leave the engine to be guessed.
- **SHOTS** — frame range + one hero move + handoff per shot.
- **LOOK** — materials and lighting with numbers, camera (fov 35–50).
- **BEATS** — second by second.
- **MOTION** — camera path, hero move, ranked secondary (50–70%, +100–200 ms), ambient (<5%).
- **QA** — "render stills at the key frames and check them against these numbers before the full render."
- **BAN LIST** — the defaults to avoid, named.

## The render contract (append to every prompt)

```
Every frame is a pure function of time: renderAt(t), no clock or timer, so frame N renders
identically on every run. Use seeded randomness only; no unseeded Math.random. Render frames
0..N-1 (frame N is frame 0 again). For a loop, renderAt(N) must equal renderAt(0) in pose and
velocity. Freeze any frame with ?t=<seconds>.
```

This contract is the lab's memory: each line is a failure that will otherwise happen at least once. When a fix works, add it here.

## Engine OUTPUT lines

| Piece | OUTPUT line |
|---|---|
| 2D loop under 10 s | "One HTML file, 1920×1080, 60 fps, <N> s seamless loop." |
| 3D | "One HTML file, three.js <pinned version>, 1920×1080, 60 fps." |
| Web pages + GSAP | "A HyperFrames composition, 1920×1080, 24 fps, 144 frames." |
| Series / data-driven | "A Remotion composition, 1920×1080, 30 fps, 450 frames." |

## Motion ban list (starter)

purple/blue gradients · glow · lens flares · floating particles · everything fading in at once · fade-and-slide-up on every element · centered layouts · text that moves while it is being read.

Keep it alive: after every first render, name what the model used anyway and add it.

## Completion criteria

- Every anatomy line has a value; no field is blank or an adjective.
- The render contract is appended verbatim.
- The OUTPUT line names the engine and its exact numbers.
- The ban list is present and specific.
