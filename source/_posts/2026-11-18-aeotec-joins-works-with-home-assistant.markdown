---
layout: post
title: "Aeotec joins Works with Home Assistant"
description: "Leaks, smoke, mold risk, and open doors: Aeotec’s 10 newly certified devices join the program to keep watch locally, with Z-Wave Long Range reaching up to 1 km 😮"
date: 2026-11-18 00:00:01
date_formatted: "November 18, 2026"
author: Jacqueline Ajayi
comments: true
categories:
  - Works-with-Home-Assistant
og_image: /images/blog/2026-11-aeotec/art.webp
---

<img src="/images/blog/2026-11-aeotec/art.webp" alt="Aeotec joins Works with Home Assistant" style="border: 0;box-shadow: none;">

Get ready for gear that goes the distance, because this month <a href="https://aeotec.com/" target="_blank" rel="noopener">Aeotec</a> join Works with Home Assistant 🎉 Building Z-Wave and smart home tech since 2006, our newest partners bring 10 certified devices to the program. From sensors and sirens to switches and a smoke detector upgrade – not to mention their new Z-Wave Long Range devices from the 8 series – there’s *plenty* of exciting ground to cover 📡<!--more-->

## Howdy, partner!

Aeotec are no strangers to the Home Assistant community, and for good reason. Founded in Silicon Valley in 2006 as Aeon Labs, they’ve spent two decades building Z-Wave and other smart home hardware. In 2016, Aeon Labs rebranded as Aeotec. Later, Aeotec merged with Z-Wave Europe to create an Internet of Things (IoT) powerhouse with offices and expertise across three continents, allowing it to expand and accelerate its innovation even further.

While you might know them as the official hardware partner behind the Samsung SmartThings hub, Aeotec’s devices travel well beyond any one platform. Instead of locking you into a closed ecosystem, they build across open connectivity standards like Z-Wave, Zigbee, and Matter, so you can choose how best to set up your smart home – something we always love to see in our partners!

Aeotec’s latest devices are all about helping your smart home stretch further with Z-Wave Long Range (more on that in a minute). But plenty of our Home Assistant community members have been running Aeotec devices through the [Z-Wave integration](/integrations/zwave_js/) for years, so this certification is less of an introduction and more of a long-overdue handshake. We’re thrilled to make it official 🎉

<div class="alert">
<p>“At Aeotec, we have always built our products together with the community, not just for it. Smart home enthusiasts have shaped our devices from the very beginning, and we feel a deep responsibility to give them a flawless experience. Home Assistant is one of the most important pillars of that community, so being part of the Works with Home Assistant program means a great deal to us. It is our commitment that every Aeotec device works reliably, openly and exactly as our users expect.”</p>
<em style="text-align: right; display: block;">— Denis Paetz, President Europe, Aeotec</em>
</div>

## The Long Ranger

If all this talk about [Z-Wave](/integrations/zwave_js/) is new to you, here’s the lay of the land. Z-Wave is a low-power wireless standard made for the smart home. It has its own lower frequency – away from the crowded band shared by Wi-Fi, Zigbee, and Thread – for less interference and more reliable connections. Standard Z-Wave forms a mesh network, where mains-powered devices relay signals and help battery-powered ones save charge.

Aeotec’s 8 series and SmokeShield take a different route with [Z-Wave Long Range](/integrations/zwave_js/), the standard’s newest addition. Instead of a mesh, it uses a star network: each device talks directly to your adapter (they ride solo, so to speak… 😉). That gives a reach of up to 1 km in line of sight, versus around 300 m for standard Z-Wave, so a <a href="https://aeotec.com/products/water-sensor-8/" target="_blank" rel="noopener">Water Sensor 8</a> in the garage or a <a href="https://aeotec.com/products/door-window-sensor-8/" target="_blank" rel="noopener">Door Window Sensor 8</a> on the garden shed stays connected without repeaters. The direct connection also makes sensors more responsive and easier on their batteries. And there’s plenty of room to grow, with up to 4,000 devices on a single network, compared to 232 on standard Z-Wave.

## The right gear and good company

