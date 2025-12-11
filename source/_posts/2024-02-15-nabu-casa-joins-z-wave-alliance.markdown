---
layout: post
title: "Nabu Casa joins the Z-Wave Alliance"
description: "We have joined the Z-Wave Alliance, thanks to revenue from Home Assistant Cloud subscribers, and will start the certification process for Z-Wave JS."
date: 2024-02-15 00:00:01
date_formatted: "February 15, 2024"
author: Paulus Schoutsen
comments: true
categories: Z-Wave
og_image: /images/blog/2024-02-zwave/nabucasa-zwa.png
---

TL;DR: We have joined the Z-Wave Alliance, thanks to revenue from Home Assistant Cloud subscribers, and will start the certification process for Z-Wave JS.

<p><img src='/images/blog/2024-02-zwave/nabucasa-zwa.png' class='no-shadow' /></p>

Z-Wave is a local smart home standard that has been around since 1999. Thanks to operating on sub-Ghz frequencies, it is able to create a reliable mesh network that can span your whole house. Its reliability also made it popular to power brands like Yale locks and Amazon Ring. The Z-Wave standard is developed by a consortium of companies under the [Z-Wave Alliance](https://z-wavealliance.org/). 

With Home Assistant, we have integrated Z-Wave since our early days. We first relied on OpenZWave until we transitioned in 2021 to using [Z-Wave JS](https://github.com/zwave-js) created by Dominic Griesel. Z-Wave JS is a fully open-source implementation of the Z-Wave protocol. Combined with Home Assistant and a Z-Wave USB stick, it gives our users the best possible Z-Wave experience. Dominic is employed by Nabu Casa and can work full-time on Z-Wave JS thanks to the revenue generated from [Home Assistant Cloud](https://www.nabucasa.com/) subscribers (thank you!).

<!--more-->

We have thoroughly tested Z-Wave JS with the Home Assistant community. Our community is from all over the world and has access to a wide variety of Z-Wave devices from all generations. This has ensured that Z-Wave JS is able to deal with devices and their quirks all the way back to the original Z-Wave release.

However, our ambitions for Z-Wave JS are bigger than just making sure we have a rock-solid Z-Wave implementation for you. We want to make it easier for companies to develop Z-Wave controllers and grow the Z-Wave ecosystem. A bigger ecosystem is more appealing for manufacturers to make Z-Wave devices, which results in more choices for our users. And as Z-Wave works locally, it is a local choice. 

Today, we are proud to announce that we have joined the Z-Wave Alliance to get Z-Wave JS officially certified. Certification shows other companies that Z-Wave JS is a full and correct implementation of the Z-Wave standard. It will allow other companies to feel confident that they can adopt Z-Wave JS to integrate Z-Wave into their products. HomeSeer, for example, [has announced](https://forums.homeseer.com/forum/hs4-products/hs4-plugins/lighting-primary-technology-plug-ins-aa/z-wave-plus-homeseer/1634034-new-z-wave-plus-plugin-under-development#post1634634%0A) that it is migrating its platform to Z-Wave JS. We hope this will open up new opportunities as more companies follow our lead in the future.

## The Open Home

With Home Assistant, we have a vision for the smart home that we call [the Open Home](/blog/2021/12/23/the-open-home/). It revolves around three core values: privacy, choice, and sustainability. Anything that lives up to those values is worthy of being adopted by our community. It’s why we have previously [joined the Connectivity Standards Alliance (CSA)](/blog/2023/12/04/nabu-casa-at-the-matter-member-meeting/) to take part in the development of Matter and Zigbee, and have now joined the Z-Wave Alliance.

Z-Wave aligns with these three values: your data remains local, you can combine Z-Wave devices from any manufacturer, and devices will continue to operate even if the company behind them is no longer around. It is an important standard for the Open Home. 

This is why, even though Z-Wave, Zigbee, and Matter are competing standards, we have joined both the Z-Wave Alliance and the CSA and will keep supporting each standard. Not every smart home is the same. Users need to have choice and be able to pick the standard that works best for their home. And competing standards push each other to improve and innovate, ultimately leading to all standards becoming better for users.

As part of the Z-Wave Alliance, we plan on bringing our unique insights as an open source community to the table. We want to make sure that the future direction of the Z-Wave standard continues to remain true to our Open Home values. Just like we do for Zigbee and Matter within the CSA. 
