---
layout: post
title: "The Matter upgrade you've been waiting for"
description: "Matter support in Home Assistant just got faster, more stable, and more capable than ever 🎉. See what's changed and why it's a big deal for your smart home."
date: 2026-06-23 00:00:00
date_formatted: "June 23, 2026"
author: Ingo Fischer
categories:
  - Announcements
og_image: /images/blog/2026-06-the-matter-upgrade-youve-been-waiting-for/art.webp
---

<img src="/images/blog/2026-06-the-matter-upgrade-youve-been-waiting-for/art.webp" alt="The Matter upgrade you've been waiting for" style="border: 0;box-shadow: none;">

It started as a passion project. Yet in a few years <a href="https://github.com/matter-js/matter.js" target="_blank" rel="noopener">matter.js</a> has grown beyond my wildest expectations, becoming the backbone of the open source Matter ecosystem, and powering everything from HomeBridge to openHAB, and even some commercial products.

Ten months ago, I joined forces with the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation</a> to work full time as Lead Developer of Matter. Shortly after, I donated matter.js to the foundation – giving it a new home where it would be safeguarded for the future. Together we <a href="https://newsletter.openhomefoundation.org/giving-matter-js-a-new-home/" target="_blank" rel="noopener">announced our plans</a> to take Matter support in Home Assistant in a completely new direction: we set out to rebuild the [Open Home Foundation Matter Server](/blog/2025/03/10/matter-certification/) – the engine that powers Matter in Home Assistant – on matter.js.

After four months of beta testing, with our community fixing bugs and contributing new features along the way, today we're thrilled to present the newest version of Matter for Home Assistant! 🎉

<!--more-->

The Open Home Foundation invests in important technology to make open alternatives possible, and our work is funded in part by everyone who subscribes to [Home Assistant Cloud](/cloud/) and buys official hardware from our commercial partners. The launch of a new Matter experience in Home Assistant shows what's possible with your support. 💪

<p class='img'><img src='/images/blog/2026-06-the-matter-upgrade-youve-been-waiting-for/image1.webp' alt="Ingo Fischer presenting at CSA events">
Presenting the matter.js plans at the Connectivity Standards Alliance (CSA) Member Meeting in November 2025 (right), and returning in March 2026 as an Outstanding Contributor Award recipient (left).
</p>

## Serving up more with matter.js

For those new to <a href="https://github.com/matter-js/matter.js" target="_blank" rel="noopener">matter.js</a>, it's an open source TypeScript implementation of the Matter standard. I built it to give developers and power users more speed and flexibility, and to make Matter better suited for open source development across the millions of homes that use Home Assistant. By running Matter in Home Assistant on <a href="https://matter.js" target="_blank" rel="noopener">matter.js</a>, all of those benefits now flow directly into the platform.

This major update brings greater stability for Matter in Home Assistant, fewer bugs, and faster start-up and recovery. It also comes with a brand new visualization feature to help you understand your network (more on that below 👀). And by upgrading to the <a href="https://csa-iot.org/newsroom/matter-1-5-1-enhancing-camera-performance-and-expanding-device-flexibility/" target="_blank" rel="noopener">Matter 1.5.1 specification</a> (<a href="https://github.com/matter-js/matter.js/pull/3941" target="_blank" rel="noopener">1.6 coming soon!</a>), we're better equipped to improve support for all new Matter device types, such as cameras, doorbells, and closures.

Coupled with an updated [OpenThread Border Router (OTBR)](/integrations/otbr/) app to support Thread 1.4 in Home Assistant, these changes mark important steps in making Matter work more reliably within your setup, now and into the future. But don't just take our word for it – here's what our beta testers are saying:

<div class="alert">
<p>"The new Matter Server has evolved into the ultimate Matter controller and troubleshooting tool for power users, backed by an incredible open community that continues to push the standard forward."</p>
<em style="text-align: right; display: block;">- Ward Zhou, Smart Home Journalist</em>
</div>

<div class="alert">
<p>"The new matter.js server is fantastic. I love all the new possibilities it offers. In particular, the new Thread mesh view is unique and helps keep the Thread network under control at all times. The icing on the cake is that Home Assistant now supports Matter 1.5.1. This means Home Assistant's Matter implementation is once again at the forefront of the industry."</p>
<em style="text-align: right; display: block;">- hoppel118, Home Assistant Discord Member</em>
</div>

