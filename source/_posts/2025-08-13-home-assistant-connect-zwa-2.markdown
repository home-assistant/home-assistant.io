---
layout: post
title: "Z-Wave reborn - Home Assistant Connect ZWA-2"
description: "Announcing the ultimate way to connect Z-Wave devices to Home Assistant"
date: 2025-08-13 00:00:01
date_formatted: "August 13, 2025"
author: Paulus Schoutsen
comments: true
categories: Announcements Z-Wave
og_image: /images/blog/2025-08-home-assistant-connect-zwa-2/art.webp
---

<img src='/images/blog/2025-08-home-assistant-connect-zwa-2/art.webp' style='border: 0;box-shadow: none;' alt="Z-Wave reborn - Home Assistant Connect ZWA-2">

Introducing the [Home Assistant Connect ZWA-2](/connect/zwa-2/), the ultimate way to connect Z-Wave devices to Home Assistant. Between its optimized antenna and seamless integration with Home Assistant, it should be a big upgrade for anyone using Z-Wave today.

If you’re not using Z-Wave, it's time to take a second look, as Connect ZWA-2 is a different beast. It might be just what you need to reach that tricky spot in your home… or even beyond. Connect ZWA-2 supports Z-Wave Long Range, and this modern take on the standard delivers exceptional reach along with more responsive, battery-efficient devices. Every home is different, but our testers have managed connections in places they once thought impossible.

Join the smart home range revolution for **$69 or €59** (that’s the recommended MSRP, and pricing will vary by retailer). For quick details, specs, and where to buy, visit our [Home Assistant Connect ZWA-2 page](/connect/zwa-2/). It's available for purchase today. Read on to learn what goes into the ultimate Z-Wave upgrade.

<a href="/connect/zwa-2" style="display:block;text-align:center;"><img src='/images/blog/2025-08-home-assistant-connect-zwa-2/buy.webp' style='border: 0;box-shadow: none;' alt="Buy the Home Assistant Connect ZWA-2"></a>
<!--more-->

## We love open standards

Open standards let you connect devices directly to Home Assistant for local, private control, and keep working for years, even if the manufacturer disappears. To make connecting these standards as seamless as possible, we like to build our own hardware.

In late 2022, we launched [Home Assistant Connect ZBT-1](/connectzbt1/) (formerly SkyConnect), a USB adapter for Zigbee and Thread. It made both protocols much easier to get started with, and sales helped fund Home Assistant development. We knew the next standard to tackle was Z-Wave, and after another couple of hardware launches ([Home Assistant Green](/green) and [Voice Preview Edition](/voice-pe/)), we finally had the time to do it right.

### Why Z-Wave?

