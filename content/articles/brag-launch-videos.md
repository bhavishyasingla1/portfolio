---
title: "Brag: Turn Any Project Into a Launch Video With One Command"
description: Brag is an open-source agent skill that turns the project you just built into a short launch video. I used it for Ring Ping and Rank Kiwi. Here's how it works.
date: 2026-11-10
tags: [AI, GitHub, Agent Skills, Video, Launch]
image: /articles/images/brag-launch-videos.webp
image_alt: Launch videos for Ring Ping and Rank Kiwi, made with Brag
---

Building the thing is only half the job. The other half is showing people, and making a good launch video usually means hours of editing, music hunting and second-guessing.

**[Brag](https://github.com/latent-spaces/brag)** does it with one command. It's one of my favourite repositories right now, and I've already used it for two of my own products. Big recommendation from me: go check it out.

## What Brag is

Brag is an open-source **agent skill** from [latent-spaces](https://github.com/latent-spaces). In their own words: *"You built it. Now brag."* You run it inside a project you've finished, and it turns that project into a short, shareable launch video, with music, motion and ready-to-post share copy.

At the time of writing it has about **20.9k stars** on GitHub, and it's MIT-licensed.

## How it works

1. **It studies your project.** Brag works out the product angle, the tone and the key moments worth showing.
2. **It writes a brief.** It turns all of that into a focused brief for Hyperframes, which builds, times and renders the video.
3. **You get the files.** Everything lands in a `brag-output/` folder: the plan, the brief, your share copy and the finished `brag.mp4`.

You can steer it too:

- `--tone "..."` changes the mood, for example something playful or satirical.
- `--voice` adds an optional narration.

## Videos I made with Brag

Here are two launch videos I made with Brag for my own products.

**[Ring Ping](/ringping)**, the reminder app that calls you:

{{youtube id="pNG_sWsy4s0" title="A Reminder App That Calls You When It's Time | Ring Ping" date="2026-11-05T20:39:09-08:00" duration="PT36S"}}

**[Rank Kiwi](/rankkiwi)**, the Chrome extension that finds viral outlier content:

{{youtube id="anvpQtrGxWY" title="Why Raw View Counts Lie (And How Outlier Scores Fix It)" date="2026-11-02T02:05:45-08:00" duration="PT38S"}}

Each one started as a single command in the project folder. That's the magic: the gap between "it works" and "people can see it works" gets tiny.

## How to install it

**In Claude Code:**

```bash
/plugin marketplace add latent-spaces/brag
/plugin install brag@brag
```

**In Codex:**

```bash
codex plugin marketplace add latent-spaces/brag
codex plugin add brag@brag
```

**In other agents** that support Agent Skills:

```bash
npx skills add https://github.com/latent-spaces/brag --skill brag
```

Then open your project and ask your agent: **"let's /brag"**.

You'll need **Node.js 22+**, **FFmpeg** on your PATH and the **Hyperframes CLI** (`npx hyperframes`). If you'd rather skip the setup, [letsbrag.app](https://letsbrag.app) can make one from just a link to your site.

## Why I like it so much

- **It removes the excuse.** "I'll make a launch video later" usually means never. Now it takes minutes.
- **It understands the product.** It doesn't just glue screenshots together. It works out what's interesting about your project.
- **It's open source.** You can read how it works, change it and make it yours.

If you build side projects, give **[Brag a star on GitHub](https://github.com/latent-spaces/brag)** and try it on the next thing you ship. Then come tell me what you made.
