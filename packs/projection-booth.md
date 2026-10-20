# Prompt Pack — Projection Booth

A faithful transcription of the "Projection Booth" pack from the *Prompt Motion Pack* PDF (Opus 5.5 Motion Lab). The prompt is reconstructed from the PDF; the follow-up tables in the PDF are partially garbled, so the follow-ups and sound rounds are summarized by theme.

A tiny old cinema at night. The pixel mascot dances on the screen until the feed reel runs dry, steps out of the picture in 3D, hops over the seats to the projector and drags its own film back to the first frame, then dives back into the light. A seamless loop; every frame is code written from the prompt.

## Copy-ready prompt (266 words)

```
BRAND
HERO: 20x13 pixel mascot D97757: body 14x10 at (3,0), arms 3x2 at (0,5) and (17,5),
      legs 2x3 at x 4, 7, 11, 14 on row 10, eyes 0F0F0F 2x3 at (6,3) and (12,3)
ROUTINE: lands, two happy hops, a twirl, a shuffle
PALETTE: tungsten FFB070, ink 17120F, velvet 1F4F55, celluloid E8A03C
SET: tiny old cinema at night: screen, 3 rows of velvet seats, a 35 mm projector with two big reels

FORMAT
One HTML file, three.js 0.160.0, 1920x1080, 60 fps, 16 s seamless loop. renderAt(t) draws
exact time t, seeded random, freezes it.

LOOK
The projector is a spotlight mapped with a live render target of ROUTINE in 2D at 12 fps, gate
weave. Dusty volumetric beam. HERO in 3D: clearcoat voxels 6 deep, squash and stretch, pixel
blinks. Backlit film, each frame holding ROUTINE. Bloom on beam and lamp only, grain.

BEATS (s)
0    HERO performs ROUTINE on screen
2.0  film tail flaps; the feed reel runs low
2.6  HERO looks up the beam
3.3  double take
4.0  extrudes out of the screen into 3D
4.5  film runs out
5    hops over the seats along the stage
7.3  walks to the projector, glancing at its own frames
9.6  grabs the strip, runs in place: film rewinds, reels reverse, screen plays backwards
12.6 brakes on the first frame; smug look to the lens
14.6 projector restarts; HERO leaps into the beam, flattens, rides the light into frame 0

MOTION
One continuous camera, shallow-focus macro on the film.

CHECKS
renderAt(16) equals renderAt(0) in pose and velocity; 5 frames around every beat; no clipping.
```

## Picture follow-ups (4 rounds, summarized)

1. **Scale and backlight.** The hero read bigger than the projector head — scale projector, reels, film and bench 1.3x around the lens. Frames washed out to white — drop the backlight so they glow celluloid amber; open the foreground with a focus pull.
2. **Tone curve.** The hero read dark brick orange, not D97757 — the tone curve's toe crushed the blue channel to 2/255. Drop the toe, lift exposure 30%, whiter bulb FFD2A0, compensate the hero's albedo so it lands on D97757.
3. **Framing.** The hop at 7.5 s and the hop down at 14.0 s leave the frame — keep the hero inside the frame on every hop. The run-in-place lean of 16° read as falling over — make it 7° and let the bounce sell the effort.
4. **Motion blur.** The picture came out at a third of its brightness with more than one sample per frame — turn autoClear off and clear each target yourself; bring bloom down to 0.025. The hop at 14.0 s still clips the top — aim higher.

## Sound

The picture is silent code; the sound came from one more prompt. Everything synthesized with the Web Audio API, no samples; each hit lands 1 frame after its picture; mix at −14.0 LUFS, true peak −2.2 dBTP.

Copy-ready sound prompt (234 words): synthesize everything with the Web Audio API in an OfflineAudioContext, no samples, no downloads, 16 s seamless loop, 48 kHz stereo WAV, each hit peaks 1 frame after its picture, about −14 LUFS, true peak under −2 dBTP. Render two loops and keep the second so every tail wraps. Mux into the MP4. Projector: reel speed, motor hum, a faint claw clatter at twice the film rate. Music: vintage ragtime piano at 144 BPM, read through the film position like tape — stops at 4.0, plays backwards with a warble during the rewind, restarts with a pitch ramp at 14.6. Hits: tail slaps once per reel turn, a whoomp on the extrude and the flatten, a clunk on the run-out, velvet thumps and wood knocks, a film creak, a yank, a rattle that accelerates and brakes from 9.9 to 12.6, a tiny satisfied chirp on the smug nod.

### Sound follow-ups (8 rounds, summarized)

1. First mix −23.2 LUFS, peaks −7.4 dBFS — bring the whoomps and landing down, lift hum and room tone.
2. Landing whoomp, light whoomp and seat thumps 1–2 dB over the piano — down 3 dB each, then reach −14 LUFS with one plain gain, no limiter.
3. The 15.8 s landing stacks piano downbeat + blip + whoomp to −9.5 dBFS — a gentle compressor (2–3 dB) on the bus, softer downbeat.
4. Piano attacks still loudest at −7.6 dBFS (compressor make-up gain) — soften the hammer, 9 ms attack instead of 4, half the spike.
5. Measured ROUTINE's blips at 0.66, 1.10 and 2.96 s — square-wave blips, not the piano, 5 dB down.
6. −7.9 dBFS on the piano — stagger partial start phases by up to 3 ms so each note opens in phase.
7. Lift music and whirr, bring the true-peak loop to −14 LUFS at −2.2 dBTP with one gain and a gentle look-ahead limiter, never more than 1 dB of gain reduction.
8. Blips fire on the exact routine times, 2 frames before the eyes move — snap every blip to the first film frame that shows its picture.

## The formula

The same rules that make the loop close: one clock for the film, the projector is a camera, extrude-then-flatten, a spotlight mapped with a live render target, loop by construction (every periodic motion runs whole cycles in 16 s).
