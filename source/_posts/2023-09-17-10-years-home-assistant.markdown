---
layout: post
title: "10 years Home Assistant"
description: ""
date: 2023-09-17 00:00:03
date_formatted: "September 17, 2023"
author: Paulus Schoutsen
comments: true
categories: Announcements
og_image: /images/frontpage/HA10_-_Website_banner.png
---

TL; DR:

- Home Assistant is 10 years old and the second most active open source project on GitHub.
- Nabu Casa is 5 years old. There are no investors and development of Home Assistant is sustainable.
- Home Assistant Cloud now supports custom domains for remote connections.
- The Open Home vision is updated and is now about privacy, choice and sustainability.
- The Home Assistant logo has been streamlined and refined, yet remains familiar. [Learn more here.][logo-blog]
- Home Assistant Green is a new $99 hub and the easiest way to get started for people new to the Home Assistant ecosystem. [Learn more here.][green-blog]

[![Home Assistant Green](/images/blog/2023-09-ha10/green-intro.png)][green-blog]

<!--more-->
<hr>

It’s 2012 and I was a visiting scholar at the University of California, San Diego working on finishing my Master thesis. It’s back then when the first Philips Hue product hit the market: a hub and 3 light bulbs for around $200. The hub had something that would change my life: it had a local API that allowed local control.

I’ve always been really into programming and so I immediately started toying with the Hue API in Python, my language of choice. There is something very satisfying about making things change in the real world from your code. On September 17, 2013 I decided that this playground had evolved into something that others could use too, and pushed the first version of Home Assistant to GitHub.

I wasn’t planning on changing the world. It was a playground, a place where I could use the latest technology and explore all the possibilities with Python. But bit by bit Home Assistant gained traction, more contributors joined and we slowly started to build a community.



<p class='img'>
<img src='/images/blog/2023-09-ha10/gitter-ha.png' alt='3 people chatting about how great the Home Assistant community is.'>
Home Assistant channel on Gitter, December 3, 2015
</p>


Building a community is hard and the early years are the most important, it’s when the foundation is set and adjusting its course later is very hard. Luckily we’ve had a great group of people both working on the code as well as helping people solve their problems using Home Assistant.

<p class='img'>
<img src='/images/blog/2023-09-ha10/hackernews-ha.png' alt="davidu: This project is far and away becoming the standard for Home Automation. Incredible to watch over the last couple years. Klathmon responds: Not only that, but Home Assistant is by far my favorite example of a well run 'crowd run' open source project. There's no big company bankrolling it (well there kinda is since ubiquiti hired the creator, but not to the same extent something like Chromium is just google), there are a HUGE number of committers, and the structure encourages people to maintain and improve their own contributions via 3rd party packages. There's no fighting, there's not much gatekeeping, it's not overly complicated, and they are EXTREMELY welcoming to new contributions, no matter how 'unique' the use case is (look at some of the integrations! There's integrations for local bus schedule systems!). And on top of that, there's world-class documentation! That's rare enough in paid products, but to see it from a project like this, and the fact that it's almost always up to date is simply amazing. They held my hand through creating 2 new integrations, and I haven't developed in python for almost 10 years, and they were extremely helpful, responsive, and at the end of the day the product got better for everyone. I really don't have enough good things to say about Home Assistant.">
<a href="https://news.ycombinator.com/item?id=17827128">HackerNews, August 23, 2018</a>
</p>

## The Improvement Beat

There are many things that have led to our success: our architecture, the quality of the documentation and an amazing community willing to help one another. But the one thing underlying the success of all of these has been our frequent release schedule. It creates a rhythm that synchronizes the community in publishing their work.

