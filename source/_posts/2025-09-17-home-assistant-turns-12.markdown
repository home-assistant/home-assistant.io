---
layout: post
title: "Happy 12th Birthday, Home Assistant!"
description: "This year we’re sharing some stories from the community and some stats about our growth."
date: 2025-09-17 00:00:01
date_formatted: "September 17, 2025"
author: Missy Quarry
comments: true
categories: Announcements
og_image: /images/blog/2025-09-12th-anniversary/art.webp
---

<img src='/images/blog/2025-09-12th-anniversary/art.webp' style='border: 0;box-shadow: none;' alt="Home Assistant 12th Anniversary">

Every September, we celebrate the anniversary of Home Assistant’s first PR in 2013 – for our 12th birthday, we’re going all in on community again. Last month, we asked for submissions on how Home Assistant helps you, and today we will highlight our favorites! We will also take a look at all the cool milestones over the past year in the project, thanks to contributions from you all, and the new things coming up for the community. <!--more-->

## It’s a communal effort

When I (Missy Quarry) joined as the Community & Social Media Manager in February 2024, I was still new to how an open source project the size of Home Assistant manages its community. Over the past 18 months, I’ve seen Home Assistant community members from all walks of life — whether DIY tinkerers or people simply looking to make small improvements at home — contribute in their own ways. By sharing your stories and inspiring others, you’ve helped the project grow.  For our 12th birthday, I want to celebrate these contributions, no matter the size or complexity. 😌

Before I jump into celebrating all your amazing contributions and how they shape the projects managed by the Open Home Foundation, I have a couple of birthday presents for you. 🎁

First, I’m thrilled to share our [new Community website](/community)! Right now, it’s a simple hub to find community information with ease, but we expect to evolve this over the coming months (or so). You’ll find links to our official community platforms, information on events, and details on meetups, including how to get reimbursed for certain fees as a host. In the future, I’d like to include links to regional communities we’re aware of and showcase more of the kinds of stories I’ll be sharing today.

*Feel like something’s missing from this new page? [Let me know](mailto:community@openhomefoundation.org)!*

Next, we’ve been working hard to do more of our development in the open. Last September, I redesigned the Discord server and in doing so I gated the *Developer* category behind a role. This has made it more difficult to develop in the open with the channels hidden behind a role, so we’re switching things up.

