---
layout: post
title: "The best gets better - Home Assistant Connect ZBT-2"
description: "We launch our newest hardware that helps connect Zigbee, Thread, or Matter devices to Home Assistant."
date: 2025-11-19 00:00:01
date_formatted: "November 19, 2025"
author: Paulus Schoutsen
comments: true
categories: Announcements Zigbee
og_image: /images/blog/2025-11-home-assistant-connect-zbt-2/art.webp
---

<img src='/images/blog/2025-11-home-assistant-connect-zbt-2/art.webp' style='border: 0;box-shadow: none;' alt="The best gets better - Home Assistant Connect ZBT-2">

The easiest way to start with Zigbee or Thread just got even better, with Home Assistant Connect ZBT-2. This USB adapter plugs into your Home Assistant system and opens up a world of smart device options. Between its precisely tuned antenna and next-generation chip, it’s a big step up for anyone looking to connect Zigbee, Thread, or Matter devices directly to Home Assistant.

For all our Zigbee fans, this might be the best upgrade you’ll make all year. We’ve squeezed every inch out of this technology, giving it the best range, speed, and stability possible. The same can be said for our Thread-heads out there (*yeah, I just came up with that cool nickname* 😎), making Matter or [ESPHome Thread](https://esphome.io/components/openthread/) connections rock-solid. Pick whether to dedicate your Connect ZBT-2 to run a Zigbee or Thread network, and it’ll provide the best experience for that protocol (and if all these names just sound like new streaming services to you, check out our explainer below).

If you’re one of those people still rocking three different hubs, what are you waiting for… another giant server outage to take down your smart home? Ditch those cloud hubs and take back your privacy today. As an added bonus, your devices will likely get more controls, range, and resilience.

Available today starting at $49 and €45 (that’s the MSRP, and pricing will vary by retailer). Designed and built by Nabu Casa and the Open Home Foundation, every purchase helps fund the development of Home Assistant. For quick specs, details, and where to buy, visit our *beautiful* [Home Assistant Connect ZBT-2 page](/connect/zbt-2).

<a href="/connect/zbt-2#buy" style="display:block;text-align:center;">
    <img src='/images/blog/2025-11-home-assistant-connect-zbt-2/buy.webp' style='border: 0;box-shadow: none;' alt="Buy the Home Assistant Connect ZBT-2">
</a>
<!--more-->

<br>

{% details "What are Zigbee, Thread, and Matter?" %}

The short answer is they’re all open standards that let smart devices talk directly to your smart hub of choice, like Home Assistant. We love open standards because they don’t rely on the cloud, which means your devices are fully under your control at home, with no risk of turning into a paperweight if the manufacturer gets bored of paying the server fees. Also, when used with Home Assistant, your smart home data never needs to leave your home, which is always better for privacy.

**Zigbee** is a wireless standard that’s been a cornerstone of smart home technology for nearly two decades, with thousands of devices from brands like Philips Hue, IKEA, Aqara, Sonoff, [frient](/blog/2025/09/02/frient-joins-works-with-home-assistant/), and [ThirdReality](/blog/2022/10/13/third-reality-partner/). There’s a good chance you already have some of these devices in your home, and they’ll have their own hubs, which frankly are just taking up extra space, as everything is better connected right to Home Assistant 😉.

**Matter** is the big new standard – [its tech is cutting-edge](/integrations/matter/#what-does-thread-have-to-do-with-matter), and growing really fast. It can use Wi-Fi to talk to devices, but if that device is battery-powered, it’ll probably use **Thread** instead. Matter devices that use Thread are getting really good, and many are [Works with Home Assistant](https://works-with.home-assistant.io/) certified, including devices from [Nuki](/blog/2025/07/03/nuki-joins-works-with-home-assistant/), [Eve](/blog/2025/04/29/eve-joins-works-with-home-assistant/), [MotionBlinds](/blog/2025/03/27/motionblinds-joins-wwha/), and [Aqara](/blog/2024/09/03/aqara-joins-works-with-home-assistant/).

Whether you set up your Connect ZBT-2 to use Zigbee or Thread, you can’t really go wrong, as both standards have devices for nearly every smart home need. Both give devices great battery life, take some strain off your Wi-Fi, and counterintuitively, [the more devices you have](/integrations/zha/#using-router-devices-to-add-more-devices), the better the range and stability can be.

{% enddetails %}

## Standing on the shoulders of giants

In 2022, we released [Home Assistant Connect ZBT-1](/connectzbt1/) (originally called [SkyConnect](/blog/2024/06/13/zbt1-annoucement/)), our first product in the Connect line and first USB adapter. Connect ZBT-1 was designed to be the easiest, most stable way to connect Zigbee devices to Home Assistant. It also came with Thread connectivity support, which was very new at the time. All these years later, it continues to receive software support and is a community favorite.

<div class="contain">
    <img src="/images/blog/2025-11-home-assistant-connect-zbt-2/zbt-1-x-zbt-2.webp" alt="The Connect ZBT-1 next to the Connect ZBT-2" style="width:100%;max-width:700px;">
</div>

Sales of Connect ZBT-1 helped fund Home Assistant’s development, and we learned so much that has influenced its next iteration. Alas, as much as we love our little Connect ZBT-1, today we’re saying goodbye. We have **now ended production of Connect ZBT-1**, but software support will continue. If you’re still using Connect ZBT-1, expect it to keep working far into the future.

If you are looking to upgrade your Zigbee network with a Connect ZBT-2, don’t forget you can continue to use your Connect ZBT-1 as a way to dip your toes into the world of Thread – it’s very easy to [switch operating modes](https://support.nabucasa.com/hc/en-us/articles/26124710072861-Switching-from-Zigbee-to-Thread-support-on-Home-Assistant-Connect-ZBT-1).

## Upgrading everything

Compared to its predecessor, this version has upgraded everything. First off, we’ve doubled the product number from ZBT-1 to ZBT-2… that’s 2x better already! But there’s definitely more.

### Stick with an antenna

First off, to achieve peak performance, we moved away from the small “stick” form factor. Small USB sticks are convenient, but USB ports and nearby electronics can create interference that weakens the signal. With Connect ZBT-1, we recommended using a USB extension cable to keep the adapter away from noise.

<div class="contain">
    <img src="/images/blog/2025-11-home-assistant-connect-zbt-2/antenna-upgrade.webp" alt="Diagram of the how the ZBT-1 antenna compares to the new antenna of the ZBT-2" style="width:100%;max-width:700px;">
    The antenna has gone from safety pin-sized 🧷, to tablespoon-sized 🥄
</div>

With Connect ZBT-2, we’ve designed away this issue. It’s much easier to properly position as it’s now a free-standing antenna and base, which is perfectly tuned for Zigbee and Thread. The larger antenna is not only good at broadcasting to further away devices, but is also good at listening out for faint signals from far away devices. We even optimized the base, which acts as a “ground plane”, boosting the antenna’s performance. It includes a 1.5 m (4.9 ft) USB cable that lets you place it in a good spot to avoid any interference.

### Four times the speed

Inside Connect ZBT-2 is the Silicon Labs MG24, an advanced Zigbee/Thread system-on-chip. Compared to the MG21 used in Connect ZBT-1, it brings higher processing power and better sensitivity to weak signals.

<div class="contain">
    <img src="/images/blog/2025-11-home-assistant-connect-zbt-2/4x-speed.webp" alt="Comparison of the speed (in terms of baud rate) between the ZBT-1 and ZBT-2" style="width:100%;max-width:700px;">
    More baud, the better 😜
</div>

We also took the opportunity to quadruple the internal communications speed of the chip – taking the baud rate from 115,200 bps to 460,800 bps. In our testing, we saw consistent improvements in device responsiveness. Don’t expect your devices to turn on four times faster, but you’ll feel the difference when turning on several devices simultaneously.

### Built for Home Assistant

It is really easy to take advantage of all this performance, as we always work to make Home Assistant hardware super easy to start with. Just plug in the device via the included cable into a spare USB port on your Home Assistant system, and the setup wizard will guide you through everything. This all works so well because the same people who built Zigbee and Thread into Home Assistant also helped build Connect ZBT-2.

You can start a new Zigbee or Thread network in minutes, or use our improved migration tools to move an existing network over. It’s a very easy upgrade, and most adapters migrate with just a few clicks. Best of all, every Home Assistant user upgrading to new adapters will benefit from these new migration tools. Just another example of how hardware sales help level up our software development.

### Compatibility and flexibility

Home Assistant Connect ZBT-2 supports Zigbee 3.0 (and yes, we’re looking at Zigbee 4.0 support as well) and is keeping pace with Thread’s rapid development. We’ve tested it working great with ZHA, zigpy-cli, [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/faq/#how-do-i-migrate-from-one-adapter-to-another), matter.js, and OpenThread Border Router, giving you the flexibility to choose how you manage your network.

If it’s a Zigbee-certified device or Matter-certified device that uses Thread, it should work out of the box. Home Assistant already has one of the widest compatibility lists in the world, and our community continuously expands it with every new release. For brands that support the functionality, there are also Over-the-Air (OTA) firmware updates for devices.

*Just note:* Connect ZBT-2 can only use one protocol at a time, meaning you must choose either Zigbee or Thread. We’ve done extensive testing in the past on [running both at the same time](/connectzbt1#:~:text=What%20is%20the%20current%20state%20of%20multiprotocol%20support%3F), and found it just doesn’t work well for a whole list of reasons.

### Second-generation power

Our second-generation Connect line products are all about being open and performant, and one addition that fulfills this promise is our inclusion of the ESP32 chip. Connect ZBT-2 includes an ESP32-S3 as its USB controller, which is a little overkill for this job, but opens up a world of possibilities.

ESP32 devices are well understood by our team, but also the community. It means that anyone can change the firmware on this chip and possibly unlock cool new abilities. For instance, our recently released <a href="/connect/zwa-2">Connect ZWA-2</a> uses this same chip to support [experimental firmware](/blog/2025/10/13/portable-z-wave-with-wifi-and-poe/) that adds new functionality. This isn’t to say we’ll do the exact same thing with Connect ZBT-2; it’s more to say the sky’s the limit with our second-gen products. The firmware it ships with is just the start, and we have some cool ideas cooking on what we can do next.

### Open design

<div class="contain">
    <img src="/images/blog/2025-11-home-assistant-connect-zbt-2/open-design.webp" alt="A look inside the ZBT-2 showing the illustrated PCB and components" style="width:100%;max-width:700px;">
    Look at all those exposed pins and pads 🤤
</div>

When we say open, we mean it. In the physical sense, it’s easy to open Connect ZBT-2 as there are no clips or glue, just some lovely standard Phillips head screws. The board has a gorgeous silkscreen, which explains all the chips, exposed pins, and pads.

The bootloader is unlocked, and all the firmware we build is open source and available to modify. We’ve also [built a new website](https://toolbox.openhomefoundation.org/) that makes it easy to flash the stock firmware, and in the future, experiment with new firmware. We’ll also be providing the PCB and outer casing files if you want to tinker with those. Openness makes our products better… literally, since our community helps us find and fix bugs.

### Why USB?

Before you get in the comments asking about Power-over-Ethernet (PoE)… we totally agree it’s cool, but on this occasion, it’s not the direction we took. Yes, PoE has become easier to use and its performance, if implemented correctly, can be quite good (our testing with Connect ZWA-2 shows a [pretty minor speed hit](/blog/2025/10/13/portable-z-wave-with-wifi-and-poe/#performance)). Connect ZBT-2 is focused solely on ease-of-use and pure performance. That said, there are a lot of PoE fans at the foundation, and product sales help fund development, so who knows, maybe we’ll find a way to please everyone.

### Don’t hide it

<div class="contain">
    <img src="/images/blog/2025-11-home-assistant-connect-zbt-2/dont-hide-it.webp" alt="The Home Assistant Connect ZBT-2 device placed next to a stack of books on a black side table, next to a large green houseplant." style="width:100%;max-width:700px;">
</div>

Most other USB adapters are designed to be hidden away, dangling behind a server cabinet. For one thing, antenna orientation is pretty important, but also cool tech should be on show! We’ve designed Connect ZBT-2 to be proudly displayed, and the top even lights up like a candle – perfect timing for the holidays 🕯️.

## It all adds up

<div class="contain">
    <img src="/images/blog/2025-11-home-assistant-connect-zbt-2/visual-map-before-after.webp" alt="A comparison between the ZBT-1 and ZBT-2 on the Zigbee network visual map" style="width:100%;max-width:700px;">
    Not science, but an interesting before-and-after of just one network, about a 60% increase in direct connections 🤩
</div>

[Nabu Casa](https://www.nabucasa.com/), the commercial partner building all official Home Assistant hardware, has knocked the build of this device out of the park. When you combine every small improvement made to Connect ZBT-2, it adds up to a nice performance improvement, while maintaining its predecessor’s reputation for rock-solid stability. What’s more, every purchase helps support the Open Home Foundation and funds the development of Home Assistant. Upgrading your smart home has never felt so good!

## What are you waiting for?

Get the most out of your smart home with an adapter that’s open source at its core, delivers maximum performance, and looks good doing it. [Home Assistant Connect ZBT-2](/connect/zbt-2) is available today for purchase, and as always, thanks for supporting Home Assistant!