We used to do a release every two weeks and it set the schedule for everything else. Every two weeks we had to make sure the contributions that were almost done got finished, the documentation was updated and extensive release notes were written. Every release is an opportunity for users to try out new features and provide feedback, feedback we could incorporate and let them try again two weeks later. Our schedule got adopted across our community, and every project started to do a release every two weeks, like for example the [Home Assistant Podcast](https://hasspodcast.io/).

<p class='img'>
<img src='/images/blog/2023-09-ha10/release-beat.png' alt='A list of blog posts with release notes.'>
At the start of 2019, we still did a release every 2 weeks
</p>

The downside of a two week schedule is that the developers and community burned themselves out. Every release finishes in a small sprint to wrap things up, and then a period of quick turnaround for inevitable bugs that popped up. We were sprinting while we had to run a marathon; it wasn’t sustainable. We decided to move it to a monthly release and adopted date-based version numbers in [Home Assistant 2022.12](/blog/2020/12/13/release-202012/).

Still, even with 12 releases per year there is no other smart home platform that evolves as fast as Home Assistant. Every month many new features arrive to allow users to get even more out of their smart home.

## The Operating System

The original audience of Home Assistant was die-hard tech nerds. You had to install Python, Home Assistant and all of its dependencies manually. When Pascal Vizeli [introduced the Home Assistant Operating System](/blog/2017/07/25/introducing-hassio/) (then called hass.io) the first step was made to bring Home Assistant to non-technical users. Now users could install Home Assistant on an SD card, put it into a Raspberry Pi and have a fully working home automation hub that can update via the user interface. Users could fully focus on automating their home.

## Thinking Big

When Home Assistant turned five, [we launched Nabu Casa](/blog/2018/09/17/thinking-big/). The goal of Nabu Casa is to make the development of Home Assistant sustainable. Nabu Casa came just in time, as it gave our developers some time to breathe. We had to grow to around 10 people before both Pascal and I felt like all our day-to-day tasks could be shared.

Home Assistant is the 2nd most active open source project on GitHub ([source](https://octoverse.github.com/2022/state-of-open-source)). Running a project this large requires a lot of administration, processes, structure and maintenance. This is provided by full-time Nabu Casa employees so that contributors can focus on the fun part: building Home Assistant.

Nabu Casa offers a service called [Home Assistant Cloud](https://www.nabucasa.com). It’s a cloud extension for your local Home Assistant instance that allows you to access it remotely via an end-to-end encrypted connection, use state of the art text-to-speech system for notifications and integrate with voice assistants.

Today we’re launching an often requested feature for Home Assistant Cloud: support for custom domains. [Check out the docs on how to get started.](https://www.nabucasa.com/config/remote/#using-a-custom-domain)

## The Open Home

While building Home Assistant, we realized that our focus was too narrow. We can make the most epic smart home platform (for the record: we do), but if all your devices still communicate via the cloud, you cannot have privacy and local control.

And so the Open Home was born. It is our vision for a smart home that is built around privacy, choice and durability. Today, we’re going to make a small adjustment to this vision, and we’re replacing durability with sustainability. Sustainability includes the previous definition of durability (things need to keep working) but expands it with saving energy. Overall the term needs less explanation.

For the Open Home, sustainability means:

- Ensure durability and longevity of our supported devices to reduce e-waste and eliminate corporate planned obsolesce.
- Upgrade existing devices with smart plugs or other technology.
- Switch to renewable energy sources by supporting solar energy hardware and support for electricity data sources.
- Consume energy meaningfully by providing data-driven insights.
- Reduce reliance on cloud computing data centers. Being local is greener than depending on the cloud.

<img class='no-shadow' src='/images/blog/2023-09-ha10/open-home-values.png' alt='The Open Home values: privacy, choice and sustainability'>

## Competing with Big Tech

Home Assistant is not only big in the open source world, we’re also big in the real world. Earlier this year the Verge [named us](https://www.theverge.com/23749376/smart-home-explained-voice-assistant-tv-gadgets) among the 5 big smart home platforms among Apple, Amazon, Google and Samsung.

We are not afraid that our competition will take away our audience. None of them run fully local and none allow users to access their own data outside of their own apps. This means that none of those platforms have the core values to ever become the foundation of the home of the future. With open source we will keep creating more value on our open ecosystem while the competitors will continue to focus to find places to monetize their user base.

## Refreshing the Home Assistant logo

<p class='img'>
<img src='/images/blog/2023-09-ha10/logo-cover.png' alt='Beautiful new Home Assistant logo. It is a refined version of the old logo. Feels very familiar.'>
The new Home Assistant logo. Designed by Madelena Mak.
</p>

Today we’re introducing a refreshed and refined logo for Home Assistant that feels familiar. We will be rolling it out in the next couple of weeks. [Learn more about the new Home Assistant logo.][logo-blog]

## Share the love

<p class='img'>
<img src='/images/blog/2023-09-ha10/share-the-love.jpg' alt='Photo of Paulus Schoutsen speaking to a crowd. The slide behind him shows the text "Share the love".'>
Paulus Schoutsen, State of the Union, 2018
</p>

Home Assistant is made by people that love home automation and want to make the best platform. It’s a product of love and you feel that as soon as you open the app. It runs fully local and nothing is hidden behind paywalls or held back for future monetization opportunities. Home Assistant is your platform and you can use it, and your data, the way you want.

Historically, it has been difficult to get started with Home Assistant because you had to bring your own hardware; a Raspberry Pi or similar. We’ve solved this by introducing [Home Assistant Yellow](/yellow), our own smart home hub powered by Home Assistant. The Home Assistant Yellow is the power user dream. It’s powered by a Raspberry Pi Compute Module 4, includes Zigbee and Thread, and can be extended using an SSD.

Since the release of the Home Assistant Yellow the price of components, including the Compute Module 4, have increased significantly. This caused the Home Assistant Yellow to become more expensive and no longer a good fit for users who are just starting out with Home Assistant.

Today we are introducing an affordable way for new users to start their smart home with Home Assistant: the Home Assistant Green – and it costs only $99 (MSRP). [Learn more about Home Assistant Green.][green-blog]

[![Home Assistant Green](/images/blog/2023-09-ha10/green-intro.png)][green-blog]

[green-blog]: /blog/2023/09/17/home-assistant-green-your-entry-to-home-assistant/
[logo-blog]: /blog/2023/09/17/a-refreshed-logo-for-home-assistant/

## Thank You! 🙏

A big thank you for all the people who have contributed to Home Assistant and its community over the last 10 years. Code, bug reports, helping others figuring out things or moderating our community: thank you so much. This wouldn’t have been possible without you.
