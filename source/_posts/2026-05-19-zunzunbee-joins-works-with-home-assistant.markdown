---
layout: post
title: "zunzunbee joins Works with Home Assistant"
description: "Meet the zunzunbee Slate Switch: a battery-powered Zigbee scene controller that simply snaps over your existing wall switches for tactile local control."
date: 2026-05-19 00:00:01
date_formatted: "May 19, 2026"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2026-05-zunzunbee/art.webp
---

<img src="/images/blog/2026-05-zunzunbee/art.webp" alt="zunzunbee joins Works with Home Assistant" style="border: 0;box-shadow: none;">

We are often asked if we prioritize "Big Tech" firms in the Works with program, but we've always been clear that newer companies are just as important to our certification as household names. Start-ups are innovators, and have their fingers on the pulse of community needs much more than brands that are only at the mercy of their investors.

That's just one reason we're thrilled to welcome <a href="https://zunzunbee.com/" target="_blank" rel="noopener">zunzunbee</a> to the program! They really stood out from the crowd at CES 2026 this January with their new product, the <a href="https://zunzunbee.com/product/slate-switch/" target="_blank" rel="noopener">Slate Switch</a>. This battery-powered smart scene controller simply snaps over existing switches – ideal if you rent your home, or don't fancy working with wiring. We're always on the lookout for devices that make setting up your smart home easier, so we're delighted to have zunzunbee on board!<!--more-->

## A clean slate for switches

While zunzunbee are newcomers to the market, founder Harish Raman has more than 18 years' experience in lighting and connected systems – including senior engineering roles at [Leviton](/blog/2022/07/27/leviton-partner/) and Philips. Harish designed the Slate Switch to cut the complexity sometimes found in smart homes, by bringing back simple, tactile control without any installation headaches. And because it builds on top of your existing switches rather than replacing them, it means less waste and more value from the things you already own.

<div class="alert">
<p>"At zunzunbee, we believe smart home control should feel natural, reliable, and stay under the user's control. The Home Assistant community shares that same philosophy, with a focus on local control, flexibility, and deep customization.</p>
<p>Slate Switch was designed to solve everyday friction in smart homes, and we are excited to bring it to a community that values thoughtful automation and truly understands how homes should work."</p>
<em style="text-align: right; display: block;">- Harish Raman, Founder</em>
</div>

## Not just for newbies

The Slate Switch isn't just a low-barrier entry point for beginners. It also tackles an issue that can crop up in more complex smart home setups: someone flipping a wall switch that controls your smart bulbs so all your carefully configured automations stop working 😩. Slate Switch keeps those bulbs permanently powered, while giving everyone in the household a familiar, physical button right where they expect it. If you prefer, you can also make use of the snap-on snap-off magnetic function to pick up the switch and take it with you. You can use it as a remote, and each of the zones can support both a tap or long-press action, making it a perfect partner to have in a pocket.

A cost-effective device is also a low-risk way to experiment, with plenty of possibilities to explore without a big outlay. And once you're hooked, multipacks of two or four are available so you can roll them out across your home.

## The right buzz

Two bs and a lot of zs:  it's no coincidence that zunzunbee uses Zigbee for the Slate Switch. If you've not heard of Zigbee before, it's an open wireless standard built for low-power smart home devices – which describes the Slate Switch to a tee, since it runs on a single CR2450 coin cell with up to two years of battery life.

Zigbee works entirely locally with no dependency on the cloud, so your smart home stays in your hands and the Slate Switch keeps working even if you lose internet connection. If you want that same security and control when you're away, <a href="https://www.nabucasa.com/" target="_blank" rel="noopener">Home Assistant Cloud</a> offers fully encrypted remote access – and as an added bonus 😉 subscribing directly funds the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation</a>'s fight for privacy, choice and sustainability for smart homes (and this very program too!).

By choosing Zigbee, zunzunbee support that fight… and they've been proactive contributors to our community as well. They've published official <a href="https://community.home-assistant.io/t/zunzunbee-slate-switch-sswz8t-home-assistant-blueprints-zha-zigbee2mqtt/981991" target="_blank" rel="noopener">Home Assistant blueprints</a> to make setup as smooth as possible, and contributed code to Zigbee2MQTT (another popular community-maintained open source project) on GitHub. It's exactly what we love to see from our partners!

<p class='img'><img src="/images/blog/2026-05-zunzunbee/image1.webp" alt="The Slate Switch simply snaps over your existing wall switches.">
The Slate Switch simply snaps over your existing wall switches.
</p>

## Devices

As with every device in the Works with Home Assistant program, the Slate Switch has been through our full certification process: tested for performance, reliability, and compatibility with our principles. By joining the program, zunzunbee also commits to providing long-term support and firmware updates, so you can purchase with confidence.

{% include integrations/device_list.html brand="zunzunbee" %}

It may be just one small device, but it gives you mighty choice! 💪The Slate Switch arrives as a blank canvas, with two sheets of stickers so you can label and arrange up to eight tappable zones exactly how you want them, and reconfigure just as easily if your needs change. And it's not only about switching scenes or triggers: there's a built-in ambient temperature sensor in the switch too, opening up even more automation possibilities straight out of the box.

Jimmy over at the <a href="https://www.youtube.com/watch?v=VEp8kA2n5Zw" target="_blank" rel="noopener">Automated House YouTube channel</a> has a great hands-on walkthrough if you want to see it all in action.

## Ready to make the switch?

We love it when a fresh idea from a new face lands in our orbit (and passes muster!) – and we have a feeling the Home Assistant community is going to have a lot of fun with this one. Whether you're just dipping your toe into smart home control, or looking for new ways to push your existing setup further, the Slate Switch has you covered. Check out our <a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener">certified device list</a> to see what else is out there!

## FAQs

Q: If I have a device that is not listed under "Works with Home Assistant" does this mean it's not supported?

A: No! It just means that it hasn't gone through a testing schedule with our team or doesn't fit the requirements of the program. It might function perfectly well but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don't currently test under the program.

Q: OK, so what's the point of the Works with program?

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have the functionality you would expect within Home Assistant, operate locally without the need for cloud, and that they will continue to do so long-term.

Q: How were these devices tested?

A: All devices in this list were tested using a standard [Home Assistant Green](/green/) as a hub with the [Home Assistant Connect ZBT-2](/connect/zbt-2/), and with ZHA, our [Zigbee integration](/integrations/zha/). If you have another hub/adapter set-up/integration that's not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

Q: Will you be adding more zunzunbee devices to the program?

A: Why not! We're thrilled to foster a close relationship with the team at zunzunbee and we're excited to see how they grow their product line in the future. We're looking forward to working together on any upcoming releases or adding in further products that are not yet listed here.
