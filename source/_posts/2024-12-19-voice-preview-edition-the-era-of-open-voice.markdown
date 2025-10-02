---
layout: post
title: "The era of open voice assistants has arrived"
description: "Home Assistant Voice Preview Edition is the best way to get started with our open and privacy-focused voice assistant."
date: 2024-12-19 00:00:02
date_formatted: "December 19, 2024"
author: Paulus Schoutsen
comments: true
categories: 
  - Announcements
  - Assist
og_image: /images/blog/2024-12-vpe/art.jpg
---

<lite-youtube videoid="ZgoaoTpIhm8" videotitle="Voice Chapter 8 - Voice Preview Edition launch"></lite-youtube>

**TL;DR: [Check out the product page](/voice-pe/)**

We all deserve a voice assistant that doesn't harvest our data and arbitrarily limit features. In the same way Home Assistant made private and local home automation a viable option, we believe the same can, and must be done for voice assistants.

Since we began developing our open-source voice assistant for Home Assistant, one key element has been missing - great hardware that's simple to set up and use. Hardware that hears you, gives you clear feedback, and seamlessly fits into the home. Affordable and high-quality voice hardware will let more people join in on its development and allow anyone to *preview* the future of voice assistants today. Setting a standard for the next several years to base our development around.

<p class='img'><img src='/images/blog/2024-12-vpe/vpe-packaging.png' style='border: 0;box-shadow: none;' alt="Voice Preview Edition with packaging"></p>

We're launching [Home Assistant Voice Preview Edition](/voice-pe/) to help accelerate our goal of not only matching the capabilities of existing voice assistants but surpassing them. This is inevitable: They'll focus their efforts on monetizing voice, while our community will be focused on improving open and private voice. We'll support the languages big tech ignores and provide a real choice in how you run voice in your home.

**The era of open, private voice assistants begins now, and we'd love for you to be part of it.**

### Table of contents

