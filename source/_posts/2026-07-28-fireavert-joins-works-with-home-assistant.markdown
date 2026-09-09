---
layout: post
title: "FireAvert joins Works with Home Assistant"
description: "Meet FireAvert: the first fire-safety stove and appliance shutoffs to join Works with Home Assistant. Locally controlled, cloud-free, and built to protect."
date: 2026-07-28 00:00:01
date_formatted: "July 28, 2026"
author: Miranda Bishop
comments: true
categories:
  - Works-with-Home-Assistant
og_image: /images/blog/2026-07-fireavert/art.webp
---

<img src="/images/blog/2026-07-fireavert/art.webp" alt="FireAvert joins Works with Home Assistant" style="border: 0;box-shadow: none;">

Sound the alarm, because Works with Home Assistant just welcomed our newest partner to the program: <a href="https://fireavert.com/" target="_blank" rel="noopener">FireAvert</a>! 🎉 Specialists in fire safety, FireAvert are on a mission to keep you and your home out of harm’s way. They bring the very first gas and electric appliance shutoff devices to the program, and with them, a whole lot of peace of mind.<!--more-->

## Where there’s smoke, there’s FireAvert

As ex-firefighter Peter Thorpe knows too well, a moment of forgetfulness is all it takes for a kitchen to end up in flames. And after close to twenty years of service witnessing the same devastating scenario repeat itself, he knew something had to be done. So he founded FireAvert, launching with the Auto Stove Shutoff for electric stovetops.

The device was already gaining momentum before <a href="https://www.youtube.com/watch?v=-g9Xt_IYACU" target="_blank" rel="noopener">FireAvert’s pitch</a> caught the attention of <a href="https://www.sharktankblog.com/business/fireavert/" target="_blank" rel="noopener">Shark Tank</a>, and for good reason. They say there’s no smoke without fire, but years on the job taught Thorpe that in the kitchen, that isn’t always the case. Smoke can build well before a flame takes hold – and that’s the window FireAvert’s shutoff works in. By listening for your standard smoke alarm, the device automatically shuts off your stove when the alarm sounds – cutting the heat at the source before a fire can catch.

<div class="alert">
<p>“Excited to see FireAvert join the Home Assistant community. Smart homes shouldn’t just be convenient – they should help keep families safer too. This is exactly the kind of innovation the ecosystem needs.”</p>
<em style="text-align: right; display: block;">- Chasen Tolbert, FireAvert</em>
</div>

Since their launch, FireAvert’s range has expanded to include gas stove and small appliance shutoffs (think microwaves, air fryers, hot plates), so whatever’s most likely to be left on in your kitchen, there’s a shutoff for it. And with Z-Wave units now among them, it’s easier than ever to bring that protection straight into your Home Assistant setup.

## On the same frequency

The FireAvert shutoffs joining the program run on [Z-Wave](/integrations/zwave_js/). For anyone unfamiliar, here’s a quick rundown: Z-Wave is an open smart home protocol that allows your devices to talk to each other regardless of the brand, without locking you into one ecosystem. It’s also a mesh network, where each device relays signals for the others to extend coverage across your home, reinforcing your connection.

While Z-Wave wasn’t a part of FireAvert’s initial product line, since then we’ve been pleased to see the company prioritize local control by producing shutoff devices with the open standard, and certifying them with the <a href="https://z-wavealliance.org/" target="_blank" rel="noopener">Z-Wave Alliance</a>. We first met the FireAvert team at a San Diego alliance meeting back in 2025, and it was clear from the get-go that we were on the same wavelength: driven to build open, interoperable smart home tech that doesn’t require a cloud to keep your home protected.

<p class='img'><img src="/images/blog/2026-07-fireavert/image2.webp" alt="FireAvert automatic shutoffs for electric and gas stoves">
FireAvert automatic shutoffs for electric and gas stoves
</p>

## Safe as houses

It’s important to note that FireAvert’s shutoffs don’t rely purely on Z-Wave to do their job, and they’ll keep protecting your kitchen even if your network drops out entirely. That kind of safety net is reassuring for anyone, but even more so for those with caring responsibilities or aging relatives to worry about.

Likewise, FireAvert’s shutoffs don’t depend on a battery to function: just plug your stove or small appliance into the shutoff device, and the device into your wall socket – and you’re all set. As long as your appliance has power, the shutoff is on duty. And FireAvert back up that dependability where it counts: all four devices come with a lifetime warranty, and are independently tested to CSA and UL standards – confirming the hardware meets strict, recognized electrical safety requirements.

## Devices

Just like every device certified by the Works with Home Assistant program, FireAvert’s shutoffs have also been rigorously tested by our in-house team to ensure they are up to code with our core requirements of local control and privacy.

Check out the devices that made the grade:

{% include integrations/device_list.html brand="fireavert" %}

But it’s not just about adding devices to a list – our community is the engine of everything we do, and by joining it FireAvert commits to providing long-term support to make certain their devices continue to work smoothly within your setup.

## Building the brigade

While there are already certified water shutoff devices in the program, stove shutoffs are a first, bringing a brand-new category of safety tech to Home Assistant users. It’s exactly the kind of innovation we love to see: more ways for our community to manage their smart homes, on their own terms.

That expansion is core to what the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation</a> – which operates the Works with Home Assistant program – is about: keeping smart homes local, private, and safe. If you’d like to see more safety-focused partners like FireAvert join the program, consider subscribing to [Home Assistant Cloud](/cloud/) or buying official hardware like the [Home Assistant Connect ZWA-2](/connect/zwa-2/). Every bit of support helps us expand and maintain the program for all ⚒️.

## Geared up and ready to respond

Forged to protect the community, FireAvert are a natural match for ours. We’re thrilled to have them join the ranks, and excited for Home Assistant users to be able to add another line of defense for their smart homes, and the people and pets who live in them. Head to our <a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener">certified device list</a> to discover the full range of devices to safeguard your home.

## FAQs

Q: If I have a device that is not listed under Works with Home Assistant does this mean it’s not supported?

A: No! It just means that it hasn’t gone through a testing schedule with our team or doesn’t fit the requirements of the program. It might function perfectly well but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don’t currently test under the program.

Q: OK, so what’s the point of the Works with program?

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have the functionality you would expect within Home Assistant, operate locally without the need for the cloud, and that they will continue to do so long term.

Q: How were these devices tested?

A: All devices in this list were tested using a standard Home Assistant Green Hub with the Home Assistant Connect ZWA-2 as the Z-Wave adapter and with our Z-Wave integration. If you have another hub/adapter/integration that’s not a problem but we test against these as they are the most effective way for our team to certify within our ecosystem.

Q: Will you be adding more FireAvert devices to the program?

A: Why not! We’re thrilled to foster a close relationship with the team at FireAvert to work together on any upcoming releases or add in further products that are not yet listed here.
