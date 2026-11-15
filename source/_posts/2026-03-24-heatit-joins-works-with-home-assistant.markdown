---
layout: post
title: "Heatit joins Works with Home Assistant"
description: "Explore their Z-Wave heating and safety solutions designed to keep your home warm and locally controlled."
date: 2026-03-24 00:00:01
date_formatted: "March 24, 2026"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2026-03-heatit/art.webp
---

<img src="/images/blog/2026-03-heatit/art.webp" style="border: 0;box-shadow: none;" alt="Heatit joins Works with Home Assistant">

We're thrilled to extend a very warm (ahem) Works with Home Assistant welcome to <a href="https://heatit.com/" target="_blank" rel="noopener">Heatit</a>! As the name suggests, Heatit are all about keeping you, and your home, warm. They specialize in smart climate and heating control, which might have something to do with the fact they're based in Norway, where energy management is a big reason people turn to [Home Assistant](/), as winter temperatures can dip to below -20°C!<!--more-->

## Home is where the heat is

Formerly known as Thermofloor, Heatit has spent more than 30 years building a rock-solid reputation across Scandinavia and Northern Europe for thermostats and controllers designed to handle harsh conditions, so they're certainly robust enough for milder climes. But they don't just stop at heating: the range extends to home safety, with the Heatit Z-Smoke 2 being the first Z-Wave smoke detector we've certified.

In fact, all of Heatit's certified devices connect via Z-Wave, which is what makes them integrate so well with Home Assistant. Crucially, the Z-Smoke 2 will always function regardless of network status. The smart features are there when you need them, but the fundamentals never depend on them.

## Z-Wave, and then some

If you've not heard of Z-Wave before, here's a quick explainer: it's a low-power wireless protocol built specifically for smart homes. Unlike WiFi, it operates on a dedicated frequency that means less interference and more reliable communication. It's also a mesh network, where mains-powered devices help pass signals along to each other, strengthening the connection. Battery-powered devices can also benefit from this, since the mesh helps preserve their charge.

For heating and safety devices, those enhancements really count. Long battery life means a thermostat or smoke detector that should keep working without constant attention. Reliable range means your devices can stay connected even through thick walls or across a large home. And because everything runs locally, your heating responds quickly: no routing through a third-party server, no unnecessary delays.

## Connecting with the community

Heatit are also serious about the impact they have beyond their products, with sustainability and reducing environmental impact being central to their company philosophy, which aligns with the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation's principles</a> of privacy, choice, and sustainability. What's more, for Heatit, one of the most exciting things about joining the program is the chance to connect with the passionate, knowledgeable people who make up our community (yes, that's you!).

<div class="alert">
<p>"We're excited to join the Home Assistant program because of the strong community and the shared focus on open, local-first smart home solutions. This integration allows us to work more closely with both enthusiasts and professionals, and to deliver products that are flexible, reliable, and built for long-term use."</p>
<em style="text-align: right; display: block;">- Pål Aksel Forberg, CEO at Heatit</em>
</div>

## Devices

Works with Home Assistant isn't just a badge: every certified product is rigorously tested by our in-house team to make sure it works seamlessly with Home Assistant out of the box. Brands joining the program also commit to long-term support and firmware updates, and to being an active, positive part of our community. Here's what's made the cut from Heatit:

{% include integrations/device_list.html brand="heatit" %}

Professionally built and designed to last, these devices cover both sides of a smart heating setup: the thermostats handle the actual temperature control, while the wall controller gives you a physical way to manage it all without reaching for your phone.

## How to get started

It's worth noting that in-wall devices will require installation by a qualified electrician in many regions, so if you're not confident with electrics, it's worth checking Heatit's website for guidance and to find a local installer. The standalone devices are more straightforward to set up, and include SmartStart, making adding them to your Z-Wave network as simple as scanning a QR code.

To use Z-Wave with Home Assistant, you'll need a [Z-Wave adapter](/docs/z-wave/controllers/) and the [Z-Wave integration](/integrations/zwave_js/). This will help everything run locally, keeping your data private and your smart home responsive. Of course, if you want to turn the heat up before you get home, or check on things while you're away, [Home Assistant Cloud](/cloud/) gives you secure remote access, and by subscribing you'll help fund the Open Home Foundation's work, including the Works with Home Assistant program!

## Wrapping up warmly

We hope this is just the beginning of Heatit's involvement with the program, and we're excited to see where things go, both with these devices and whatever comes next. In the meantime, there's plenty here to get started with. Time to turn up the heat.

## Frequently asked questions

**If I have a device that is not listed under Works with Home Assistant, does this mean it's not supported?**

No! It just means that it hasn't gone through a testing schedule with our team, or doesn't fit the requirements of the program. It might function perfectly well but be added to the testing schedule in the future, or it might work under a different connectivity type that we don't currently test under the program.

**OK, so what's the point of the Works with program?**

It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have full functionality within Home Assistant, operate locally without the need for cloud, and will continue to do so long-term.

**How were these devices tested?**

All devices in this list were tested using a standard <a href="https://www.home-assistant.io/green/" target="_blank" rel="noopener">Home Assistant Green</a> with the Home Assistant Connect ZWA-2 as the Z-Wave adapter and with our [Z-Wave integration](/integrations/zwave_js/). If you have another hub or setup, that's not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

**Will you be adding more Heatit devices to the program?**

Why not! We're thrilled to foster a close relationship with the team at Heatit to work together on any upcoming releases or add in further products that are not yet listed here. They have also been working on integrating their WiFi products further in Home Assistant, so we're excited to see their progress.
