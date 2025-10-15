---
layout: post
title: "SwitchBot joins Works with Home Assistant"
description: "The first air purifiers and cleaning robots join the program, with options for Matter and Bluetooth connectivity."
date: 2025-06-26 00:00:01
date_formatted: "June 26, 2025"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2025-06-switchbot/art.jpg
---

<img src='/images/blog/2025-06-switchbot/art.jpg' style='border: 0;box-shadow: none;' alt="SwitchBot Joins Works with Home Assistant">

Please welcome the latest addition to the [Works with Home Assistant](https://works-with.home-assistant.io/) program, [SwitchBot!](https://www.switch-bot.com/) This year has seen a lot of 'firsts' within the program, and this launch certainly keeps up this trend. Read on to see the first *Air Purifiers* and *Vacuums / Cleaning Robots*! What's more, SwitchBot is bringing this first set of devices into the program with multiple connectivity options. Pick from their [Bluetooth integration](/integrations/switchbot/), Matter via a hub, or standalone Matter devices as well. All this gives you even more choice in how you set up your smart home, while providing the best experience with Home Assistant.<!--more-->

## Making the Switch...Bot

SwitchBot quickly gained traction in the smart home industry with their original finger bots, which sit over non-smart switches and physically press them down on your behalf. Since then, they've expanded to include many other smart home devices like curtain robots, hubs, air purifiers, and cleaning robots. We were excited to see these new products in person at CES earlier this year and meet up with their team.

SwitchBot even got involved with [Community Day](/blog/2025/06/24/community-day-2025-wrap-up/), hosting a meet-up in Shenzhen, China. We love that the 'Works with' partners show that they're passionate about engaging with our community, taking the partnership much further than just a label on a box.

<div class="alert">
    <p>"At SwitchBot, we're committed to empowering users with seamless and intelligent home automation. By collaborating with Home Assistant's passionate, tech-savvy community, we're able to push boundaries and deliver more integrated, intuitive experiences. Together, we aim to expand what's possible, offering users greater flexibility to connect, control, optimize their homes, and to make it simple."</p>
<em style="text-align: right; display: block;">- Richard Mou - Co-Founder, SwitchBot</em>
</div>

## Devices

In case you didn't know, Works with Home Assistant differs from other certification programs as products are rigorously tested in-house to ensure they work seamlessly out of the box with Home Assistant. Any company joining also commits to providing long-term support and firmware updates while being a positive force in the Home Assistant community. Works with Home Assistant is operated by the [Open Home Foundation](https://www.openhomefoundation.org/), and the support of [Home Assistant Cloud](/cloud/) subscribers funds this work.

The SwitchBot team have put special focus on integrating specifically for Home Assistant and have been working hard on their [Bluetooth integration](/integrations/switchbot/). Though the community played a central role in the development of the integration, and SwitchBot is very thankful for this work, they took a more active role in its development.

One of the terms of the 'Works with' program is that Bluetooth devices must connect over an integration that is kept up to a certain code quality (we call this our ['Gold tier'](/docs/quality_scale/) on our quality scale). It also must be maintained by the manufacturers themselves, rather than overly relying on community members to do the hard work. This puts the responsibility on the shoulders of the manufacturers to make sure they're responding to bugs and keeping the integration up long term. If you’re interested in SwitchBot’s Bluetooth products but your Home Assistant system doesn’t have built-in Bluetooth, the easiest way to connect them is by using a [Bluetooth Proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies).

If you prefer Matter, SwitchBot also has devices that are certified for use with one of their Matter hubs: either the [SwitchBot Hub 2](https://www.switch-bot.com/products/switchbot-hub-2) or the [Hub 3](https://www.switch-bot.com/products/switchbot-hub-3). There are also some that can work via Matter-over-WiFi as standalone devices. We are currently testing even more of SwitchBot’s Matter devices for the program.

**Bluetooth**
- [SwitchBot Lock Ultra](https://www.switch-bot.com/products/switchbot-lock-ultra)
- [SwitchBot Air Purifier](https://www.switch-bot.com/products/switchbot-air-purifier)
- [SwitchBot Air Purifier Table](https://www.switch-bot.com/products/switchbot-air-purifier-table)
- [SwitchBot Leak Detector](https://www.switch-bot.com/products/switchbot-water-leak-detector) - also works using Matter via a hub
- [SwitchBot Meter](https://www.switch-bot.com/products/switchbot-meter)  - also works using Matter via a hub 
- [SwitchBot Meter Pro](https://www.switch-bot.com/products/switchbot-meter-pro) - also works using Matter via a hub
- [SwitchBot Meter Pro CO2](https://www.switch-bot.com/products/switchbot-meter-pro-co2-monitor) - also works using Matter via a hub
- [SwitchBot Indoor/Outdoor Thermo-Hygrometer](https://www.switch-bot.com/products/switchbot-indoor-outdoor-thermo-hygrometer) - also works using Matter via a hub
- [SwitchBot Curtain 3](https://www.switch-bot.com/products/switchbot-curtain-3) - also works using Matter via a hub
- [SwitchBot Contact Sensor](https://www.switch-bot.com/products/contact-sensor) - also works using Matter via a hub
- [SwitchBot Roller Shade](https://www.switch-bot.com/products/switchbot-roller-shade) - also works using Matter via a hub
- [SwitchBot Lock Pro](https://www.switch-bot.com/products/switchbot-lock-pro) - also works using Matter via a hub

**Matter-Over-WiFi (standalone, without requiring a hub)**
- [SwitchBot Air Purifier](https://www.switch-bot.com/products/switchbot-air-purifier)
- [SwitchBot Air Purifier Table](https://www.switch-bot.com/products/switchbot-air-purifier-table)
- [SwitchBot Multitasking Robot K20 + Pro](https://www.switch-bot.com/products/switchbot-multitasking-household-robot-k20-pro)

***Note:*** *Home Assistant Container does not support Matter, and requires Home Assistant OS.*

## A smart home is a clean home

<p class='img'><img src='/images/blog/2025-06-switchbot/vacuum.jpg' style='border: 0;box-shadow: none;' alt="SwitchBot's cleaning robot with an air purifier">Eat your heart out Wall-E</p>

SwitchBot's K20 is the first cleaning robot in the Works with Home Assistant program as well as the world's first multi-tasking household robot. This wacky robot can be paired with lots of other items in the range, including the certified air purifiers, to make some really cool Home Assistant use cases. Just imagine, you're making some delicious dinner, but oh no, you've left a pan alone for too long and it starts to smell and burn. You could summon the K20 with an air purifier on top using the Home Assistant Voice Preview Edition. A few moments later, it's found its way to you and gets started on clearing the air in your kitchen. Plus, as these can both work via Matter, there's no need for cloud involvement. Some of the items also come with a table top so this device has some great applications for anyone with limited mobility.

## Bot to the future

These devices are the first certified items, but SwitchBot is working to get many more tested and fully feature-rich with Home Assistant. We're excited to keep expanding this list over time, but if you can't wait (and this work is only possible with the support of our [Home Assistant Cloud](/cloud/) subscribers), you can see the list of the other devices they are working on [here](https://www.switch-bot.com/pages/home-assistant).

## FAQs

***Q: If I have a device that is not listed under 'Works with Home Assistant' does this mean it's not supported?***

A: No! It just means that it hasn't gone through a testing schedule with our team or doesn't fit the requirements of the program. It might work fine and be added to our testing later down the road. Though it might only have limited functions that are being worked on, or use a connectivity type we don't currently test for in the program.

***Q: Ok, so what's the point of the Works with program?***

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have full functionality within Home Assistant, operate locally without the need for cloud, and will continue to do so long-term.

***Q: How were these devices tested?***

A:  The Bluetooth devices in this list were tested using a standard Home Assistant Green Hub, the SwitchBot Bluetooth Integration, a USB Bluetooth adapter, and an ESPHome Bluetooth Proxy. The Matter-over-WiFi devices were also tested with Home Assistant Green and our [certified Matter Integration](/integrations/matter/). If you have another hardware setup or integration, that is often not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

***Q: Will you be adding more SwitchBot devices to the program?***

A: Absolutely! SwitchBot has a quickly growing set of product lines that we're working to certify together, subject to the integrations fully covering all the functions.