<div class="alert">
<p>"Joining the beta program was born as a last resort to get my Matter/Thread network going. But it was a great experience! While I'm not at all a power user nor programmer, I could contribute at some degree. The very short feedback loop and close involvement of the developer made this a nice (and easy!) way to contribute to the development of the Open Home."</p>
<em style="text-align: right; display: block;">- Haapster, Home Assistant Discord Member</em>
</div>

## It was just a matter of time

When Matter emerged a few years ago, we immediately saw its potential to shape the industry for the better. As an open standard that lets smart devices from different brands speak the same language, it represents the kind of interoperable tech the Open Home Foundation exists to champion. So we set out to build on it.

Just weeks after Matter's official launch in 2022, we added the [Matter integration](/integrations/matter/) to Home Assistant, and in 2025 both <a href="https://csa-iot.org/csa_product/home-assistant/" target="_blank" rel="noopener">Home Assistant</a> and the [Open Home Foundation Matter Server](/blog/2025/03/10/matter-certification/) were officially certified by the Connectivity Standards Alliance. That server was built with Python and the <a href="https://github.com/project-chip/connectedhomeip" target="_blank" rel="noopener">official C++ Matter SDK</a> – a solid starting point, but one that couldn't keep pace with our open source ambitions.

Matter now runs in <a href="https://analytics.home-assistant.io/integrations/" target="_blank" rel="noopener">38% of Home Assistant instances</a>, and ranks twelfth among all integrations – a clear sign of where the smart home world is heading. We want that future to have fewer compatibility headaches, more device choice, and a smart home that just works. This update to Matter support in Home Assistant takes a huge step toward that vision.

## An easy switch

The new Matter experience in Home Assistant is delivered through the "Matter Server app 9.0" – a fully compatible drop-in replacement for the previous Python-based server. After you've updated the app, it will automatically migrate your data on the first start, and work in exactly the same way that the previous server did.

## Faster, smarter, and more secure

The real benefits kick in with every subsequent server start and device reconnection. Thanks to a range of optimizations, devices now come back online much faster, networks are more responsive, and over-the-air updates are more reliable.

Beyond performance, the new server also tightens security. When commissioning new devices, uncertified devices with an official development/test certificate can no longer be added out of the box, ensuring no malicious devices are added to your Matter network without your knowledge. Additionally, the new server checks certificate revocation data during commissioning, adding another layer of protection.

## A clearer view

While the Matter Server's web UI received a range of new and improved features, the ability to visualize your Thread or Wi-Fi networks steals the show.

<p class='img'><img src='/images/blog/2026-06-the-matter-upgrade-youve-been-waiting-for/image2.webp' alt="Network visualization in the Matter Server web UI">
Your whole network, at a glance.
</p>

The visualization feature draws details from your commissioned Matter devices to map the network and offer insights into connection quality. Each device appears as a node, with small icons indicating its role in the network – whether it's a leader (crown), a router (arrows), a sleepy, or another end device. The color of the connections between nodes reflects connection quality: green is strong, orange medium, red weak, and gray no signal (for those that want a deeper dive, check out our <a href="https://github.com/matter-js/matterjs-server/blob/main/packages/dashboard/README.md#network-visualization" target="_blank" rel="noopener">GitHub documentation</a>).

This is especially helpful for Thread networks, where there can be multiple "hops" between a device and the border router, and the devices themselves decide how data is routed. Where possible, border routers are also discovered and displayed, giving you a fuller picture of how your network is structured. The visualization also helps with Wi-Fi devices, making it easier to see which device is connected to which access point, and at what signal quality.

## A foundation for what's next

Graduating Home Assistant to matter.js wouldn't have been possible without our community, who've helped grow Home Assistant into one of the biggest smart home platforms in the world.

With these new changes, we're better placed than ever to make Matter in Home Assistant more approachable for all. Head to the <a href="https://github.com/orgs/OpenHomeFoundation/projects/8/views/9?filterQuery=main-project%3A%22Open+Protocols+%28Matter%2C+Z-Wave%2C+Zigbee%2C+etc%29%22" target="_blank" rel="noopener">Open Home Foundation roadmap</a> to add your voice to what comes next. We can't wait to keep building together ⚒️.
