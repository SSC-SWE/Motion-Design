# Prompt Pack — The Lab Loop (Motion-Design ad)

A 15 s one-shot motion ad for the Motion-Design methodology. Built with HyperFrames; the copy-ready directed prompt below is what the build followed. Receipts at the bottom.

## GOAL

Land the lab loop: Prompt → Render → Look → Fix.

## TIME

15 s · 1920×1080 · 30 fps · 450 frames · one-shot (not a loop)

## BRAND

```
HERO:    the four words PROMPT / RENDER / LOOK / FIX, one per phase, plus a 48 px amber disc
         that pulses on the beat as the recurring motif.
ROUTINE: reveal → hold (2% push) → hard cut to the next word.
PALETTE: bg #0a0a0a, accent tungsten #FFB070, text #f4f4f5, dimmed text at 45%, velvet #1F4F55
SET:     flat dark studio, no gradients.
```

## OUTPUT

A HyperFrames composition, 1920×1080, 30 fps, 15 s, one-shot.

## SHOTS

```
0.0–2.5   PROMPT (top-left) + subline "every adjective becomes a number"
2.5–6.5   RENDER (center, amber) + frame counter 000 → 360
6.5–10.5  LOOK (left) + viewfinder zooming on the disc + "frame 84 · peaks late"; disc nudges ±6 px
10.5–13   FIX (center) + "move it 2 frames earlier"
13–15     end frame: "Motion-Design" + "no fake one-shots"
```

## LOOK

Flat dark, amber accent only, one hero per shot, dimmed secondary at 45%.

## BEATS

120 BPM → 0.5 s beat → 12 frames. The disc pulses once per beat (scale 1.0 → 1.18 → 1.0, ease-out up / ease-in down). Cuts land on beats.

## MOTION

Word reveals ease-out (power3.out), y +40–60. Hold with a 2% push (scale → 1.02). Counter runs linear (progress). The nudge is a ±6 px x-shift.

## SOUND

Synthesized in code, no samples: 120 BPM kick on the beat, off-beat tick, whoosh at each phase cut. Target −14 LUFS / −2 dBTP. Hits 1 frame after picture.

## BAN LIST

No gradients, glow, lens flares, particles, everything-fading-in-at-once, centered-everything (positions vary per phase), text moving while read.

## RENDER CONTRACT

Pure function of t; no clock; no unseeded Math.random; one deterministic GSAP timeline.

## Receipts

Follow-ups (this build): 2.

1. The frame counter rendered black — it had no `color` and inherited the default. Fix: set `color: #f4f4f5` on `body` so everything inherits light text. (Contrast 1.06:1 → 9/9 pass.)
2. The same fix resolved a contrast finding on the counter (1.06:1, need 3:1 for 56 px text).