If you’re new to Z-Wave, its key advantage over other open standards is its use of sub-GHz radio waves, which are better at getting through thick walls and reaching across large households. While Wi-Fi, Bluetooth, Zigbee, and Thread all compete for the same crowded airspace (2.4 GHz), Z-Wave operates in its own much quieter spectrum (865-926 MHz). Z-Wave is great for range, but its new [Z-Wave Long Range variant](https://z-wavealliance.org/what-is-z-wave-long-range-how-does-it-differ-from-z-wave/) builds even further on this… _but more on that later_.

As the standard is over two decades old, it's had a lot of time to iron out any kinks, but it also has over 4,500 certified devices to choose from. Our opt-in stats show over 130,000 Home Assistant households are using Z-Wave today. Several [Works with Home Assistant](https://works-with.home-assistant.io/) partners are building amazing Z-Wave products, including [Zooz](/integrations/zooz/), [Shelly](/integrations/shelly_zwave/), [Ultraloq](/integrations/ultraloq/), [Leviton](/integrations/leviton_z_wave/), and [Homeseer](/integrations/homeseer/). You can also go to any local marketplace and pick up any working Z-Wave smart device, no matter how old, and it will still connect with Home Assistant!

## Connect ZWA-2 in-depth

We’ve learned a lot about hardware since the launch of Connect ZBT-1, and we also knew we could breathe some new life into Z-Wave on Home Assistant. Making this device was the start of us leveling up the Connect platform and establishing our **second generation**, which is all about building the most performant and open design. That is why we jumped straight to _two_ for this Connect ZWA-2!

### Go big or go home

To be the most performant, we knew we had to ditch the “stick” form factor. It was never ideal, as USB ports can output a lot of interference. We even shipped a USB extender with Connect ZBT-1, and urged people to use it, as it kept the device away from any noisy components. Instead of building a stick we built an _adapter_, which includes an optimized standalone antenna and base that connects to your Home Assistant system with a USB cable.

<img src='/images/blog/2025-08-home-assistant-connect-zwa-2/precisely-engineered.webp' style='border: 0;box-shadow: none;' alt="Comparison of the Home Assistant Connect ZWA-2 antenna to other Z-Wave antennas, showing the size difference">

We’re not compensating for anything; a big antenna does make a big difference. For starters, you need an antenna that's the right size for your wavelength. As Z-Wave is in the sub-GHz, this means the antenna has to be longer than your average Wi-Fi antenna (about 33 cm or a foot is the sweet spot).

You need to optimize not just the antenna, but also the base of the device (also known as the _ground plane_). Our hardware experts really went deep into all the physics involved, and the results speak for themselves. Basically, by choosing the right ratio of antenna to base, the two work in harmony to maximize the range and reliability of the signal.

While some Z-Wave adapters may claim they can hit the maximum transmit levels with their postage-stamp-sized antennas, that can sometimes come with a lot of interference. We’ve engineered away that problem. Connect ZWA-2 can speak loudly and clearly 🗣️, and what’s even more important, it's a great listener 👂.

### Positioning is everything

Having a big optimized antenna is great, but placement is almost as important. Its sturdy base and good-sized USB cable allow it to be placed in the right spot. No more will you have a dangling dongle hidden behind a server cabinet. We even put in an accelerometer to ensure people position the antenna upright, this ensures devices are in the sweet spot of the antenna. If you place it on its side, it will subtly blink the status light at the top.

### All the Z-Wave

Inside Connect ZWA-2, we include the latest Z-Wave 800 chip, which supports all Z-Wave devices. We’re also Z-Wave certified, giving you that extra peace of mind. This, combined with Home Assistant’s industry-leading Z-Wave software, means Z-Wave has never been this good. On your certified smart devices, you might see Security 2 (S2), SmartStart, Z-Wave Plus, or Z-Wave Plus V2 — don’t worry, we support it all. One new feature we support that is getting people very excited is Z-Wave Long Range👇.

### Go long

<img src='/images/blog/2025-08-home-assistant-connect-zwa-2/supports-all-devices.webp' style='border: 0;box-shadow: none;' alt="Isometric view of the Home Assistant Connect ZWA-2 revealing the internal PCB featuring the Z-Wave 800 chipset">

Combining Z-Wave's natural abilities with an optimized antenna has given us some impressive range, but we took it a few steps further. We added Z-Wave Long Range to Connect ZWA-2, which might be one of the most substantial updates to Z-Wave yet.

<div class="alert">
    <p><strong>Z-Wave Long Range</strong><br> Long Range doesn’t use mesh, where devices relay messages through each other to reach the hub. Instead, each device talks straight to your hub, which brings some benefits. It runs on the same frequency as regular Z-Wave but at a higher power, and uses new technology that lets it reach farther, handle more devices, respond faster, and save battery. Right now, it is only available in North America and Europe, and the selection of compatible devices is still growing. This is just scratching the surface; for more on this impressive tech, read a <a href="https://z-wavealliance.org/what-is-z-wave-long-range-how-does-it-differ-from-z-wave/" target="_blank">full breakdown</a> from our friends at the Z-Wave Alliance.</p>
</div>

Z-Wave Long Range is different enough that it needs its own separate network. Connect ZWA-2 can run both Z-Wave and Z-Wave Long Range **at the same time**. When you add a Long Range capable device to Home Assistant, the setup wizard lets you choose which network to use. This way, you get the best of both worlds: a strong mesh network for your older devices, and the reach of Long Range for the newest devices that include support.

### How long?

<p class="img">
<img src='/images/blog/2025-08-home-assistant-connect-zwa-2/zwa-2-prototype-testing.webp' style='border: 0;box-shadow: none;' alt="Dominic with our stick prototype alongside DrZWave with the controller reference design. Uwe is on the other bridge, 0.7 miles away">
See that bridge in the background? Our prototype connected to a device all the way over there.
</p>

People are getting some impressive results with ZWA-2:

- You might have seen our range testing [in a previous blog](/blog/2024/05/08/zwave-is-not-dead/#range-testing-our-z-wave-stick-prototype). Since then, we’ve optimized the design and achieved a line-of-sight range of 1.5 kilometers (0.9 miles) 🤯. This was under less than ideal circumstances (raining and within a car), and we think we could go even further.

- The certifying engineer said it was “the best range she had ever seen”.

- Another test had it communicating via Z-Wave Long Range through several floors of concrete.

- Testers with outdoor lights and internal brick walls have commented on how this is the first time they’ve had reliable connections with devices.

- Interesting Long Range use cases have included smart mailboxes that notify you when _you’ve got mail_, or contact sensors on garden gates.

Every home and setup is different, so we can’t definitively say how far your devices will span. What we can say is that nothing else we’ve tested comes close to what Connect ZWA-2 can do.

### Built for Home Assistant

<img src='/images/blog/2025-08-home-assistant-connect-zwa-2/plug-and-play.webp' style='border: 0;box-shadow: none;' alt="Home Assistant Connect ZWA-2 connected to a Home Assistant Green">

Whenever we build new hardware, we step up our software development to match. You may have noticed a lot of love going into Z-Wave for Home Assistant. All Z-Wave users benefit from this, and when people buy Connect ZWA-2, they’re helping fund this development.

Connect ZWA-2 is built for Home Assistant, and because of this, it’s super easy to get started with. We’ve built Connect ZWA-2 to support every region, no matter where you buy it from. When you plug in Connect ZWA-2, it automatically detects and sets your region using the location configured in your Home Assistant system.

We’ve built handy wizards to help you set up your first Z-Wave network and to guide you in setting up new devices. A wizard also helps you quickly migrate from most Z-Wave adapters to Connect ZWA-2 in a couple of clicks. We also have the ability to update the firmware of Connect ZWA-2 right from Home Assistant, and update the firmware over-the-air (OTA) of Z-Wave devices in a single click.

### ESP inside

<p class="img">
<img src='/images/blog/2025-08-home-assistant-connect-zwa-2/zwa-2-pcb.webp' style='border: 0;box-shadow: none;' alt="Front and back of the PCB outside the shell of the Home Assistant Connect ZWA-2">
I’ll save you the time opening it up; here is the front and back of the PCB.
</p>

As always, we’ve made Connect ZWA-2 easy to open. Just pop out the rubber feet and remove the four Phillips screws, with no glue or clips to get in the way. If you do open it up, you’ll see a familiar sight, an ESP32-S3. We’re using it as a USB controller, and it's not running ESPHome. Yes, it does have a “Wi-Fi antenna”, but we’re not using it. We’ve provided a lot of easily accessible pins/pads, open source firmware files, unlocked bootloader, and good documentation, so feel free to tinker. We’ll also provide all the files to allow you to 3D-print the outer casing.

### Blending into the home

<img src='/images/blog/2025-08-home-assistant-connect-zwa-2/in-the-home.webp' alt="Home Assistant Connect ZWA-2 sitting on a shelf next to a plant and some books">

It's no small feat to make something 33 cm (1 ft) long look so subtle in the home. We’ve modeled its design after a candle and even used the top of the antenna as a status indicator. Its quality injection-molded exterior has a premium feel and shares many design cues from our sleek-looking Voice Preview Edition.

## Join the smart home range revolution

Last year, we proclaimed in a blog that “[Z-Wave is not dead](/blog/2024/05/08/zwave-is-not-dead/)”, and this hardware is a testament to that belief. Even with new technologies being released every week, there’s still room to innovate with something tried and tested. We will always support technology that respects your privacy, allows you to control your devices without the cloud, all while keeping the things you already have in your home running for years to come.

After 1600 words on a Z-Wave adapter, we’re obviously very proud of what we’ve built and excited to see what amazing things people will do with this labor of love. So, whether you’re a Z-Wave veteran or just interested in cool new technology, take a look at [Home Assistant Connect ZWA-2](/connect/zwa-2/) today.
