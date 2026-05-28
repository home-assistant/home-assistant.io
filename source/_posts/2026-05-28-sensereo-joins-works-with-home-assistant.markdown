---
layout: post
title: "Sensereo joins Works with Home Assistant"
description: "Home Assistant just got safer. Sensereo brings smoke and carbon monoxide alarms that are locally controlled, cloud-free, and built to never fall silent."
date: 2026-05-28 00:00:01
date_formatted: "May 28, 2026"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2026-05-sensereo/art.webp
---

<img src="/images/blog/2026-05-sensereo/art.webp" alt="Sensereo joins Works with Home Assistant" style="border: 0;box-shadow: none;">

We're sensing a *change in the air* this month as we welcome <a href="https://sensereo.com/" target="_blank" rel="noopener">Sensereo</a> to the Works with Home Assistant program 🎉. Specialists in environmental sensing, Sensereo brings Matter smoke and carbon monoxide (CO) alarms into the Home Assistant ecosystem – meaning more ways to keep your home open, safe, and sound.<!--more-->

## Built from a burning question…

What happens if your smoke alarm goes off, but you're not there to hear it? It's an unsettling question, and one that led Roy Chen to found Sensereo in 2024. Driven to create safety devices that were equal parts reliable and resilient, Sensereo built the [Matter](/integrations/matter/)-based <a href="https://sensereo.com/product/ms-1/" target="_blank" rel="noopener">MS-1 Smoke Alarm</a> and <a href="https://sensereo.com/msc-1/" target="_blank" rel="noopener">MSC-1 Smoke and Carbon Monoxide Alarm</a>, because as they put it: "every home deserves a system that will not fall silent when it matters most."

## It's just good *sense*

For anyone unfamiliar, Matter is an open standard that lets smart home devices from different brands work together, regardless of who made them – no lock-in, no closed ecosystems. It's exactly the kind of open, interoperable technology the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation</a> exists to champion. Thread operates on the same principle: it's an energy-efficient, wireless mesh network that connects devices directly to one another and can automatically reroute around disruptions. And for battery-powered alarms like Sensereo's, Thread's low-power design means fewer battery changes for devices that are always on duty.

While we're talking about safety, it's important to note that if your Thread network did for any reason drop out, Sensereo's smoke and CO alarms will keep working as a "regular" alarm would – no smart home required.

That peace of mind is central to how Sensereo thinks about their products, and having caught up with the team at CES 2026 earlier this year, we can tell you it's just the beginning. Air quality sensors and more are on the horizon, all building toward the same vision: to build an environmental intelligence system for the home that helps users understand and respond to their surroundings.

<div class="alert">
<p>"Joining the Home Assistant ecosystem is a natural step for us, as it enables an open and user-driven platform where these capabilities can truly come together. We're excited to contribute not only our current fire safety products, but also future sensing devices that expand how people interact with and manage their living spaces."</p>
<em style="text-align: right; display: block;">- Roy Chen, Sensereo Founder</em>
</div>

## Devices

Most of us want our smoke alarms to be "reasonably annoying", and Sensereo clearly agrees, because they printed this very description on the MS-1's packaging. Which, as we love to see, has been designed sustainably – signaling the company's commitment to one of the Open Home Foundation's three core principles before you've even opened the box.

<p class='img'><img src="/images/blog/2026-05-sensereo/image2.webp" alt="Sensereo MSC-1 smoke and carbon monoxide detector with a digital display, mounted on a wall in a modern living room.">
Sensereo MSC-1 smoke and carbon monoxide detector
</p>

The MSC-1 goes a step further with a nifty, built-in digital display showing real-time carbon monoxide levels. Since CO is odorless and invisible, being able to accurately check levels at a glance lets you know if there is a rise and act *before* it becomes an emergency – not just after an alarm sounds.

And with local integration, that kind of proactive awareness extends further still – allowing you to build around the *people* in your home, not just the devices. A smoke detection event could flash smart bulbs for a family member who's hard of hearing, or send a separate alert to a caregiver. Your alarm does its job – and so does everything else around it. It's this kind of thoughtful design that shows us Sensereo are here for all the right reasons.

{% include integrations/device_list.html brand="sensereo" %}

Like all partners of the Works with Home Assistant program, Sensereo commits to providing long-term support and firmware updates, as well as staying connected to the community they're helping protect 💪. As always, the MS-1 and MSC-1 have been rigorously tested and certified by our in-house team to meet our core requirements of local control, privacy, and long-term sustainability. The program's operated by the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation</a>, which is funded with the support of [Home Assistant Cloud](/cloud/) subscribers. With each new partner like Sensereo that expands the program, we're able to give more choice, support, and peace of mind to Home Assistant users.

## Breathe easy

No smoke and mirrors – just reliable home safety devices and a team that clearly gets what this community is about. Sensereo's commitment to building open, locally controlled tech is exactly what we love to see in the Works with Home Assistant program, and why we're so thrilled to have them on board. Check out our <a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener">certified device list</a> to see what else is there!

## FAQs

Q: If I have a device that is not listed under "Works with Home Assistant" does this mean it's not supported?

A: No! It just means that it hasn't gone through a testing schedule with our team or doesn't fit the requirements of the program. It might function perfectly well but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don't currently test under the program.

Q: OK, so what's the point of the Works with program?

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have the functionality you would expect within Home Assistant, operate locally without the need for cloud and that they will continue to do so long-term.

Q: How were these devices tested?

A: All devices in this list were tested using a standard Home Assistant Green Hub with the Home Assistant Connect ZBT-2 as the Thread Border Router and with our [certified Matter](/integrations/matter/) integration. If you have another hub / border router set-up / integration that's not a problem but we test against these as they are the most effective way for our team to certify within our ecosystem.

Q: Will you be adding more Sensereo devices to the program?

A: Why not! We're thrilled to foster a close relationship with the team at Sensereo to work together on any upcoming releases or add in further products that are not yet listed here.
