---
layout: post
title: "AirGradient joins Works with Home Assistant"
description: "They bring indoor and outdoor air quality monitors to the program."
date: 2025-08-21 00:00:01
date_formatted: "August 21, 2025"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2025-08-airgradient/art.jpg
---

<img src='/images/blog/2025-08-airgradient/art.jpg' style='border: 0;box-shadow: none;' alt="AirGradient joins Works with Home Assistant">

We're excited to announce that [AirGradient](https://www.airgradient.com/) is the latest manufacturer to join the fast-growing [Works With Home Assistant](https://works-with.home-assistant.io/) program! They bring their air quality monitors to the program, with both indoor and outdoor models.

AirGradient is the first partner in the program focused on building advanced indoor and outdoor air quality monitors. They are also well known within our community for their powerful tech, and for their focus on open source and dedication to local air quality projects around the world.

<!--more-->

## A breath of fresh air

AirGradient is the first partner to join that operates out of Thailand, and they initially started making their air monitors to help their local community. They actively support air quality improvement projects both in Thailand itself, but also globally. AirGradient donates monitors and has partnered with a variety of different organisations and NGOs, including [UNICEF](https://www.airgradient.com/blog/open-source-to-change-the-world/). These monitors are often placed in schools, helping young people to better understand and work to protect their air quality.

<p class='img'><img src='/images/blog/2025-08-airgradient/outdoors.webp' style='border: 0;box-shadow: none;' alt="An Open Air Monitor mounted outdoors in Vietnam">An Open Air Monitor in Vietnam</p>

Community is central to our work with AirGradient. Their hardware and software are open source, just like our own. Plus, they’ve taken an active role in integrating into Home Assistant, bringing [their local Wi-Fi integration](/integrations/airgradient/) up to not just the gold, but the platinum tier on our [integration quality scale.](/docs/quality_scale/) Like all of our _Works With_ partners, the devices work completely locally with no need for a cloud connection. What’s more, they really embrace the DIY aspect of the smart home, with their devices available fully assembled or as a build-it-yourself kit!

AirGradient’s open approach even extends to the data collected by their community of users. Whilst completely optional, users can share their air quality readings with the world (which they [visualize into an amazing map](https://www.airgradient.com/map/?zoom=1\&lat=49.2125578\&long=16.62662018\&org=ag\&meas=rco2)). This helpful air quality map grows every time a user opts to share their data, and is a fantastic open resource for climate researchers, students, or anyone concerned about air quality in their local area. If your area is a blank spot on this map, that is all the more reason to buy an AirGradient outdoor monitor.

<img src='/images/blog/2025-08-airgradient/visual-map.webp' style='border: 0;box-shadow: none;' alt="An online AirGradient air quality map">

Each kit comes with a screwdriver and is designed for easy repair. Broken sensor? Swap it out. Firmware update needed? Flash it yourself. Sustainability is one of the core guiding principles of the Open Home Foundation, and we love that repairability is built in. AirGradient also donates at least 1% of annual sales to non-profits and community direct donations. In fact, they asked us to include in this blog an open invitation to our community: If you have a local project that you think would benefit from open source air quality monitors, get in touch through [this link](https://www.airgradient.com/support/).

<div class="alert">
    <p>"We're excited to join the Works With Home Assistant program because it aligns perfectly with our open-source philosophy. Home Assistant represents the same values we believe in - local control, privacy, and community-driven innovation. Together, we're proving that open systems don't just work better for users, they create better outcomes for the planet."</p>
<em style="text-align: right; display: block;">- Achim Haug, Founder and CEO of AirGradient</em>
</div>

## Certified Devices

In case you’re new to [Works With Home Assistant](https://works-with.home-assistant.io/), unlike some certification programs, it’s not just a badge. We rigorously test items in-house and provide feedback to the manufacturers to ensure that products work easily out of the box and provide a seamless experience. The Works With program is operated by the [Open Home Foundation](https://www.openhomefoundation.org/) and funded by the support of [Home Assistant Cloud](/cloud/) Subscribers.

AirGradient has certified the following devices with us:  

- [AirGradient One - Indoor Air Quality Monitor](https://www.airgradient.com/indoor/)

- [AirGradient Open Air - Outdoor Air Quality Monitor](https://www.airgradient.com/outdoor/)

<p class="img"><img src='/images/blog/2025-08-airgradient/kitchen-counter.webp' style='border: 0;box-shadow: none;' alt="An AirGradient One sitting on a kitchen counter">Finally, a metric to show precisely how badly you burned your dinner</p>

When we talk about sustainability in relation to the smart home, it’s easy to focus on energy management and reducing our carbon impact. However, with AirGradient, you can deep dive into the impacts of the release of CO2 and other air pollutants, better understanding what you, your family, and friends breathe in every day. With an in-house science team of atmospheric chemists and public health experts, they ensure that the monitors are accurate and each of the fully assembled monitors are tested in a dedicated test chamber.

Whether you want to see if your new furniture is putting dangerous VOCs into the air, or if a smelly candle is going to aggravate any allergies, the use cases are endless. The AirGradient One also has a built-in display with both detailed data and a set of LEDs to show general air quality at a glance. Both devices measure carbon dioxide, VOCs, nitrogen oxides, particulate matter, temperature, and humidity. AirGradient also provides helpful documentation on their website that helps you understand these measurements and the impact they can have on your household.

These devices can not only give you in-depth information about the air in and out of your home, but they can also unlock powerful automations. We often see these devices paired with door or window open/close sensors, air purifiers, dehumidifiers, or air conditioners to reduce particulates in the home from pets or carpets.

## Clearing the air

We’re so excited to be partnered with AirGradient. Their mission is important, and their open and sustainable approach is precisely what we love to see. Partnerships like this are only possible with the support of [Home Assistant Cloud](/cloud/) subscribers. Many of us at the Open Home Foundation have picked up AirGradient monitors and are sharing our air quality data today, and we’d love for you to join us on the map!

## FAQs

**Q: If I have a device that is not listed under Works With Home Assistant, does this mean it’s not supported?**

A: No! It just means that it hasn’t gone through a testing schedule with our team or doesn’t fit the requirements of the program. It might function perfectly well, but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don’t currently test under the program.

**Q: Ok, so what’s the point of the Works With program?**

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have full functionality within Home Assistant, operate locally without the need for cloud and will continue to do so long-term.

**Q: How were these devices tested?**

A: All devices in this list were tested using a standard HA Green Hub with the local AirGradient integration and a Wi-Fi network. HA will automatically discover them after they join your network (following the device's instructions to add it to the WiFi). If you have another setup, that’s not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

**Q: Will you be adding more AirGradient devices to the program?**

A: Why not! We’re thrilled to foster a close relationship with the team at AirGradient to work together on any upcoming releases or add in further products that are not yet listed here.
