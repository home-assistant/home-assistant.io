---
layout: post
title: "Heiman joins Works with Home Assistant"
description: "Heiman brings affordable, locally controlled safety devices to Works with Home Assistant, including the first Matter carbon monoxide alarms."
date: 2026-02-24 00:00:01
date_formatted: "February 24, 2026"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2026-02-heiman/art.webp
---

<img src="/images/blog/2026-02-heiman/art.webp" style="border: 0;box-shadow: none;" alt="Heiman joins Works with Home Assistant">

After an amazing 2025 that saw [12 new Works with Home Assistant partners](/blog/2025/12/09/wwha-2025-recap/) join the program, it's now time to say "Hei" to the first partner joining us this year: <a href="https://www.heimantech.com" target="_blank" rel="noopener">Heiman</a>.

Founded back in 2005, Heiman specialize in smart home security devices, and are bringing an impressive selection of safety-focused sensors and alarms to the program: including the first Matter carbon monoxide alarms to be certified, along with smoke alarms designed for international markets.<!--more-->

## Keep it local, keep it safe

If you're new to the Works with Home Assistant program, it's designed to help you identify devices that work brilliantly with Home Assistant, *and* support the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation's principles</a> of privacy, choice, and sustainability.

These values all pivot around local control, something that's essential when it comes to home safety. Your smoke and CO alarms need to work when you need them most, regardless of your internet connection or cloud service status (though if you want to check in on your devices while away from home, [Home Assistant Cloud](/cloud/) provides secure remote access, and your subscription helps fund this very program, among other things!).

Our in-house team has thoroughly tested Heiman's devices to ensure they meet this key requirement, and we're happy to report they did! But Heiman has gone further still by using the [Matter open connectivity standard](/integrations/matter/)...

## Why this matters

Matter was launched to be a unifying connectivity type with interoperability at its heart. Instead of being locked into one company's ecosystem, Matter devices work across Home Assistant, as well as other platforms like Google Home.

Heiman's Matter devices work over [Thread](/integrations/thread/), which adds another layer of benefits. Thread is a low-power wireless mesh network protocol, meaning each device can act as a "relay point", extending network reach throughout your home. This is ideal for battery-powered sensors like Heiman's that need to be energy efficient while maintaining reliable communication.

So why does all this matter for safety devices specifically? Well firstly, it's important to know these smart devices will still work as "dumb" ones, so there's always a failsafe if you decide to rebuild your Thread network, or start making tweaks. If your sensors integrate locally, it means you can automate basic checks, such as reminders to test an alarm once a month, or notifications of hardware faults. If you want to go even further, your smoke alarm could trigger emergency lighting, your CO detector could shut off your gas fireplace, or your leak sensor could close water valves, all without sending your private data through a third-party server. And this is just the sort of complete, interoperable ecosystem Heiman aims to provide.

<div class="alert">
<p>"Our core goal has always been to enable every family to enjoy a safe and intelligent living experience. Home Assistant, as a world-leading open source smart home platform, has an open and inclusive ecological philosophy and strong compatibility with multi-brand and multi-protocol devices, which are highly consistent with the direction of our product research and development. We deeply understand that only by integrating into an open ecosystem can we break down device barriers and provide users with a truly seamless whole-house smart solution."</p>
<em style="text-align: right; display: block;">- Leo Xie, Software Engineer Manager at Heiman</em>
</div>

## Working with the community

Heiman is showing they're true to these ambitions. Beyond getting certified, they're planning to take an active role in the Home Assistant community by participating in discussions, listening to real-world feedback, and continuously optimizing their products based on what users actually need. They're also sharing their technical expertise in smart home security, collaborating with developers to explore innovative safety scenarios that benefit everyone.

## Devices

Heiman's commitment to openness and community is also reflected in the devices we've certified, which also meet strict safety regulations across the US, Europe, Asia and beyond. Before Heiman joined, we had one Zigbee smoke alarm in the program. Now there are Matter options for multiple regions, plus the first certified carbon monoxide alarms: more choice, more coverage.

What devices have been certified?

* <a href="https://www.heimantech.com/product/?type=detail&id=127" target="_blank" rel="noopener">Heiman Smart Smoke Alarm (USA)</a>
* <a href="https://www.heimantech.com/product/?type=detail&id=3" target="_blank" rel="noopener">Heiman Smart Smoke Alarm (EU and China)</a>
* <a href="https://www.heimantech.com/product/?type=detail&id=122" target="_blank" rel="noopener">Heiman Smart Carbon Monoxide Alarm (USA)</a>
* <a href="https://www.heimantech.com/product/?type=detail&id=137" target="_blank" rel="noopener">Heiman Smart Carbon Monoxide Alarm (EU and China)</a>
* <a href="https://www.heimantech.com/product/smart-human-infrared-detector-m1-series" target="_blank" rel="noopener">Heiman Motion Sensor</a>
* <a href="https://www.heimantech.com/product/smart-water-leakage-detector-l1-series" target="_blank" rel="noopener">Heiman Water Leak Sensor</a>
* <a href="https://www.heimantech.com/product/smart-temperature-and-humidity-detector-h1-series" target="_blank" rel="noopener">Heiman Humidity and Temperature Sensor</a>

Also worth noting: Heiman's global presence allows them to deliver quality devices at prices that won't break the bank. Safety sensors and alarms shouldn't be a luxury, and Heiman's approach means they don't have to be.

## No more guessing games!

Accessible pricing is just one way Heiman expands choice for users. We've found they also deliver on the other core principles behind the Works with Home Assistant program: local control protects privacy, and open standards ensure sustainability. And that's the whole point of our certification process: to make it easier for you to spot manufacturers who genuinely commit to these values, taking the guesswork out of building your open home. For full details of all Works with Home Assistant partners, check out our <a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener">certified device list</a>.

Welcome to the program, Heiman, we're excited to see what the community builds with these devices!

## Frequently asked questions

**If I have a device that is not listed under Works with Home Assistant, does this mean it's not supported?**

No! It just means that it hasn't gone through a testing schedule with our team, or doesn't fit the requirements of the program. It might function perfectly well but be added to the testing schedule in the future.

**OK, so what's the point of the Works with program?**

It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that brands must continue to support the devices in the program.

**How were these devices tested?**

All devices in this list were tested using a standard Home Assistant Green Hub with the Home Assistant Connect ZBT-2 as the Thread Border Router and with our <a href="https://works-with.home-assistant.io/" target="_blank" rel="noopener">certified Matter integration</a>.

**Will you be adding more Heiman devices to the program?**

Why not! We're thrilled to foster a close relationship with the team at Heiman to work together on any upcoming releases or add in further products that are not yet listed here. We are also chatting with them about some exciting future plans.