- [Introducing Home Assistant Voice Preview Edition](#introducing-home-assistant-voice-preview-edition)
  - [Why Preview Edition](#why-preview-edition)
  - [Built for Home Assistant](#built-for-home-assistant)
  - [Advanced audio processing](#advanced-audio-processing)
  - [Bringing choice to voice](#bringing-choice-to-voice)
  - [Fully open and customizable](#fully-open-and-customizable)
  - [Community-driven](#community-driven)
- [Conclusion](#conclusion)
  - [See what voice can do today](#see-what-voice-can-do-today)

<!--more-->

## Introducing Home Assistant Voice Preview Edition

<img src='/images/blog/2024-12-vpe/voice-preview-edition.png' style='border: 0;box-shadow: none;' alt="Voice Preview Edition with packaging">

Our main goal with Voice Preview Edition was to make the best hardware to get started with [Assist](/voice_control/), Home Assistant's built-in voice assistant. If you're already using other third-party hardware to run Assist, this will be a big upgrade. We prioritized its ability to hear commands, giving it an industry-leading dedicated audio processor and dual microphones - I'm always blown away by how well it picks up my voice around the room.

Next, we ensured it would blend into the home, giving it a sleek but unobtrusive design. That's not to say it doesn't have flair. When you get your hands on Voice Preview Edition the first thing you'll notice is its premium-feeling injection-molded shell, which is semi-transparent, just like your favorite '90s tech. The LED ring is also really eye-catching, and you can customize it to your heart's content from full gamer RGB to subtle glow.

<div style="text-align: center; margin-top: 20px;">
<img src='/images/blog/2024-12-vpe/vpe-finish.png' style='border: 0;box-shadow: none;' alt="3 different views of Voice Preview Edition">
</div>

It's hard to convey how nice the rotary dial is to use; its subtle clicks paired with LED animations are hard not to play with. Most importantly, the dial lets anyone in your home intuitively adjust the volume. The same can be said for the multipurpose button and mute switch (which physically cuts power to the microphone for ultimate privacy). We knew for it to work best, it needed to be out in the open, and let's just say that [Home Approval Factor](https://newsletter.openhomefoundation.org/open-home-approval-factor/#:~:text=2023.1%20release%20notes.-,Home%20Approval%20Factor,-We%20have%20a) was very front of mind when designing it.

We also worked hard to keep the price affordable and comparable to other voice assistant hardware at just $59 (that's the recommended MSRP, and pricing will vary by retailer). This isn't a preorder, it's available now!

<div style="text-align: center; margin-bottom: 20px;">
<img src='/images/blog/2024-12-vpe/vpe-price.png' style='border: 0;box-shadow: none;' alt="Voice Preview Edition price">
</div>

<div style="text-align: center; margin-bottom: 20px;">
  <a href="/voice-pe/">
    <img src="/images/blog/2024-12-voice-chapter-8/buy-now.png"
         style="border: 0; box-shadow: none;"
         alt="buy now">
  </a>
</div>

### Why Preview Edition

For some, our voice assistant is all they need; they just want to say a couple of commands, set timers, manage their shopping list, and control their most used devices. For others, we understand they want to ask their voice assistant to make whale sounds or to tell them how tall Taylor Swift is - this voice assistant doesn't entirely do those things ([yet](/voice_control/assist_create_open_ai_personality/)). We think there is still more we can do before this is ready for every home, and until then, we'll be selling this *Preview* of the future of voice assistants. We've built the best hardware on the market, and set a new standard for the coming years, allowing us to focus our development as we prepare our voice assistant for every home. Taking back our privacy isn't for everyone - it's a journey - and we want as many people as possible to join us early and make it better.

### Built for Home Assistant

Many other voice assistants work with Home Assistant, but this one was *built* for Home Assistant. Unlike other voice hardware that can work with Assist, this doesn't require flashing firmware or any assembly. You plug it into power, and it is seamlessly discovered by Home Assistant. A wizard instantly starts helping you set up your voice assistant, but critically, if you haven't used voice before, it will quickly guide you through what you need to get the best experience.

<p class='img'><img src='/images/blog/2024-12-vpe/wizard.webp' alt="Video of Assist wizard">Get up and running with Voice Preview Edition in minutes with our new wizard</a>

This is not a DIY product. We've worked to make the experience as smooth as possible, with easy and fast updates and settings you can manage from the Home Assistant UI.

### Advanced audio processing

If you have been following our work on voice, you know we've tried a lot of different voice assistant hardware. Most available Assist-capable hardware is bad at its most important job - hearing your voice and then providing audiovisual feedback. That was really what drove us to build Voice Preview Edition.

<p class='img'><lite-youtube videoid="DS_8cDZKBPc" videotitle="Music Assistant - VPE"></lite-youtube>Voice Preview Editions mics and audio processors effortlessly hear commands through loud music it is playing</p>

Our Assist software could only do so much with substandard audio, and its functionality is massively improved with clear audio. The dual microphones combined with the XMOS audio processing chip are what makes it so capable. Together, they allow Voice Preview Edition to have echo cancellation, stationary noise removal, and auto gain control, which all adds up to clearer audio. This combined with an ESP32-S3 with 8 MB of octal PSRAM - one of the fastest ESP and RAM combinations available - makes for an incredibly responsive device. This is the best Assist hardware you can buy today, and it will continue to give a great experience as Assist's feature set expands in the years to come.

### Bringing choice to voice

Assist can do something almost no other voice assistant can achieve - *it can run without the internet* 🤯. You can speak to your Voice Preview Edition, and those commands can be processed completely within the walls of your home. At the time of writing this, there are some pretty big caveats, specifically that you need to speak a [supported language](/voice-pe/#language-support) and have pretty powerful hardware to run it (we recommend a Home Assistant system running on an Intel N100 or better).

<p class='img'><img src='/images/blog/2024-12-vpe/local-cloud.png' style='border: 0;box-shadow: none;' alt="graphic of local vs cloud">Diagram of cloud vs local speech processing</p>

If you use low-powered Home Assistant hardware, there is an easy and affordable internet-based solution; [Home Assistant Cloud](/cloud/). This privacy-focused service allows you to offload your speech-to-text and text-to-speech processing, all while being very responsive and keeping your energy bill low. Speech-to-text is the harder of the two to run locally, and our cloud processing is almost always more accurate for more languages (visit our [language support checker here](/voice-pe/#language-support)).

Our goal is for Assist to run easily, affordably, and fully locally for all languages. As someone who has seen the rapid development of this technology over the past several years, I'm optimistic that this will happen, but until then, many languages have a good range of choices that provide strong privacy.

### Fully open and customizable

<p class='img'><img src='/images/blog/2024-12-vpe/3d-prints.jpg' style='border: 0;box-shadow: none;' alt="Some interesting cartoon-inspired 3D prints for Voice Preview Edition">We are sharing the design files if you want to 3D print a new case... these ones were inevitable</p>

We're not just launching a new product, ***we're open sourcing all of it***. We built this for the Home Assistant community. Our community doesn't want a single voice assistant, they want the one that works for them -- they want choice. Creating a voice assistant is hard, and until now, parts of the solution were locked behind expensive licenses and proprietary software. With Voice Preview Edition being open source, we hope to bootstrap an ecosystem of voice assistants.

We tried to make every aspect of Voice Preview Edition customizable, which is actually pretty easy when you're working hand-in-hand with ESPHome and Home Assistant. It works great with the stock settings, but if you're so inclined, you can customize the Assist software, ESP32 firmware, and XMOS firmware.

<p class='img'><img src='/images/blog/2024-12-vpe/grove.jpg' style='border: 0;box-shadow: none;' alt="Voice Preview Edition with packaging">Connecting Grove sensors allows you to use your Voice Preview Edition as a more traditional ESPHome device - here is it acting as a voice assistant and air monitor.</p>

We also made the hardware easy to modify, inside and out. For instance, the included speaker is for alerts and voice prompts, but if you want to use it as a media player, connect a speaker to the included 3.5mm headphone jack and control it with software like [Music Assistant](https://music-assistant.io/). The included DAC is very clean and capable of streaming lossless audio. It can also be used as a very capable ESP32 device. On the bottom of the device is a [Grove port](https://wiki.seeedstudio.com/Grove_System/) (concealed under a cover that can be permanently removed), which allows you to connect a large ecosystem of sensors and accessories.

We've also made it quite painless to open, with easy-to-access screws and no clips. We even included exposed pads on the circuit board to make modifying it more straightforward. We're providing all the [3D files](https://voice-pe.home-assistant.io/resources/) so you can print your own components... even cartoon character-inspired ones. We're not here to dictate what you can and can't do with your device, and we tried our best to stay out of your way.

### Community-driven

The beauty of Home Assistant and ESPHome is that you are never alone when fixing an issue or adding a feature. We made this device so the community could start working more closely together on voice; we even considered calling it the *Community* edition. Ultimately, it is the community driving forward voice - either by taking part in its development or supporting its development by buying official hardware or Home Assistant Cloud. So much has already been done for voice, and I can't wait to see the advancements we make together.

## Conclusion

Home Assistant ~~values~~ champions choice. Today, we're providing one of the best choices for voice hardware. One that is truly private and totally open. I'm so proud of the team for building such a great working and feeling piece of hardware - this is a really big leap for voice hardware. I expect it to be the hardware benchmark for open-voice projects for years to come. I would also like to thank our language leaders who are expanding the reach of this project, our testers of this Preview Edition, and anyone who has joined in our voice work over the past years.

The hardware really is only half the picture, and it's the software that really brings this all together. Mike Hansen has just written the [Voice Chapter 8 blog](/blog/2024/12/19/voice-chapter-8-assist-in-the-home/) to accompany this launch, and this explains all the things we've built over the past two years to make Assist work in the home today. He also highlights everything that Voice Preview Edition was built to help accelerate development.

### [See what voice can do today](/blog/2024/12/19/voice-chapter-8-assist-in-the-home/)