To use Aeotec’s Z-Wave Long Range devices (currently available in the US and EU), you’ll need a compatible adapter like the [Home Assistant Connect ZWA-2](/connect/zwa-2/). With an older adapter, Aeotec’s devices still work, but just as regular Z-Wave devices in your mesh network, without the extra reach. Either way, it all runs locally in Home Assistant through the [Z-Wave integration](/integrations/zwave_js/), powered by <a href="https://zwave-js.github.io/zwave-js/#/" target="_blank" rel="noopener">Z-Wave JS</a>, an open-source driver the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation</a> supports.

Aeotec also help shape Z-Wave itself as members of the <a href="https://z-wavealliance.org/" target="_blank" rel="noopener">Z-Wave Alliance</a>, and all five of the Z-Wave Long Range devices in this launch are Alliance-certified. In addition, Aeotec work directly with Silicon Labs, the company that makes the Z-Wave chips inside Aeotec’s Long Range gear, which brings us to the devices themselves.

## Devices

From the basement to the ceiling (and all the way to the back gate), Aeotec’s newly certified devices help you track down trouble before it gets out of hand, catching leaks, freezing pipes, smoke, and more. Getting the Z-Wave devices set up securely is a breeze, too: SmartStart, a Z-Wave feature that adds devices to your network with a quick scan of their QR code, handles the pairing. Then S2, Z-Wave’s built-in encryption, keeps everything each device sends private from the moment it joins.

<p class="img">
<img src="/images/blog/2026-11-aeotec/image2.webp" alt="There’s a new sheriff on the windowsill, and a deputy on the shelf: Aeotec’s Door Window Sensor 8 (left) and MultiSensor 8.">
There’s a new sheriff on the windowsill, and a deputy on the shelf: Aeotec’s Door Window Sensor 8 (left) and MultiSensor 8.
</p>

Here’s a roundup of all of Aeotec’s devices joining the program:

{% include integrations/device_list.html brand="aeotec" %}

Ready to roam the rest of the range? Head to our full <a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener">certified device list</a> to see everything the program has on offer.

## Going the extra mile

As with every certified device in the program, our in-house team tested each of Aeotec’s devices to make sure they were up to code with our core requirements of local control and privacy. Aeotec have also committed to providing long-term support and firmware updates, so you can be sure your devices keep going strong for years to come.

And while Z-Wave Long Range takes your sensors further, and <a href="https://www.nabucasa.com/link/" target="_blank" rel="noopener">Home Assistant Link</a> takes them wherever you are – letting you check for a leak or unlocked door while you’re away. Better still, every subscription directly funds the Open Home Foundation, the non-profit that runs Works with Home Assistant, helping us expand the program and bring more partners like Aeotec along for the ride.

## In it for the long run

With devices that reach further and a commitment to keep supporting them, Aeotec bring both range and staying power to the program. Every Aeotec device runs locally on open standards, keeping your smart home private and the choice of what goes in it firmly *yours*. Plenty of you have relied on Aeotec for years, and we can’t wait to see how far you take their latest lineup. Welcome aboard, Aeotec, and here’s to the long haul 🤝

## FAQs

Q: If I have a device that is not listed under Works with Home Assistant does this mean it’s not supported?

A: No! It just means that it hasn’t gone through a testing schedule with our team or doesn’t fit the requirements of the program. It might function perfectly well but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don’t currently test under the program.

Q: OK, so what’s the point of the Works with program?

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have the functionality you would expect within Home Assistant, operate locally without the need for cloud, and that they will continue to do so long-term.

Q: How were these devices tested?

A: The Z-Wave devices in this list were tested with Home Assistant Container running on an Intel NUC (a compact mini PC), using the Home Assistant Connect ZWA-2 as the Z-Wave adapter and the [Z-Wave integration](/integrations/zwave_js/). The Zigbee devices were tested separately, joined to a temporary Zigbee network with a Home Assistant Connect ZBT-2 adapter and the [Zigbee Home Automation](/integrations/zha/) integration. If you have a different hub or adapter set up, that’s not a problem, but we test against these as they’re the most effective way for our team to certify devices within our ecosystem.

Q: Will you be adding more Aeotec devices to the program?

A: Why not! We’re thrilled to foster a close relationship with the team at Aeotec to work together on any upcoming releases or add in further products that are not yet listed here.
