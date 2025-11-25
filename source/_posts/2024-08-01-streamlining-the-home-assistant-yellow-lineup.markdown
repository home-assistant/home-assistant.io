---
layout: post
title: "Streamlining the Home Assistant Yellow lineup"
description: "Home Assistant Yellow continues to be our flagship product, and the line is getting a small tweak."
date: 2024-08-01 00:00:01
date_formatted: "August 1, 2024"
author: Andy Gill
comments: true
categories: Announcements
og_image: /images/blog/2024-08-yellow-lineup/art.jpg
---
<p class='img'><img src='/images/blog/2024-08-yellow-lineup/art.jpg' style='border: 0;box-shadow: none;' alt="Home Assistant Yellow and packaging">Home Assistant Yellow fully assembled with additional (and not included) NVMe storage and Z-Wave GPIO module</p>

**TL;DR:**  We will now only sell the Home Assistant Yellow as a kit, which requires the separate purchase of a CM4. Home Assistant Green is the best plug-and-play option for beginners.

An important part of getting more people to use Home Assistant is providing great purpose-built hardware. It's our goal to provide hardware that makes it easier than ever to start with Home Assistant, along with compelling options for advanced users.  In 2022, we began shipping our [Home Assistant Yellow](/yellow/), and I'm happy to say that now in 2024, it remains our flagship hardware product.  We see a long life ahead for this expandable little powerhouse, and that's why we're streamlining our hardware lineup to make a bit more sense going forward.

We will now only sell the Home Assistant Yellow as a kit and have stopped producing the Home Assistant Yellow Standard (our version that came preassembled with a CM4 and Home Assistant already installed). Rest assured, as the Home Assistant Yellow Standard's hardware is identical to our kits, it will continue to receive the same support and software updates. The kits will continue to be available with or without power-over-ethernet (PoE).

It's not the biggest change, but we wanted our community to know - and if you want to see why we made the change, and how our [current hardware compares](#comparison), keep reading.

<!--more-->

## Background

When we launched Home Assistant Yellow, we designed it with expandability in mind.  It includes an onboard Zigbee/Thread radio, M.2 for more robust storage, and USB ports to add more connectivity (like adding our future [Z-Wave device](/blog/2024/06/12/roadmap-2024h1/#next-priority-home-assistant-connect-hardware-for-z-wave)).  Most importantly, you can change the core specs of the device by swapping the Raspberry Pi Compute Module 4 (CM4).  This allows users to increase the RAM, add eMMC storage, or even add built-in Wi-Fi/Bluetooth.

All this expandability is great, but we found many users wanted a more straightforward way to get started with Home Assistant. That's why we created the Home Assistant Yellow Standard variant, which included a CM4 with Home Assistant already installed onto the board - unlike our kits there was no assembly required. This meant you could immediately start using it after plugging in Ethernet and power.

### Green meets Yellow

Jump ahead to 2023, and in our quest to create an even more affordable starting point, we launched [Home Assistant Green](/green/). Not only does it cost less, it better fulfills the plug-and-play role the Home Assistant Yellow Standard used to occupy. From a timing perspective 2021 and 2022, were not the easiest time to source Raspberry Pi products, including the CM4. We learned some big lessons about the added supply chain complexities of this kind of product, and it influenced our thinking when designing Green. Ultimately, Home Assistant Green being a better beginner option led us to end production of the Standard. Though the Home Assistant Yellow Standard is now out of stock at major retailers, it will continue to receive support.

## Comparison

<p class='img'><img src='/images/blog/2024-08-yellow-lineup/green-meets-yellow.jpg' style='border: 0;box-shadow: none;' alt="Home Assistant Green and Yellow compared">Home Assistant Green and Yellow compared - as you can see they're about the same size</p>
So you've decided on getting some official Home Assistant hardware and don't know where to start, here's a little comparison to help you choose between the Green and Yellow.

<br><br>
<table style="font-size: 0.9em; width: 100%;">
  <colgroup>
    <col style="width: 20%;">
    <col style="width: 40%;">
    <col style="width: 40%;">
  </colgroup>
  <thead>
    <tr>
      <th style="font-size: 1.2em;">Features</th>
      <th style="font-size: 1.2em;">Home Assistant Green</th>
      <th style="font-size: 1.2em;">Home Assistant Yellow Kit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Best for</b></td>
      <td>Beginners, plug-and-play</td>
      <td>Advanced users, tinkerers, expandability</td>
    </tr>
    <tr>
      <td><b>Setup</b></td>
      <td>Easy - plug in the two included cables, and you're up and running</td>
      <td>Requires purchase of a CM4, basic <a href="https://yellow.home-assistant.io/power-supply/">assembly</a>, and <a href="https://yellow.home-assistant.io/power-supply/#installing-home-assistant-software-on-kit">software installation</a></td>
    </tr>
    <tr>
      <td><b>Connectivity</b></td>
      <td>Ethernet via included cable</td>
      <td>Ethernet via included cable</td>
    </tr>
    <tr>
      <td><b>Zigbee/Thread built-in</b></td>
      <td>No <p>(Can be added with <a href="/connectzbt1/">Home Assistant Connect ZBT-1</a>)</p></td>
      <td>Yes <p>(Onboard <a href="https://yellow.home-assistant.io/guides/about-firmware-options/">Zigbee 3.0 / Thread</a>)</p></td>
    </tr>
    <tr>
      <td><b>Expandability</b></td>
      <td>
        Good
        <ul>
          <li>2x USB ports</li>
        </ul>
      </td>
      <td>
        Best
        <ul>
          <li>1x Compute module connector (RAM, eMMC, Wi-Fi/Bluetooth)</li>
          <li>1x NVMe slot</li>
          <li>2x USB ports</li>
          <li>10-pin GPIO</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>Power</b></td>
      <td>Included power supply</td>
      <td>
        <a href="https://yellow.home-assistant.io/">Model dependent</a>:
        <ul>
          <li>Kit: included power supply</li>
          <li>Kit PoE: Power-over-Ethernet, no power supply</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>What else do they have in common</b></td>
      <td colspan="2">Both are small, fanless/silent, have extremely low power draw, and solid performance, leading to a smooth Home Assistant experience. Plus, purchasing either supports the development of Home Assistant!</td>
    </tr>
    <tr>
      <td><b>More information</b></td>
      <td><a href="/green/">Learn more about Home Assistant Green</a></td>
      <td><a href="/yellow/">Learn more about Home Assistant Yellow</a></td>
    </tr>
  </tbody>
</table>

## Conclusion

This small change helps us keep things simple while continuing to provide great hardware options for new and existing users. But as we always say, run Home Assistant on whatever hardware you have, whether that's our hardware or whatever you already have on hand. In the end, one of our main goals is to build a more sustainable smart home.
