---
layout: post
title: "Music Assistant's next big hit"
description: "Spotify Connect, Assist streaming, podcasts, audiobooks, Apple Music, a full EQ, and more!"
date: 2025-03-05 00:00:01
date_formatted: "March 5, 2025"
author: Marcel van der Veldt
comments: true
categories: Music-Assistant
og_image: /images/blog/2025-03-music-assistant/art.jpg
---

<p><img src='/images/blog/2025-03-music-assistant/art.jpg' alt="Music Assistants next big hit" class='no-shadow' /></p>

Over the past several months, [Music Assistant](https://www.music-assistant.io/) has been hitting all the right notes with new features, greater stability, and a crescendo of contributors who keep pushing the project forward. If you're [unfamiliar with Music Assistant](/blog/2024/05/09/music-assistant-2/#what-is-music-assistant), it allows you to merge your libraries from leading audio streaming providers and local files, letting you play them on the most popular smart speakers. Since our [last update](/blog/2024/05/09/music-assistant-2/), Music Assistant has had a couple of big releases, but our most recent might just be our platinum record 💿, with a lot of new functionality coming in version 2.4. In case you've missed the last few updates, here are the biggest additions.

**Table of contents**
- [Optimized for Assist](#say-my-name)
- [External audio & Spotify Connect](#across-the-universe)
- [Podcasts & Audiobooks](#radio-ga-ga)
- [More players and providers](#new-sensation)
- [Equalizer control & features](#all-about-that-bass)
- [Home Assistant improvements](#master-of-puppets)
- [More stable streaming](#d-d-dont-dont-stop-the-beat)
- [Get Music Assistant 2.4 today!](#drop-it-like-its-hot)

<!--more-->

### "Say My Name"
<h4 style="margin-top: -1em; opacity: .67;">Optimized for Assist</h4>
<p class="img"><img src='/images/blog/2025-03-music-assistant/voice_ma.jpg' alt="audiobooks page"/>We should have called it Hi-Fi edition</p>

The most recent release has some great advancements for [Assist](/voice_control/) devices, like the [Home Assistant Voice Preview Edition](/voice-pe/). We've been working closely with the [ESPHome](https://esphome.io/) team to ensure the most optimal audio streaming experience, which has helped make Assist devices into very capable media players. The community has even added some great functionality to fully [control your media player with your voice](https://github.com/music-assistant/voice-support), including choosing songs, artists, and more. Voice Preview Edition has a high-quality DAC that provides very clean audio playback from its 3.5mm jack, allowing you to stream lossless audio to connected speakers (this $59 device puts some of my expensive Hi-Fi gear to shame!).

### "Across the Universe"
<h4 style="margin-top: -1em; opacity: .67;">External audio & Spotify Connect</h4>
<p class="img"><img src='/images/blog/2025-03-music-assistant/spotify_connect.jpg' alt="Spotify Connect on a Voice PE"/>Spotify Connect on Voice Preview Edition</p>

Another feature in the latest release is support for "external audio sources", which can be provided either by players themselves (source control) or with plugins. The first plugin to deliver this functionality is Spotify Connect. It's the easiest way to use Spotify with Music Assistant, and can be enabled on any player. This makes any Music Assistant supported device a Spotify Connect supported device (can confirm, Voice Preview Edition is great for this). [To get started](https://www.music-assistant.io/plugins/spotify-connect/) go to Music Assistant's settings, add the Spotify Connect Plugin, choose the devices you would like it to use, and within Spotify you will see the device as a player. Just note, Spotify Connect requires a Premium account to work.

We've got our sights set on adding even more plugins like this down the line (AirPlay, anyone?). We're also hard at work making the whole setup process super simple, particularly for those using the Voice Preview Edition who might not need every single Music Assistant feature, but still want this simple casting capability.

### "Radio Ga Ga"
<h4 style="margin-top: -1em; opacity: .67;">Podcasts & Audiobooks</h4>

<p class="img"><img src='/images/blog/2025-03-music-assistant/audiobooks.png' alt="audiobooks page"/>The full book's progress is tracked, and chapters are clearly shown</p>

Your library just got a whole lot bigger! Music Assistant now has native support for podcasts and audiobooks. For podcasts, several providers have been added, including [Subsonic](https://www.music-assistant.io/music-providers/subsonic/), [YouTube](https://www.music-assistant.io/music-providers/youtube-music/), and [RSS feeds](https://www.music-assistant.io/music-providers/podcastfeed/). Audiobooks can be added via two brand new providers: [Audible](https://www.music-assistant.io/music-providers/audible/) and [Audiobookshelf](https://www.music-assistant.io/music-providers/audiobookshelf/), or imported directly from your local files. Audiobook playback presents the entire book as a single bar with dots showing each chapter (even if the book is separated into multiple files), allowing you to really track your progress. The entire core has been adjusted to keep better track of your progress through any media, so you will always resume where you left off.

<p class="img"><img src='/images/blog/2025-03-music-assistant/continue.png' alt="Continue listening section"/>The "Continue listening" section on the home page takes you back to where you left off</p>

### "New Sensation"
<h4 style="margin-top: -1em; opacity: .67;">More players and providers</h4>

Shortly after our last blog post, we added support for [Apple Music](https://www.music-assistant.io/music-providers/apple-music/) which was one of the most requested additions in the comments. A couple of other new providers were added, including [iBroadcast](https://www.music-assistant.io/music-providers/ibroadcast/) and [SiriusXM](https://www.music-assistant.io/music-providers/siriusxm/). For new hardware support we've added support for [Bluesound](https://www.music-assistant.io/player-support/bluesound/) players. If you have a provider or player you love and want to see it in Music Assistant, [request it](https://github.com/orgs/music-assistant/discussions?discussions_q=sort%3Atop)---but better yet [join us in developing it](https://github.com/music-assistant/server)!

### "All About That Bass"
<h4 style="margin-top: -1em; opacity: .67;">Equalizer control & features</h4>

<p class="img"><img src='/images/blog/2025-03-music-assistant/eq.png' alt="PEQ page"/>Make your own EQ settings or import pre-made settings for your speaker</p>

When we released 2.0 there were basic bass and treble controls for devices, but with our new [configurable DSP](https://www.music-assistant.io/audiopipeline/) (Digital Signal Processor) you can now fine-tune your audio like never before. This includes input and output gain, along with a powerful [parametric equalizer](https://www.music-assistant.io/dsp/parametriceq/) that can be applied per player 📈. You can conveniently view the entire audio pipeline by clicking the quality indicator icon.

<p><img src='/images/blog/2025-03-music-assistant/audio_path.png' alt="Music Assistants next big hit" class='no-shadow' /></p>

Another useful feature added was a "[Don't stop the music](https://www.music-assistant.io/usage/#:~:text=Don%27t%20Stop%20The%20Music%20(DSTM))" mode that keeps music playing even once your queue finishes, playing similar songs from your library. Another way to keep the music playing is through lock screens and widget controls built into many popular operating systems, which can now control Music Assistant.

### "Master of Puppets"
<h4 style="margin-top: -1em; opacity: .67;">Home Assistant improvements</h4>

Home Assistant was always designed to work seamlessly with Music Assistant, and it's only getting better. In the [Home Assistant 2024.12 release](/blog/2024/12/04/release-202412/#new-integrations), we gave the community a Christmas present--Music Assistant moved from HACS to being a native integration ([please migrate if you haven't yet](https://www.music-assistant.io/integration/migrate/)).

Many people now add all their players to Music Assistant first and then integrate Music Assistant with Home Assistant, eliminating the need to add each device separately. The most recent release added the ability to outsource any player control, including volume or turning it on/off, to a Home Assistant entity. There are other benefits to using them together, like Music Assistant [resuming audio playback](https://www.music-assistant.io/integration/announcements/) after an announcement or using Assist to find and play a song ([with or without LLMs](https://github.com/music-assistant/voice-support)).

### "D-D-Don't Don't Stop the Beat"
<h4 style="margin-top: -1em; opacity: .67;">More stable streaming</h4>

One of the biggest goals for every release is to improve streaming stability across all providers and players. With every release, we've been improving stability, and since our last post, we've had a big influx of users who have been finding and helping squash bugs. There have been nice improvements to almost every provider helping with stability, speed, and quality. Just in the next patch release 2.4.3, we've improved streaming performance on slower network connections. The goal is that the music never stops.

## "Praise You" - 🙏

A huge thank you to everyone who contributed to this release---whether through code, testing, or feedback. Your support keeps Music Assistant evolving into the ultimate tool for managing your music, on your players.

## "Drop It Like It's Hot"
<h3 style="margin-top: -1em; opacity: .67;">Get Music Assistant 2.4 today!</h3>

If you haven't updated yet, now's the time! And if you haven't used it yet, you can install Music Assistant as a Home Assistant Add-on,

[<img src='https://my.home-assistant.io/badges/supervisor_addon.svg' style='border: 0;box-shadow: none;' alt="!Open your Home Assistant instance and show the dashboard of an add-on.">](https://my.home-assistant.io/redirect/supervisor_addon/?addon=d5369777_music_assistant)

For more on getting started with Music Assistant, [read the documentation](https://www.music-assistant.io/installation/).

Have feedback or want to contribute? Join our growing community on GitHub and Discord!

Happy listening!
