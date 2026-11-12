---
title: "Groq, Not Grok: The Free AI API I Build Everything On"
seo_title: "Groq, Not Grok: The Free AI API I Build On"
description: Groq (with a Q) has a free API tier that is fast enough to build real things on. Here is how to get a key, what the free limits are and when it stops being enough.
date: 2026-11-12
topic: AI Tools
keywords: [Groq, Groq API, free AI API, Groq vs Grok, Gemini API rate limits, student developers]
image: /articles/images/cover-groq.webp
image_alt: Chibi Bhavishya cheering next to a phone playing his Groq video, with the Groq logo and lightning bolts
weight: 60
---

First, the spelling, because it trips everyone up. **Grok** with a K is the chatbot from xAI. **Groq** with a Q is a company that runs open models very, very fast and gives developers an API to use them. This article is about the second one, and about why almost everything I build now starts on its free tier.

{{youtube id="IyVryGoCdZc" title="Not Grok. Groq. The free AI API I build everything on" date="2026-11-11T10:50:51-08:00" duration="PT33S" vertical="true"}}

## Why I switched

For a long time I used Gemini API keys for everything. It worked, until it didn't: the free limits kept running out in the middle of building, and then you just sit there and wait. Nothing kills a good evening of building like a quota error.

Then I found Groq. You make a key and start building. And the answers come back fast enough that you notice.

That combination, free and fast, is why it stuck. When you are a student, or you are testing whether an idea is worth anything, "free and fast" is the entire requirements document.

## How to start in about two minutes

1. Go to the [Groq console](https://console.groq.com/) and sign in.
2. Open **API Keys** and create a key.
3. Save it as an environment variable so it never ends up in your code:

```bash
export GROQ_API_KEY=your-key-here
```

4. Install the library and make your first request. This is the example from [Groq's quickstart](https://console.groq.com/docs/quickstart):

```python
import os
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

chat = client.chat.completions.create(
    messages=[{"role": "user", "content": "Explain the importance of fast language models"}],
    model="llama-3.3-70b-versatile",
)

print(chat.choices[0].message.content)
```

That is the whole setup. If you have used the OpenAI library before, the shape will look familiar, and that is on purpose: Groq's API is OpenAI-compatible, so a lot of existing code works by changing the base URL, the key and the model name.

## What "free" actually means

Free does not mean unlimited. Groq publishes its limits per model, and they are measured four ways: requests per minute, requests per day, tokens per minute and tokens per day. You hit whichever one you reach first.

Here are a few rows from the free plan table on [Groq's rate limits page](https://console.groq.com/docs/rate-limits), as I read it on 12 November 2026:

| Model | Requests / minute | Requests / day | Tokens / minute | Tokens / day |
| --- | --- | --- | --- | --- |
| openai/gpt-oss-120b | 30 | 1,000 | 8,000 | 200,000 |
| openai/gpt-oss-20b | 30 | 1,000 | 8,000 | 200,000 |
| qwen/qwen3.8-27b | 30 | 1,000 | 8,000 | 200,000 |
| whisper-large-v3 (speech to text) | 20 | 2,000 | n/a | n/a |

These numbers change, and the list of models changes faster. Your exact limits are on the **Limits** page inside your own account, so check there before you plan around a number from a blog post, including this one.

A thousand requests a day is not enough to run a popular product. It is more than enough to build one, test it, demo it and show it to the first fifty people.

## The things that will bite you

- **Limits are per organisation, not per key.** Making five keys does not give you five times the quota.
- **Tokens per minute is the one you hit first.** Long prompts burn through 8,000 tokens quickly. Trim your system prompt and do not send the whole chat history every time.
- **You get a `429` when you go over.** The response includes a `retry-after` header telling you how many seconds to wait. Read it and wait that long instead of retrying in a tight loop.
- **The models are open models.** You are not getting Claude or GPT here. For a lot of jobs (classifying, summarising, extracting, quick chat) that is completely fine. For the hardest reasoning, test before you commit.

## When to stop using the free tier

When real people depend on it. The moment a `429` means a customer sees an error, move to the paid Developer plan or put a second provider behind it as a fallback. Free tiers are for learning and for proving the idea. They are a terrible thing to discover the limits of in production.

## Who this is for

If you are a student developer, or you want to build apps with AI and you have not paid anyone yet: try this before you do. Build the thing first. Find out if anyone wants it. Then decide who deserves your money.

This is not sponsored. I just really like the product, and I got tired of waiting for quotas to reset.