As of this week, the Developer category is now **read-only** for every member. Want to take a peek into the future of Home Assistant? Head to the [#projects channel](https://discord.com/channels/330944238910963714/1346914401508392980) and see what contributors are talking about! Want to join in and contribute with either your feedback or skills? I’ve created [an info thread](https://discord.com/channels/330944238910963714/1346952081881436331) for the channel that explains how to assign yourself either the Developer or Designer role and unlock the ability to chat in the threads.

Let’s jump into those submitted stories now… 🤩

## Happily ever after

In my opinion, the best thing about Home Assistant is its flexibility - you can integrate such a wide range of devices into it and use their data to build a unique-to-your-home experience. And that’s exactly why I wanted to hear how you, the community, use it in your own home to benefit you. Here are my favorite stories you submitted - I hope one inspires your next project. ✨

- [A coffee automation to improve Home Approval Factor](https://jordan.roher.me/projects/home-automation/). ☕️ Jordan made a morning automation to avoid having the coffee grinder grind his morning mood.

- u/katschung helped their girlfriend fully accept Home Assistant by [creating a dashboard with a retrogame-style floor plan](https://www.reddit.com/r/homeassistant/comments/1hrkku1/pokemon_style_floorplan/). 🕹️

- Sythsaz uses Home Assistant to make sure their pupper is fed. 🐾 “*I've managed to make it so my dog's food auto emails the vet then the response to the email gets put on my calendar so I know how long a bag of food lasts as well as adding the receipts to Google Drive.*”

- Inspired by [PowerDisplayESPHome](https://github.com/johannyren/PowerDisplayESPHome/tree/main), JannickBlmndl [made an LED matrix](https://gitlab.com/JannickBlmndl/ESPHome-Dynamic-Prices-LEDMatrix) that helps their household be more sustainable by being energy flexible. It displays the live energy prices from their energy provider. 📊

- [Tano Spirits](https://www.youtube.com/@TanoSpirits) in Melbourne, Australia, uses Home Assistant to automate their Japanese Shochu distillery, inspired by the brewing automations at [Little Island Brewing Co](https://libc.co/brewing-process/) in Singapore. 🍻

- Several years ago, HillPhantom found that Home Assistant wasn’t quite ready for him. Over the past year, though, he’s now got Ollama set up with his Home Assistant Voice Preview Edition and has been building guides on how to make your own [mmWave radar sensors in Home Assistant](https://www.youtube.com/watch?v=Gb-4l93st8A). 👋🏻

- Over just a few weeks, Pieter van Kampen recently integrated 190 devices that respond to voice control and more than 1200 active entities from his KNX home to create over 30 automations to help with everything from mowing the lawn to controlling shades based on the sun’s location and intensity. 🪟

- MB used Zigbee buttons to help collect data for their son’s doctor after he developed some trouble sleeping. This gave excellent insight for the doctor to start looking into causes, and they even used the system remotely while doing further evaluation. 📈

- Graham Hosking took automations to another level (before we did) with his [AI Automation Suggester](https://github.com/ITSpecialist111/ai_automation_suggester) and [Automation Inspector](https://github.com/ITSpecialist111/Automation-Inspector). It takes the load off your brain by helping come up with new, clever automations! 🤖

- Wessam Lauf fell down the rabbit hole that is Home Assistant once he got his setup running. Inspired by the Graphite theme and after some LLM vibe-coding, he wrote a template for his very own theme, [Frosted Glass](https://github.com/wessamlauf/homeassistant-frosted-glass-themes) - now available in [HACS](https://www.hacs.xyz/). 🎨

- Too many of us anthropomorphize our homes, telling it to chill out when five things break the same day. Biofects took that to heart and created this [Home Assistant avatar](https://streamable.com/hnoc63) for his home (here’s a bonus, nightmare fuel [first version](https://streamable.com/xah2va)). 🫣

## Developers! 👏🏻 Developers! 👏🏻 Developers! 👏🏻

Our community is more than developers, it’s true. But we wouldn’t be the [largest open source project](https://github.blog/news-insights/octoverse/octoverse-2024/) on GitHub if we didn’t have a vibrant and active developer community. This ship sails largely due to their contributions, and we genuinely appreciate all of their efforts.

That’s why we’re eager to interview community members when we open new roles at the foundation. We’ve employed community members like [Joostlek](https://github.com/joostlek) (who designed the new [Integration Quality Scale](https://developers.home-assistant.io/docs/core/integration-quality-scale/) and helps onboard new integrations into Core), [Timo](https://github.com/TimoPtr) (who is our first ever Android developer and has focused on [polishing the Android app](/blog/2025/07/23/companion-app-for-android/)), and [Maxim](https://github.com/maximmaxim345) (a talented developer from the Music Assistant community who works on both Music Assistant and ESPHome and is one of our newest additions to the team). Their contributions have helped shape how things work around here, but it was their contributions as community members that helped pave the way for their joining the foundation. These are just a select few of the *several* new hires at the foundation who were active community members.

(Have you checked our [jobs page](https://jobs.ashbyhq.com/openhomefoundation/) recently to see what roles are open? 👀)

With our community of contributors and working with Nabu Casa on the hardware design, we have successfully launched a few new pieces of hardware. The [Home Assistant Voice Preview Edition](/voice-pe/) brought in language experts from every corner of the world to help ensure our language coverage is the most robust in the industry. Thanks to contributors, we support languages like Greek, Icelandic, and more recently Irish Gaeilge! 😎 We had community contributors help make sure the Home Assistant [Connect ZWA-2](/connect/zwa-2/) was prepared for launch last month. Sincerely, we couldn’t be more grateful for your support and efforts in these spaces.

Here are some fun stats from our GitHub contributors ([commits on our Core repo](https://github.com/home-assistant/core/graphs/contributors?from=9%2F9%2F2023)):

- Last 12 months (Sept - Aug) - 14,385
- Previous 12 months - 14,503

A SPECIAL CONGRATULATIONS to [bdraco](https://github.com/bdraco), who just last week surpassed [balloob](https://github.com/balloob) (the founder of Home Assistant) as the contributor with the most commits!

<div class="contain nb">
    <img src="/images/blog/2025-09-12th-anniversary/contributors.webp" alt="Top 8 contributors of all time for home-assistant/core" style="width:100%;max-width:700px;">
    The top 8 contributors of all time in home-assistant/core👏🏻
</div>

This is just a small peek into all the hard work that goes into maintaining Home Assistant - we have more repositories than just Core, and every single contribution is valued.

Honorable dev mention from the submitted community stories - I couldn’t leave Joostlek’s (joke) submission out. 🤣

- Our very own Head of Developer Relations (his words), Joost Lekkerkerker, says Home Assistant helps keep him off the street. He’s just launched [his new blog](https://joostlek.dev/what-is-a-smart-home/) that talks about his vision of a smart home, and how he was inspired to not buy Tuya Wi-Fi lights after seeing my experience with some path lights.

## Our humble gratitude

Community is the core of what we do and the heart of Home Assistant. We thrive because you care and contribute your valuable time to support our collective success. Whether you found our platform because you wanted more privacy from big tech, were intrigued by the number of choices implemented into a single app, or needed something to track your sustainability efforts — you support our values every day. Thanks for choosing us, and thank you for all you do to help support the foundation and the projects we maintain.

A very special thanks to all our [Home Assistant Cloud](/cloud/) subscribers and anyone who has purchased our official Home Assistant hardware. These support the full-time development of Home Assistant (along with ESPHome, Music Assistant, and so much more), and are the easiest way to ensure these projects keep getting cool new features!

We have more things coming down the line for you. In the near future, we plan on announcing a new merch store 👕. In the first half of next year, I’ll announce when Home Assistant Community Day 2026 will be. We’re already working with Nabu Casa on the next exciting hardware announcement (no spoilers…for now). And that’s not even touching the industry events we plan on attending, the State of the Open Home, and so much more. I’m excited to take you all on the journey we’re already working on over the next 12 months, and I’m always looking forward to another year of amazing contributions. 😌

<script>
    if (!document.cookie.split('; ').find(row => row.startsWith('12th-blog-confetti='))) {
        const d = new Date();
        d.setTime(d.getTime() + (24*60*60*1000)); // Once a day only
        let expires = "expires="+ d.toUTCString();
        document.cookie = "12th-blog-confetti=1;" + expires + ";path=/";

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
        script.onload = () => {
            // launch confetti. Full screen, bottom anchor
            confetti({ particleCount: 500, gravity: 1, spread: 120, scalar: 1.5, startVelocity: 150, ticks: 200, angle: 90, origin: { y: 1.4, x: 0.5 }});
        };
        document.head.appendChild(script);
    }
</script>
