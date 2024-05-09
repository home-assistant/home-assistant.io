---
layout: post
title: "Music Assistant 2.0: Your Music, Your Players"
description: "Connecting multiple music libraries to almost any smart speaker."
date: 2024-05-09 00:00:01
date_formatted: "May 09, 2024"
author: Marcel van der Veldt
comments: true
categories: Music-Assistant
og_image: /images/blog/2024-05-music-assistant/art.jpg
---
<p><img src='/images/blog/2024-05-music-assistant/art.jpg' class='no-shadow' /></p>

Today, exactly five years ago, I started working on [Music Assistant](https://music-assistant.io/). What began as a quick script to sync my playlists when I wanted to switch between streaming providers grew into a beast on its own.

What I’d like to call a “music library manager” that gives you full control of playing YOUR music on your players. Just like Home Assistant centralizes all your devices and services to work together, Music Assistant does the same with your music sources and smart audio-playing devices. This is just one of the many [Home Assistant Add-on’s](https://www.home-assistant.io/addons/) that can massively expand its smart capabilities.

<p class="img"><img src='/images/blog/2024-05-music-assistant/how-it-works.jpg'/>From source to Music Assistant to speaker</p>

<p style="margin-left: 25px;"><b>Connect:</b> Music Assistant allows you to quickly connect some of the <a href="https://music-assistant.io/music-providers/">most popular streaming providers</a> like Spotify and Tidal, with your local media files. Importing your liked tracks, artists, albums, and playlists, all displayed with the correct artwork.</p>

<p style="margin-left: 25px;"><b>Unify:</b> Your local and cloud libraries will be seamlessly merged together. If you have the same track on multiple place, it will appear once while helping you find the highest-quality version. You can even have multiple accounts from the same provider, allowing everyone in the house to have their playlists in one place.</p>

<p style="margin-left: 25px;"><b>Play anywhere:</b>  It supports the most ubiquitous <a href="https://music-assistant.io/player-support/">streaming protocols and devices</a> like Airplay, Cast and DLNA, letting you play media on almost any device - if an old speaker doesn’t support new services, Music Assistant can bring it back to life.</p>

<p style="margin-left: 25px;"><b>Advanced features:</b> It can group supported players for synchronized playback. It also supports advanced playback features such as crossfade and volume normalization - regardless of whether the device supports them. </p>

<p style="margin-left: 25px;"><b>Built for Home Assistant:</b> Connecting this with the Home Assistant integration - automation and voice control supercharges the whole experience.</p>

**Your music, your players.** Click and play. It should be as simple as that.

<!--more-->

Start me up
-----------

After many years of development and testing with the amazing community, we can finally say this is ready for daily use.

Even though Music Assistant is an HA Add-on, it can be installed from start to finish via [HACS](https://hacs.xyz/). You simply install the integration, which will automatically install and manage the add-on for you. The integration allows you to control your devices with automations and voice control.

<p class="img"><img src='/images/blog/2024-05-music-assistant/start-me-up.png'/></p>

For users without the Home Assistant Operation System (or supervisor) we also have a [docker installation](https://music-assistant.io/installation/) available to run the server.

Fight the power
---------------

I started Music Assistant out of frustration about the mainstream available options;

*   You buy into an all-in-one ecosystem (such as Sonos), and then it's up to that ecosystem to decide which music sources to support now and in the future.
    
*   You choose a music streaming provider, and then somehow that streaming provider decides where/how you play their music.
    
*   You want to switch between streaming providers and keep your carefully curated playlists, regardless of which provider you want to play it with.
    
*   You still have your CD music collection that you’ve painstakingly ripped into high-quality files on local storage, and you want to play them, maybe even mix them with choices from streaming providers.
    
*   Or maybe you fall into the category of users who don’t want any subscriptions and have a carefully curated local media collection you want to play on these shiny new playback devices.
    

When we pay for our music or devices, we shouldn’t be limited by arbitrary limitations. We are slowly moving into a world of greater walled gardens and more vendor lock-in, and it’s time we took back control. 

<p class="img"><img src='/images/blog/2024-05-music-assistant/fight-the-power.jpg'/><i>Tidal on a Google Home</i></p>

I spent a long time and a good bit of my money looking at existing solutions to fill these gaps. They were either expensive, closed, or lacked the home approval factor - or a combination of all of these.

Freedom of choice
-----------------

Music Assistant connects to your favorite streaming providers and local music files, letting you play them on almost any connected playback equipment from the past 20 years. It’s basically a translator of music protocol A towards speaker/player protocol B.

<p class="img"><img src='/images/blog/2024-05-music-assistant/freedom-of-choice.png'/></p>

For instance, I have a traditional amplifier + speakers setup in my living room that allows for high-quality music playback, where I can sit down and hear every detail. I also have Sonos speakers in a very noisy kitchen and some DIY speakers that can only accept Airplay. I can play my music to all of these speakers without being tied down to any single ecosystem.

Some people might say that the best way to prevent all that frustration is by buying into an ecosystem like Sonos which takes care of this for you entirely. While I am a big fan of Sonos (and I will recommend them to friends and family for ease of use), I am not a big fan of the vendor lock-in that comes with it. If Sonos or a streaming service decide to part ways, I don’t have to be locked out of my music. Also, they don’t make speakers at every price point, meaning you don’t get the advantages of the new higher-fidelity or more affordable hardware out there.

Come together
-------------

In the same interface as I can stream my kids’ music to their speakers, I can stream my Hi-Res favorites to my high-fidelity setup. It is an all-in-one interface. Gone are the days of needing five different apps to get playback going in multiple parts of the house or switching who is connected just to access their playlists.

<p class="img"><img src='/images/blog/2024-05-music-assistant/come-together.png'/></p>

When you search in Music Assistant, it searches all your libraries. Every streaming service, or the local files you add, are available to choose for playback.

We are family
-------------

Music Assistant has always been closely linked to Home Assistant (more on that below). I now even work for Nabu Casa, partly because of my work on Music Assistant (but now I’m the Matter guy). 

<p class="img"><img src='/images/blog/2024-05-music-assistant/we-are-family.png'/></p>

Because of this strong link, Home Assistant seamlessly links with Music Assistant, unlocking several advanced features. MA players are exposed to HA and can be controlled via your dashboards, automations, and scripts. This allows HA users to control their music players and access MA’s powerful music search function. Players can provide TTS (Text-to-Speech) announcements and can be controlled by Home Assistant connected voice assistants.

Liner notes 
------------

So, I started working on [Music Assistant](https://github.com/music-assistant) exactly five years ago, at first for my own personal use. It started as a learning exercise - thanks to it, I learned asyncio Python programming as well as the Vue frontend framework. I had the project on GitHub just to host the code, but it was not really meant to be used by others.

At some point, it became clear to me that there was a real demand, and I posted some info on how to install it, which gained a little attention. In June 2022, we released the 1.0 version of Music Assistant, and it was still in rough shape but already suitable for many users. We even organized a Livestream, “[Let’s get Loud](https://www.youtube.com/watch?v=SEH-DxOsywg)” hosted by Home Assistant, to promote [audio support for ESPHome](https://esphome.io/components/media_player/i2s_audio.html) and the super cool things you can build when you combine these three open-source projects.

Version 1.0 was not everything we hoped it would be. It had some structural bugs, specifically running as a custom component in Home Assistant. HA was created to give you the best experience for automating your home; it was never optimized for real-time audio streaming. On top of that, at some point, the dependencies of both projects got so conflicted that Music Assistant stopped working completely in the March 2023 release of HA.

Six months after its initial version 1.0 launch, the project was beginning to look like it was going to die, so I decided to start over and go back to the drawing board. The engine of MA needed to be its own isolated component, responsible for giving you the best possible experience of streaming music (where audio quality and latency are very important), and the HA-side should be responsible for automating your house and music.

So, the Music Assistant Server was born. It is a standalone application that you can run in docker (or Home Assistant add-on), all connected to HA via a HACS integration. The project was split up into multiple self-contained parts. 

Music Assistant Server has its own web interface, a modern interface written in Vue. Thanks to HA's add-on system, this web interface can be securely accessed from HA. The web interface is a Progressive Web App (PWA), so you can also visit it directly and [install it on your device](https://support.google.com/chrome/answer/9658361?hl=en-GB&co=GENIE.Platform=Desktop). We also have an (experimental) [desktop app](https://music-assistant.io/companion-app/).

Over the past year, we have been iterating on this with an impressive number of beta testers. So, while technically this is a 2.0 release, to me personally this is the first real release, as this is finally something that feels good and has the right foundation. What is also super is that we attracted contributors to the project, folks helping create and maintain music integrations while providing support or translations. Even more exciting there are some really big features and streaming services on the horizon. My sincere thanks to everyone who has helped bring this release home.