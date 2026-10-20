---
name: motion-brief
description: Use when starting a new motion piece. Interview into a directed prompt.
version: 0.1.0
author: SSC-SWE, Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [motion-design, animation, prompting, interview]
    related_skills: [motion-prompt, motion-numbers, motion-lab-loop, motion-sound-export]
---

# Motion Brief

Interview the user before writing any motion prompt. A vague ask ("make me a cool animation") produces the model's default look; a directed brief produces the piece the user actually wants. This skill teaches the agent to ask the right questions in the right order and to push back when an answer is an adjective.

It does not write the prompt — hand the filled brief to `motion-prompt`.

## When to Use

- A user asks for an animation, motion graphic, loop, logo sting, title card, or any motion piece.
- The user gives a one-line ask with no length, canvas, subject, or mood.
- Before any render, always — even when the user says "just make something."

Don't use for: edits to an existing piece (go to `motion-lab-loop`), or a pure code-review question.

## How to ask

Ask one question at a time. Offer a "dump everything at once" escape hatch for fast users, but default to one at a time — the point is to make the user decide things they would otherwise leave to the model.

Every answer that is an adjective gets a follow-up that forces a number. See the translation table at the bottom.

## The interview (in order)

1. **GOAL.** "What should the viewer feel or do, in one sentence?" If they cannot say it, keep asking until they can. No easing curve rescues a piece with no goal.

2. **TIME.** "How long?" Then canvas (16:9 1920×1080, 1:1 1080×1080, 4:5 1080×1350, 9:16 1080×1920) and fps (24/30/60). Every other number hangs off the frame count.

3. **LOOP.** "Seamless loop or one-shot?" A loop renders frames 0..N-1 and closes; a one-shot has a start and an end.

4. **ENGINE.** "Does this match one idea under 10 s (plain HTML, or three.js if 3D), a series/template (Remotion), web pages + GSAP timelines (HyperFrames), a 3D scene (three.js), or in-product UI motion (GSAP/Motion)?" Confirm, then get the numbers for the OUTPUT line.

5. **BRAND.** "Who or what is the hero?" Ask for exact proportions and colors — a pixel grid, voxel count, or hex codes. Then ROUTINE (what it does), PALETTE (2-4 colors with hex), SET (the environment). Every style you care about needs a guardrail line like this.

6. **STORY / BEATS.** "Walk me through it, second by second." One hero move per shot. For each shot ask for the handoff: hard cut, match cut, or mask wipe. Default to the cut.

7. **LOOK.** "What's the material and lighting, in numbers?" Translate: "premium" → materials with roughness + clearcoat + a spring damping ratio; "cool" → a key/fill/rim with exact colors and strengths. Ask for the ban list too: what defaults to avoid by name.

8. **SOUND.** "Silent, synthesized, or music?" Sound comes last in the workflow regardless.

## The translation table

When the user says a feeling, ask what number makes it true:

| Feeling | Number |
|---|---|
| "Make it pop" | scale 1.0 → 1.08 → 1.0 over 6 frames, peak on the beat |
| "Premium" | ease-out-quint entrances, springs at damping 0.8, no text overshoot |
| "It drags" | shorten each hold by 12 frames (one beat at 120 BPM / 24 fps) |
| "It feels busy" | one hero at a time; everything else +150 ms at 60% travel |
| "It looks like AI" | name the defaults it used, ban each, re-render |

## Completion criteria

- Every field in `templates/prompt-pack.md` has a value, and no field is still an adjective.
- GOAL is one sentence the user can repeat back.
- BRAND has hex codes, not color names.
- TIME has a frame count.
- The brief is written to a file (e.g. `BRIEF.md`) and handed to `motion-prompt`.
