---
title: "The Canary Trick: Why I Make Claude Say My Name in Every Reply"
seo_title: "The Canary Trick: Make Claude Say Your Name"
description: Add one line to CLAUDE.md telling Claude to start every reply with your name. The moment it stops, your session is degrading. Here is how the canary trick works.
date: 2026-11-12
topic: Claude
keywords: [Claude, CLAUDE.md, Claude Code, context window, context rot, prompt engineering, canary technique, Peter Steinberger]
image: /articles/images/cover-canary.webp
image_alt: Chibi Bhavishya with a yellow canary on his hand, next to a phone playing his canary trick video, the Claude logo and a CLAUDE.md label
weight: 80
---

You should have Claude call you by your name. Every single time. Not because it is cute, but because it tells you when your session is about to go bad.

{{youtube id="6y7phOwiJ2Y" title="Why You Should Force Claude AI to Say Your Name (The Canary Trick)" date="2026-10-21T08:30:27-07:00" duration="PT48S" vertical="true"}}

## Where the idea comes from

Miners used to carry a canary underground. The bird reacted to bad air long before a person could feel it. If the canary stopped singing, you left. It was a small, cheap signal for a big, invisible problem.

Peter Steinberger, the developer behind OpenClaw, talks about using canaries with AI models, and people have applied the same idea to their `CLAUDE.md` file. Credit to him for the technique. I am just the person who would not stop telling everyone about it.

## The problem it solves

Long sessions do not fail loudly. Claude does not go from perfect to hallucinating in one message. It slides:

1. First it drops a **small instruction**. Something low-stakes that you set at the start.
2. Then it gets a little vague about a detail you gave it an hour ago.
3. Then, all of a sudden, it is making wild assumptions about your codebase with total confidence.

By step three you have usually already accepted a few bad edits. The trouble is that steps one and two are invisible unless you are watching for them. Nobody re-reads their own system prompt after every reply to check that all of it is still being followed.

So you plant one instruction that is impossible to miss when it breaks.

## How to set it up

Open your `CLAUDE.md` (the file Claude Code reads at the start of every session) and add one line:

```md
Always start every response by addressing me as Bhavishya.
```

Use your own name, obviously. Unless you want to be called Bhavishya, in which case, welcome.

That is the whole trick. Every reply now begins with your name. It costs nothing, it does not change the quality of the work, and you stop noticing it after ten minutes.

Until the reply that does **not** start with your name.

## What to do when the canary dies

When Claude skips your name, treat it as a signal, not as a typo:

- **Stop and check the last answer more carefully.** If it forgot the name, ask yourself what else it forgot.
- **Start a new session.** If the canary is dead, there is a good chance the context is too full or too messy to trust.
- **Carry over a summary, not the whole history.** Ask for a short handoff note (what we were doing, what is decided, what is left), then paste that into the fresh session.

Starting again feels like losing progress. It is not. The progress is in your files. What you are throwing away is a conversation that has stopped listening.

## Why a name works so well

A good canary has three properties, and a name has all of them:

- **It is visible in every single reply.** You do not need to test for it. It is the first word you read.
- **It has nothing to do with the task.** So when it disappears, it is not because the task changed. It is because the instruction fell out.
- **It is small.** Small instructions are the first to go, which is exactly what you want from an early warning.

You can use other canaries: a specific sign-off, an emoji at the start, a fixed phrase. The name is just the easiest one to read without thinking.

## What it will not do

It is a smoke alarm, not a fire extinguisher.

- A missing name is a **strong hint**, not proof. Sometimes a model drops it once and is otherwise fine. If it happens again, believe it.
- A present name is **not a guarantee**. Claude can say your name and still be wrong about something. Keep reviewing the work.
- It does not fix long sessions. It tells you when to stop having one.

## Try it today

It is one line. Add it, forget about it, and let it sit there until the day it saves you from an hour of confidently wrong code.

If you like this kind of thing, I also compared what the three Claude models cost for the same job: [Haiku vs Sonnet vs Opus](/articles/haiku-vs-sonnet-vs-opus-music-videos).
