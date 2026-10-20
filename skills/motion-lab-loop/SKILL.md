---
name: motion-lab-loop
description: Use after a first render. Look at frames, name the fix, re-render.
version: 0.1.0
author: SSC-SWE, Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [motion-design, animation, iteration, review, follow-ups]
    related_skills: [motion-prompt, motion-numbers, motion-sound-export]
---

# Motion Lab Loop

The first render is a draft. This skill is the loop that finishes it: render stills, look at them, write frame-numbered notes, fix, and re-render only what changed. Two to four rounds is normal.

## When to Use

- After the first render of any motion piece.
- When the user gives a vague note ("it drags", "make it pop").
- To check whether a loop actually closes.

## The loop

1. **Freeze a frame.** Open the file with `?t=<seconds>` and look at the exact frame. For HyperFrames, use `npx hyperframes snapshot --at <t>`.
2. **Contact sheet.** Put 12 frames on one image and read it like a storyboard.
3. **Two animator views** for sharper notes:
   - **Onion skin** — stack frames at low opacity; even spacing = robotic, tightening near keys = easing works.
   - **Speed graph** — position per frame; straight lines = linear, sharp corners = dead starts/stops.
4. **Write the note with a frame number.** "The punch at frame 84 peaks late, move it 2 frames earlier" — never "it feels off."
5. **Pick 1–2 fixes per round.** Pasting every note at once turns a fix into a rewrite.
6. **Fix, re-render only what changed, repeat until the notes run out.**

## Translating feelings to numbers

| Note | Fix |
|---|---|
| "Make it pop" | scale 1.0 → 1.08 → 1.0 over 6 frames, peak on the beat |
| "Premium" | ease-out-quint entrances, springs at damping 0.8, no text overshoot |
| "It drags" | shorten each hold by 12 frames (one beat at 120 BPM / 24 fps) |
| "It feels busy" | one hero at a time; everything else +150 ms at 60% travel |
| "It looks like AI" | list the defaults it used by name, ban each, re-render |

## The fixes table

Failures that recur, each with the prompt that fixes it:

| Failure | Fix |
|---|---|
| Frame 84 differs every run | a clock/timer is in the render — drive time from the frame number, never the clock |
| Shapes jitter frame to frame | unseeded `Math.random` — seed it |
| Loop hiccups at the seam | you rendered frame N (which is frame 0 again) — render 0..N-1 |
| Render comes out dark under motion blur | accumulation buffer kept only the last sample — turn autoClear off, clear targets yourself |
| Text/hero leaves the frame on a move | keep the hero inside the frame on every hop; aim higher |
| Tone curve crushes a color channel | drop the toe, lift exposure, compensate the albedo |

If a fix does not hold, render the two frames on either side of the problem and describe the difference. When a fix works, add it to the render contract in `motion-prompt` — the contract is the lab's memory.

## Completion criteria

- Every follow-up names a frame number or a number, never a feeling.
- The loop closes: `renderAt(N) == renderAt(0)` in pose and velocity.
- Each working fix was added to the render contract.
