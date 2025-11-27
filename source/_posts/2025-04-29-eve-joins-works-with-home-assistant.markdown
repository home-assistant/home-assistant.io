---
layout: post
title: "Eve Joins Works With Home Assistant"
description: "They have had multiple Matter-over-Thread devices certified, including a cool outdoor weather sensor and smart heating devices."
date: 2025-04-29 00:00:01
date_formatted: "April 29, 2025"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2025-04-eve/art.jpg
---

<img src='/images/blog/2025-04-eve/art.jpg' style='border: 0;box-shadow: none;' alt="Eve and Home Assistant collaboration banner">

We're thrilled to announce that [Eve](https://www.evehome.com/en) has joined the [Works with Home Assistant](https://works-with.home-assistant.io/) program! Eve is at the forefront of the Matter standard and has some great Matter devices focused on local control and privacy in the home. They're bringing a variety of devices to the program, including a couple of firsts!

## Eve of a New Day for the Open Home

Eve, based in Germany and part of ABB, is known for making high-quality smart home devices. They've been an early proponent of Matter, as it really aligns with their philosophy of local and private control. In their own words, *"No Eve cloud, no registration and no tracking so your data won't get exposed. Local intelligence and direct communication between Eve devices and smartphones or hubs without cloud dependency."*<!--more-->

Eve has had a wide range of devices Works with Home Assistant certified, all of which connect directly to Home Assistant via Matter. If you're not aware, Matter is an open smart home standard that allows for local control by directly connecting devices to Home Assistant, keeping your smart home data in your home. In case you missed it, Home Assistant is now [Matter Certified](/blog/2025/03/10/matter-certification/)!

<p class="img"><img src='/images/blog/2025-04-eve/eve-weather.jpg' alt="Eve Weather"/>Built for outdoor weather sensing, Matter, and a cool segmented LCD display---sign me up</p>

Matter can connect to devices over Ethernet and Wi-Fi networks, but it can also use [Thread](/integrations/thread/), which every Eve device being certified today uses. Thread devices can be directly connected to Home Assistant using a device like the [Connect ZBT-1](/connectzbt1), or can be connected to Home Assistant via an existing hub (Thread Border Router) you may already have from another [smart home ecosystem](/integrations/thread#google). Thread was designed around efficiency and is excellent for low-powered or battery-powered devices. Also, if your smart home balloons up to a hundred devices (or more 😅), you won't overwhelm your Wi-Fi router, as Thread operates independently.

Eve isn't just a fan of Matter; they're actively shaping the standard. Their team is deeply involved with the development of Matter and the Connectivity Standards Alliance (CSA), and we were delighted to connect with them at the recent CSA meeting in Chicago. Their commitment runs so deep that Eve licenses its technology to help other manufacturers embrace Matter. In fact, fellow Works with Home Assistant partner [Motionblinds](/blog/2025/03/27/motionblinds-joins-wwha/) uses Eve's technology, proudly displaying "Powered by Eve" on their certified motors.

<div class="alert">
    <p>"Eve and Home Assistant are the perfect match for a local-first, privacy-centric smart home. With Eve devices featuring Matter, Thread, and absolutely no cloud connection in combination with Home Assistant's extensive, local automation capabilities, now everybody can enjoy the smart home the way it was meant to be: with you in control." <em style="text-align: right; display: block;">-Jerome Gackel, CEO Eve Systems</em>
</div>

## Certified Devices

In case you didn't know, Works with Home Assistant differs from other certification programs as products are rigorously tested in-house to ensure they work seamlessly out of the box with Home Assistant. Any company joining also commits to providing long-term support and firmware updates while being a positive force in the Home Assistant community. Works with Home Assistant is operated by the [Open Home Foundation](https://www.openhomefoundation.org/), and the support of [Home Assistant Cloud](/cloud/) subscribers funds this work.

Eve has certified the following Matter-over-Thread enabled devices:

- [Eve Door & Window](https://www.evehome.com/en/eve-door-window)
- [Eve Energy Outlet](https://www.evehome.com/en/eve-energy-outlet)
- [Eve Energy Outdoor](https://www.evehome.com/en/eve-energy-outdoor)
- [Eve Energy](https://www.evehome.com/en/eve-energy)
- [Eve Light Switch (U.S. & Canada)](https://www.evehome.com/en/eve-light-switch)
- [Eve Dimmer Switch](https://www.evehome.com/en/eve-dimmer-switch)
- [Eve Motion](https://www.evehome.com/en/eve-motion)
- [Eve Custom Smart Blinds](https://www.evehome.com/en-us/eve-blinds-collection)
- [Eve MotionBlinds Upgrade Kit](https://www.evehome.com/eve-motionblinds)
- [Eve Thermo](https://www.evehome.com/en/eve-thermo)
- [Eve Weather](https://www.evehome.com/en/eve-weather)

## Eve-rything You Need

It is amazing to have Eve in the Works with Home Assistant program, as we've been fans of their focus on privacy and local control for years. The list of devices they certified today is really comprehensive, and I dare say you could build a pretty well-rounded smart home just with their devices. There are even a couple of firsts for the program, including their smart radiator valve, outdoor weather sensor, outdoor outlet, and water-resistant motion sensor. Eve is continuously working on transitioning their complete smart home portfolio over to Matter, so if you spot a device that is not Matter-compatible yet - stay tuned.

### FAQ on Works with Home Assistant

- ***If I have a device that is not listed under 'Works with Home Assistant' does this mean it's not supported?*** No! It just means that it hasn't yet gone through testing with our team, either because the brand has not submitted it for testing, or because the device does not fit the program's requirements (ex. it's not an end-device or requires cloud connectivity). It may not be the same polished experience you would get from certified devices, but if you've been using the device for some time without issue, nothing will change. Our community is quite good at listing the devices they have confirmed to work on the integration page, so this is always worth double-checking if you're unsure. We may test it down the road, but it's up to the brand to choose what they submit for testing, so tell them what you want.

- ***Ok, so what's the point of the Works with program?*** It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have full functionality within Home Assistant, operate locally without the need for cloud connectivity, and will continue to do so long-term. If you already own one of these devices, congrats! You're safe in the knowledge that the manufacturers are committed long-term to providing Home Assistant support.

- ***How were these devices tested?*** All devices in this list were tested using a standard Home Assistant Green, with the Connect ZBT-1 as the radio for the Thread Border Router, and our [certified Matter Integration](/integrations/matter/).  If you have a different hardware configuration that works for you, then great. The above hardware is just what our team uses to ensure consistency across testing.

- ***Will you be adding more Eve devices to the program?*** We are always interested in adding more devices. We're excited to be working closely with the Eve team and look forward to continuing to bring cool new devices to the program. If there are products you'd like to see certified, feel free to let us know!
