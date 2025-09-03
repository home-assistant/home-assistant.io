---
layout: post
title: "Frient joins Works with Home Assistant"
description: "After a long break, more Zigbee devices join the program, bringing everything from energy meter monitoring to smoke alarms."
date: 2025-09-02 00:00:01
date_formatted: "September 2, 2025"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2025-09-frient/art.webp
---

<img src='/images/blog/2025-09-frient/art.webp' style='border: 0;box-shadow: none;' alt="Frient joins Works with Home Assistant">

We’re making new frients this week, and they’re bringing an extensive line of Zigbee devices to our [Works With Home Assistant program](https://works-with.home-assistant.io/). Each device is tested by our team, ensuring they provide the best experience possible for Home Assistant. [Frient](https://www.frient.com/) is widely available across Europe, and are well-known for their sleek, unobtrusive designs that its customers love for their high Home Approval Factor.<!--more-->

## Our newest frient

Based in Denmark, the frient brand was developed by Onics, (formerly Develco Products), and they have years of experience with Zigbee devices. Frient is bringing its proven technology to the Works With Home Assistant program, as well as their Danish design that easily blends into almost any home.

Recent Works With partners have brought Z-Wave, Matter, and even Bluetooth devices to Home Assistant, but it's been _a couple of years_ 😅 since Zigbee-specific devices have joined the program. Zigbee is one of the most popular open protocols that is used with Home Assistant, with hundreds of thousands of users making use of it today. It's a proven technology that connects directly to Home Assistant, no cloud or Wi-Fi connection required. Zigbee is a mesh protocol, where some devices act as repeaters, strengthening the network as more are added. It was built from the ground up to power the smart home, and has been optimized to give devices really long (sometimes multi-year) battery life.

<div class="alert">
<p>"Joining the Works With Home Assistant program is a proud milestone for frient. It reflects our strong commitment to open, user-centric smart home experiences and ensures that our products seamlessly integrate with one of the most trusted platforms in the market. For Home Assistant users, it means more choice and flexibility — and for frient, it strengthens our position as a key player in the connected smart home space."</p>
<em style="text-align: right; display: block;">- Martin Langballe, International Business Development Manager at frient</em>
</div>

All you need to get started with Zigbee in Home Assistant is a Zigbee adapter or ‘stick’, such as the [Home Assistant Connect ZBT-1](/connectzbt1/) (wow, we released this in 2022, I wonder when we’re finally going to build a successor? 😉). By plugging the adapter into a USB port on your Home Assistant system, it should then discover the device and add the [ZHA integration](/integrations/frient/). After that is set up, you can start adding devices to your Zigbee network.  We’ve even added in a cool [new visualization](/blog/2025/06/11/release-20256/#making-sense-of-bluetooth) so that you can see how your Zigbee devices interact with each other.

ZHA is built with the support of the Open Home Foundation, and it even has a full-time developer ([@puddly](https://github.com/puddly)) dedicated to improving it and helping certify new Works With partner devices. Your support makes this possible, whether through a Home Assistant Cloud subscription or by purchasing official hardware.

## Devices

<p class="img">
<img src='/images/blog/2025-09-frient/energy-usage-data.webp' style='border: 0;box-shadow: none;' alt="A frient device attached to a energy meter">
When your energy company won’t provide your raw usage data, there’s always another way 😉
</p>

In case you didn’t know, Works With Home Assistant differs from other certification programs as products are rigorously tested in-house to ensure they work seamlessly out of the box with Home Assistant. Any company joining also commits to providing long-term support and firmware updates while being a positive force in the Home Assistant community. Works With Home Assistant is operated by the [Open Home Foundation](https://www.openhomefoundation.org/), and the support of [Home Assistant Cloud](/cloud/) subscribers funds this work.

Our team has worked extensively with frient to ensure that the following items work seamlessly with Home Assistant.

- [frient Motion Sensor Pro](https://www.frient.com/products/motion-sensor-pro)

- [frient IO Module](https://www.frient.com/products/io-module)

- [frient Smart Plug Mini](https://www.frient.com/products/smart-plug-mini)

- [frient Entry Sensor 2 Pro](https://www.frient.com/products/entry-sensor-2-pro)

- [frient Smart Siren UK](https://www.frient.com/products/smart-siren)

- [frient Smart Siren EU](https://www.frient.com/products/smart-siren)

- [frient Intelligent Keypad](https://www.frient.com/products/intelligent-keypad)

- [frient Water Leak Detector](https://www.frient.com/products/water-leak-detector)

- [frient Smart Button](https://www.frient.com/products/smart-button)

- [frient Intelligent Smoke Alarm](https://www.frient.com/products/intelligent-smoke-alarm)

- [frient Air Quality Sensor](https://www.frient.com/products/air-quality-sensor)

- [frient Smart Humidity Sensor](https://www.frient.com/products/smart-humidity-sensor)

- [frient Electricity Meter Interface 2 LED](https://www.frient.com/products/electricity-meter-interface-2-led)

This is a big portion of frient’s product line, and provides energy monitoring, device control, safety, and security sensors. The frient IO Module is the first certified Zigbee module that can be used to turn low-voltage dumb devices like electric blinds or garage doors into devices that can be controlled by Home Assistant.

There are some great devices here for building a more sustainable smart home. The Electricity Meter Interface 2 LED allows you to get the data off your energy meter and record it into Home Assistant. Another win for sustainability is their use of AA and AAA batteries wherever practical, meaning you can use rechargeables instead of constantly buying and recycling coin cells.

I also selfishly love to see some great UK-specific devices being brought into the program with the frient Smart Siren having both UK and EU versions.

## Best frients forever

It’s great to see Zigbee get some high-quality certified Works With Home Assistant devices after a multi-year wait. Frient has put a good deal of work into this launch and are big fans of our work and the community. There are more exciting Zigbee developments to come, so stay tuned!

## FAQs

**Q: If I have a device that is not listed under “Works With Home Assistant” does this mean it’s not supported?**

A: No! It just means that it hasn’t gone through a testing schedule with our team or doesn’t fit the requirements of the program. It might function perfectly well but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don’t currently test under the program.

**Q: Ok, so what’s the point of the Works With program?**

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have full functionality within Home Assistant, operate locally without the need for cloud, and will continue to do so long-term.

**Q: How were these devices tested?**

A: All devices in this list were tested using a standard HA Green Hub with the ZBT-1 and with the ZHA integration. We haven’t tested these devices with Zigbee2MQTT, so we would recommend checking their [device compatibility documentation](https://www.zigbee2mqtt.io/supported-devices/#v=Frient). If you have another hub, Zigbee adapter, or integration, that’s not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

**Q: Will you be adding more frient devices to the program?**

A: Why not! We’re thrilled to foster a close relationship with the team at frient to work together on any upcoming releases or add in further products that are not yet listed here.
