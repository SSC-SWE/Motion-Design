---
name: motion-sound-export
description: Use to finish a loop. Sound, seamless loops, and export for X.
version: 0.1.0
author: SSC-SWE, Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [motion-design, animation, sound, audio, export, gif, mp4]
    related_skills: [motion-prompt, motion-lab-loop]
---

# Motion Sound & Export

The last mile tutorials skip and viewers notice first. Sound and export come after the picture is locked.

## When to Use

- Adding sound to a finished picture.
- Making a loop seamless.
- Exporting for X (MP4 or GIF).

## Sound

- **Picture works in silence first.** The feed plays video muted until someone taps.
- Mix to **−14 LUFS**, true peak under **−2 dBTP**.
- Each visual hit lands **1 frame before its sound** (light beats sound — a late sound reads as wrong sooner than an early one). The lab inverts this for synthesis: synthesize the hit 1 frame *after* the picture frame, since the code's picture is frame-exact.
- Synthesize in code when possible: Web Audio API in an OfflineAudioContext, no samples, no downloads. An agent that can't hear scores from frame numbers and checks sync by **decoding the finished MP4 and lining each hit up with its frame**.
- Render two loops and keep the second so tails wrap.

## Seamless loops

- Render frames **0..N-1**, never N. Frame N is frame 0 again — showing it twice is the seam hiccup.
- Drive every loop from `phase = frame / N` with whole-number cycles (a 90° turn per loop, exactly 2 wave cycles) so it lands back on frame 0.
- For organic drift, sample noise along a circle so it returns to where it started.
- Make frame 0 a finished composition — it is the first thing shown while a GIF loads.

## Export for X

- **MP4** for posts; **GIF** for X Articles and inline loops.
- One palette for the whole GIF (stops colors flickering between frames).
- X's GIF cap is 350 frames → at 24 fps that is ~14.5 s. A 4–6 s loop is 96–144 frames, well under it.
- **GIF delay trap:** delays store in hundredths of a second, so a 24 fps frame (41.7 ms) cannot be stored exactly. Rounding every frame to 40 ms runs 4% fast and off the beat grid. Fix: five frames at 40 ms then one at 50 ms, keeping a 6 s loop at exactly 6.00 s.
- Canvas sizes: 1920×1080 (16:9), 1080×1080 (1:1), 1080×1350 (4:5), 1080×1920 (9:16). Pick before the first frame — changing it later means re-directing every shot.

## Completion criteria

- Mix measures −14 LUFS and true peak under −2 dBTP.
- Every hit lines up with its frame when the MP4 is decoded and checked.
- The loop shows no seam (frame N never rendered; frame 0 is finished).
- Export matches the chosen canvas and format.
