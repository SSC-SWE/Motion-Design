---
name: motion-numbers
description: Use when a prompt needs numbers. Easing, springs, beat-grid cheat sheet.
version: 0.1.0
author: SSC-SWE, Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [motion-design, animation, easing, springs, timing, reference]
    related_skills: [motion-prompt, motion-lab-loop]
---

# Motion Numbers

The numbers that turn an adjective into a decision. Pull from here when writing or fixing motion; screenshot this one. Values follow the standard Easings reference (Andrey Sitnik), Material 3, and the Opus 5.5 Motion Lab.

## When to Use

- Writing BEATS, MOTION, or LOOK lines in a prompt.
- Translating a feeling into a number ("premium" → which damping ratio?).
- Fixing timing in the lab loop.

## Easing

- Enter with **ease-out**, exit with **ease-in**, and make exits **40–50% shorter** (Material 3: 400 ms in, 200 ms out).
- Move across the screen with **ease-in-out**.
- **Linear** only for rotation, progress bars, and the phase of a loop. Linear easing on a move is the fastest way to make a render look like a render.

## Springs (damping ratio — one number, all libraries)

| Ratio | Feel |
|---|---|
| 1.0 | never bounces |
| 0.7–0.85 | premium |
| 0.4–0.6 | playful |
| <0.3 | cartoon |

Remotion's default spring ≈ 0.5; react-spring's default ≈ 1.0. Position and size may bounce; opacity and color never do. Give the model one line: "use only these tokens, no inline numbers."

## Durations and stagger

- UI feedback: 100–200 ms (100 ms feels instant).
- UI moves: 200–500 ms. Hero reveals: 600–900 ms.
- Letters 1 frame apart; words 60–120 ms; list items 40–80 ms.
- Start the next element when the previous one is **30–50% done** (fully sequential looks robotic; all at once looks cheap).
- Say it in frames for video: at 24 fps, 1 frame ≈ 42 ms, so 400 ms ≈ 10 frames, 750 ms ≈ 18 frames.

## Beat grid

- Frames per beat = `fps × 60 / BPM`. 120 BPM at 24 fps = 12 frames; 128 BPM at 30 fps = 14.06.
- Compute every beat from time and round each one — adding a rounded 14 repeatedly drifts 2 frames off after 32 beats.
- Cut on the beat, change the layout on the bar (every 4 beats). Changing everything on every beat wears the viewer out.

## Holds

- On-screen text: at least `0.3 s per word + 0.5 s` (a two-word title needs 1.1 s).
- During a hold, a slow 2% push keeps the frame alive while words stay readable.

## Camera

- Camera moves get the softest curves (ease-in-out-quart); objects get the snappier ones.
- Parallax start: foreground 1.0, middle 0.5, background 0.2.
- Field of view 35–50° is a good starting point.

## Contrast and flashes

- Text at 4.5:1 contrast on every frame, including over moving backgrounds.
- Never flash more than 3 times per second (WCAG).

## Completion criteria

- No bare adjectives remain in the prompt; each has a number.
- Beat grid computed from time, not accumulated rounding.
- Exits are shorter than entrances.
