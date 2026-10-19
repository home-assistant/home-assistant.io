---
layout: post
title: "ubisys joins Works with Home Assistant"
description: "Explore certified Zigbee hardware from ubisys, our newest Works with Home Assistant partner. Sustainable retrofit solutions for switches, energy, and heating."
date: 2026-04-23 00:00:01
date_formatted: "April 23, 2026"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2026-04-ubisys/art.webp
---

<img src="/images/blog/2026-04-ubisys/art.webp" alt="ubisys joins Works with Home Assistant" style="border: 0;box-shadow: none;">

We're thrilled to welcome <a href="https://www.ubisys.de/en/main-page/" target="_blank" rel="noopener">ubisys</a> to Works with Home Assistant! This German company has been dedicated to smart home automation for more than 20 years, and offers a range of Zigbee devices designed to help you retrofit your home. If retrofitting is conjuring up images of avocado bathrooms 🥑 and artexed ceilings, fear not -- it just means upgrading what you already have, rather than ripping it out and starting again. Better for your home, and the planet 🌍.<!--more-->

## Here today, here tomorrow

Founded in Düsseldorf in 2005, ubisys build devices that last. They back their hardware with a five-year warranty and software updates for the long term, meaning the device you buy today won't end up obsolete in a few years' time -- in fact, they're still shipping feature updates for hardware designed in 2010! That kind of longevity aligns closely with the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation's own sustainability principle</a>, and is just one reason why they're such a great (retro)fit for the program! Zigbee is another...

## Zigbee to the bone

If you're scratching your head at the mention of Zigbee, allow me to explain: it's a wireless standard that lets smart home devices communicate with each other, regardless of who made them. Unlike WiFi, it's a mesh network, meaning Zigbee devices "talk" to each other, as well as to a central hub (like your Home Assistant setup), strengthening the connection across your whole home. It runs entirely locally, with no cloud dependency, and is optimized for long battery life.

For retrofit devices that need to just get on with their jobs in the background, these qualities really count, and explains why ubisys refer to Zigbee as the backbone of everything they build. And they don't just use the standard, they help shape it: ubisys are active members of the <a href="https://csa-iot.org/" target="_blank" rel="noopener">Connectivity Standards Alliance</a> (the organization responsible for maintaining and developing Zigbee), sitting on working groups and committees at the highest level -- helping improve the standard for the benefit of the whole community. This commitment to open standards runs through everything ubisys do:

<div class="alert">
<p>"We are convinced the future of smart homes lies in openness and robust interoperability. This partnership is a testament to that shared vision, and represents a significant step in deepening our integration with Home Assistant -- helping empower the most vibrant, tight-knit community in the smart home space. This community is the true engine of innovation. By achieving this certification, we're ensuring our devices integrate more seamlessly than ever into Home Assistant's robust ecosystem, providing the reliability and performance this community expects and deserves. We look forward to supporting the brilliant, custom solutions they will build."</p>
<em style="text-align: right; display: block;">- Dr.-Ing Arasch Honarbacht, Founder & Engineering Lead</em>
</div>

## Devices

Every device in the Works with Home Assistant program is put through its paces by our in-house team before it earns certification, so when you see the badge, you know it works. But that's not all: every partner must also commit to providing long-term support and firmware updates, and engaging with our community -- all things we're confident ubisys will deliver, for the reasons outlined above! 👆

These are the first Works with Home Assistant-certified Zigbee devices designed to fit behind your existing wall fixtures. Together they cover switch and scene control, energy monitoring, and heating:

{% include integrations/device_list.html brand="ubisys" %}

It's important to note that the actuators and control unit involve mains electricity, so _must_ be installed by a qualified electrician: check <a href="https://www.ubisys.de/en/support/manuals-catalogs/" target="_blank" rel="noopener">the ubisys website</a> for guidance. The H1 is more straightforward, since it simply clips onto your existing radiator valve and runs on AA batteries.

## Ready to retrofit?

To use these devices with Home Assistant, you need a [Zigbee adapter](/connect/zbt-2) (a USB dongle that allows everything to communicate), and to enable Home Assistant's built-in [Zigbee Home Automation (ZHA)](/integrations/zha/) integration, which takes care of the rest. ZHA is supported by the Open Home Foundation, with full-time developers dedicated to working on it and helping certify new Works with Home Assistant Zigbee devices.

If you'd like to support this work, a <a href="https://www.nabucasa.com/" target="_blank" rel="noopener">Home Assistant Cloud subscription</a> helps fund ZHA and the wider Open Home Foundation mission -- all while giving you secure, remote access to your smart home.

We hope ubisys's inclusion in the program means more Home Assistant users can upgrade their smart homes without starting from scratch -- and with our <a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener">certified device list</a> growing all the time, there's never been more ways to build the way you want. We look forward to seeing what you get up to! 👀

## Frequently asked questions

**If I have a device that is not listed under Works with Home Assistant, does this mean it's not supported?**

No! It just means that it hasn't gone through a testing schedule with our team or doesn't fit the requirements of the program. It might function perfectly well, but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don't currently test under the program.

**OK, so what's the point of the Works with program?**

It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have the functionality you would expect within Home Assistant, operate locally without the need for cloud, and that they will continue to do so long-term.

**How were these devices tested?**

All devices in this list were tested using a standard [Home Assistant Green](/green/) as a hub with the [Home Assistant Connect ZBT-2](/connect/zbt-2/), and with ZHA, our [Zigbee integration](/integrations/zha/). If you have another hub/adapter set-up/integration that's not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

**Will you be adding more ubisys devices to the program?**

Why not! We're thrilled to foster a close relationship with the team at ubisys to work together on any upcoming releases or add in further products that are not yet listed here.

**Where can I see what other devices have been certified?**

You can find every Works with Home Assistant device on our <a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener">certified device list</a>. All products included have been rigorously tested by our team, and are built with privacy and local control at their core by partners committed to long-term support. We also flag which regions they are available in, and any known limitations on the list so you can make a fully informed decision before you buy.
