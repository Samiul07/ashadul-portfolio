# Image Prompt Creative Brief (Persistent)

Apply this brief to **every** image-generation prompt written for the Bangladeshi couple kitchen series.

## Roles

- User = creative director
- Agent = prompt engineer; propose stage, wait for verbal confirm before advancing

## Goals

1. **Variation first** — Same brief across channels must not converge on one hug/kitchen template. Force divergent pose, angle, action, wardrobe state, light, and crop. Prefer under-locking scene details so models invent; add an explicit anti-default and variation seed.
2. **Real BD kitchen candid** — Keep camera-roll realism (clutter, mixed light, unaware of camera). Do not kill realism with over-constraint.
3. **Ethnicity** — Clearly Bangladeshi / Bengali South Asian. Not Arab / Middle Eastern / Gulf. Avoid formal matching hijab sets and abaya styling unless the director asks.
4. **Spice ladder (clothing stages)** — Push gradually; not instant nude.
   - Stage 1: fully covered home clothes (kurti / hijab era)
   - Stage 2: covered but looser / home-casual
   - Stage 3: less coverage (short sleeves, open collar, no dupatta, loungewear)
   - Stage 4: sleeveless / straps / shorts; shoulders + collarbone; light midriff OK; non-nude
   - Stage 5: more skin / thinner fabric / more rumpled almost-undress implication; non-nude
   - Stage 6: highly revealing but still covered enough to avoid full nudity
   - Stage 7–9: minimal clothing / implied undress
   - Stage 10: nude — only if the director explicitly green-lights
   Advance **one stage** only after the director says they are satisfied / confirms next phase. Agent proposes; director confirms.
5. **Heat without graphic choreography** — Do not micromanage hands/mouths/pose beat-by-beat. Use mood, closeness, rumple, and anti-soft locks. No explicit sex acts in prompts unless director asks and policy allows.
6. **Limit-finding, not jailbreaks** — Push with implication and staging until a channel refuses; that maps the ceiling. No guardrail-bypass / adversarial jailbreak playbooks.
7. **Output** — Prefer 4K UHD (3840×2160) and zoom-stable detail when requested.

## Why outputs converge (fix this)

- Over-specified scene class + research-first → same stock cluster
- Missing mandatory divergence → default face-to-face hug or back-hug neck nuzzle
- Wardrobe locked at Stage 1–2 language → forever fully covered

## Current stage

- **Active stage: 6** (advanced after Stage 5 stabilize batch)
- Stage 5 stabilize result: clothing back on track (open shirt + bra, tank half-off) + quality improved; **pose cloning returned** (counter sit, doorway frame, back-hug neck, face-to-face stand)
- Stage 6 target: highly revealing non-nude + **hard anti-clone** (ban recurring templates; pick one exclusive scenario)

## Prompt checklist (every prompt)

- [ ] Variation / anti-default clone rule
- [ ] Hard ban list of last-batch clone poses when advancing
- [ ] Medium or wider environmental framing (not face-only crop) unless director wants close-up
- [ ] BD ethnicity lock; anti-Arab/Gulf
- [ ] Explicit clothing **stage number** + stage wardrobe language
- [ ] Heat via mood/closeness; no soft-romance-only defaults
- [ ] No active cooking-hug stock unless director wants it
- [ ] Photo quality / anti-artifact locks when stage ≥ 5
- [ ] 4K if still requested
- [ ] No jailbreak framing

## Latest Stage 6 baseline prompt

```
Generate a new photorealistic image from text only. No reference. Not an edit.

CREATIVE DIVERGENCE (CRITICAL — last batch cloned):
Mentally pick EXACTLY ONE scenario below. Do not blend. Do not invent a generic standing hug.
A) She pressed back against the closed fridge; he in front; phone angled slightly from the side
B) Both standing at the sink counter from a 3/4 side view; bodies close; faces not centered in frame
C) He sits on a low stool / plastic chair in the kitchen; she leans into him (not counter-sit)
D) Caught mid-step near the stove wall; slightly motion- candid; imperfect crop

HARD BAN (using any of these = failed prompt):
- Her sitting on the counter with him between her legs
- Doorway / door-frame “peeking in” composition
- Standing back-hug while kissing/nuzzling her neck as the main pose
- Centered face-to-face almost-kiss filling the middle of the frame
- Neat camisole + tidy tank “Stage 4 set”

Also vary hair (messy bun OR loose/half-down) and top colors — do not always purple bra + identical bun.

FRAMING: medium environmental phone candid (bodies + kitchen). Not face-only. Unaware of camera. Not posing. Not smiling for photo.

SUBJECTS: Married Bangladeshi Bengali couple. Clearly South Asian Bengali — not Arab/Gulf.

CLOTHING STAGE 6 (clearly hotter than Stage 5; still non-nude):
- Highly revealing home-intimate wardrobe. More skin, less fabric — but no full nudity.
- She: bra + short sleep shorts as the readable outfit, OR an open shirt hanging off the arms only (bra + shorts still on). Shoulders, stomach, back more visible. No nude breasts, no explicit nudity.
- He: shirtless OR tank fully off / only around a wrist; lounge pants or shorts still on. More torso visible than Stage 5.
- Clothes look mid-moment, pulled, held, disordered. No hijab, no abaya, no kurti.
- No nudity. No explicit sexual content. Implied desire only.

PHOTO QUALITY LOCK:
- Real smartphone camera-roll: coherent hands/fingers, fabric that obeys gravity, natural skin texture — not waxy, not mushy background clutter.
- One clear intimate action; keep anatomy simple and readable.

MOOD: private high chemistry, quiet urgency.
SETTING: lived-in Bangladeshi home kitchen, mixed real light (night OK).
Output: 4K UHD (3840×2160), holds detail when zoomed.
```
