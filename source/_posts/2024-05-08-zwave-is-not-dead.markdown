---
layout: post
title: "Z-Wave is not dead"
description: "Z-Wave is alive and well, partly due to a strong community that is building new open-source resources."
date: 2024-05-08 00:00:01
date_formatted: "May 8, 2024"
author: Paulus Schoutsen
comments: true
categories: Z-Wave
og_image: /images/blog/2024-05-zwave-is-not-dead/art.jpg
---

<p class="img"><img src='/images/blog/2024-05-zwave-is-not-dead/art.jpg'/><i>Art by Clelia Rella</i></p>

**TL;DR: Z-Wave is alive and well, partly due to a strong community that is building new open-source resources. To thrive well into the future, it must take further steps to open its technology.**

Last week, Dominic, Uwe, and I (Paulus) attended the Z-Wave Alliance member meeting in Austin, Texas. It was the first meeting since we [became a member](/blog/2024/02/15/nabu-casa-joins-z-wave-alliance/) and we came with a mission: tell Alliance members about the work done by the open-source community for Z-Wave and find new avenues for collaboration.

Three of us attended, each representing different facets of Z-Wave within the Open Home Foundation: Dominic is the founder and maintainer of Z-Wave JS, which powers the Z-Wave integration in Home Assistant. Uwe leads the development of the Home Assistant Z-Wave stick that we’re working on, and I was there to enable collaborations with other Z-Wave members. Big thanks to [Home Assistant Cloud subscribers](https://www.nabucasa.com/) – thanks to you we can do this work full-time at Nabu Casa.

### A little background on Z-Wave

To use Z-Wave in Home Assistant, our users buy a Z-Wave certified USB stick and combine it with Z-Wave certified devices. Home Assistant then connects to the stick using Z-Wave JS, developed by Dominic, and we’re off to the races. Z-Wave JS was developed completely outside of the Z-Wave Alliance, and is based on the published version of the Z-Wave specification.

Z-Wave wasn’t always this open - Z-Wave used to be owned by a single company, which was later acquired by Silicon Labs. SiLabs decided it was time for change and turned the Z-Wave Alliance into a Standards Development Organization (SDO) that is controlled by its members and a standard that is open.

As it stands, there are still parts of Z-Wave that are not open yet, including the firmware that is running on Z-Wave sticks. I might have mentioned _a couple of times,_ including in my keynote, that we should open up more. It is a good thing to let everyone help fix bugs, improve code quality, and improve diagnostics.

<!--more-->

## Opening Keynote

One of the conditions that we negotiated when joining the Z-Wave Alliance was that we would be allowed to give an opening keynote to explain the work we have been doing. For the last 8 years, Home Assistant has been doing its own thing with Z-Wave. We have contact with manufacturers of Z-Wave devices via [our partner program](https://partner.home-assistant.io/), but never established an official relationship with the Alliance. We decided that it was time to change that.

We launched the [Open Home Foundation](https://www.openhomefoundation.org/blog/announcing-the-open-home-foundation/) last month, a nonprofit that fights for privacy, choice, and sustainability in the smart home – and anyone who lives in one. Open smart home standards like Z-Wave are an important building block for this. With Z-Wave, your data stays at home as communication is fully local. It’s a standard meant to offer consumers choice, and with no reliance on the cloud, devices can continue to work long after a manufacturer ends support, or frankly doesn’t care anymore.

If you follow tech news, you might be wondering now: What about Matter? With the OHF, we believe in choice, including at the standard level. Each standard is built on top of different technologies, and each has pros and cons. Z-Wave is great because it works without Wi-Fi, and its sub-GHz frequency is less busy, allowing it to travel further.

<p class="img"><img src='/images/blog/2024-05-zwave-is-not-dead/paulus-z-wave.jpeg'/>Paulus Schoutsen presenting</p>

In my keynote to the Alliance, I introduced the work we’ve been doing with Home Assistant, Z-Wave JS, and the Open Home Foundation. According to [our opt-in analytics](https://analytics.home-assistant.io), 9.7% of our users use Z-Wave. This also means that 90.3% of installations are one Z-Wave stick away from being able to use Z-Wave. Z-Wave JS has opt-in statistics, which show on average there are 17 Z-Wave devices per network. **Math time:**

<p align="center"><b>
1 million active Home Assistant installations<br>
x<br>
9.7% using Z-Wave<br>
x<br>
17 Z-Wave devices<br>
=<br>
1.7 million Z-Wave devices in use </b></p>

When it comes to smart home standards, all big smart home platforms are all-in on Matter and have skipped or forgotten about Z-Wave – except for Home Assistant. We have always featured Z-Wave in our list of integrations and are big promoters of the standard.

This is where I introduced our goal for Z-Wave to the Alliance: we want Z-Wave to be a successful consumer-facing brand. Z-Wave is very popular among companies in the US making security products (like Ring). However, the consumer doesn’t know they are using Z-Wave because it is an implementation detail. This holds Z-Wave back from becoming a rich ecosystem.

For us, success means that there are many manufacturers making Z-Wave devices and that users have an abundance of choice in each product category.

<p class="img"><img src='/images/blog/2024-05-zwave-is-not-dead/keynote.png'/></p>

Z-Wave JS is an independent driver created from the ground up based on the published Z-Wave specification. Dominic has put a lot of effort into this, and his work has formed a community of people passionate about developing the best open Z-Wave driver. Our community has many power users who test Z-Wave JS and make sure it scales and works with both old and new devices.

We are working on getting Z-Wave JS certified to get companies to consider adopting it. Good news on that front – there is already one company that has dropped their 20-year-old Z-Wave stack in favor of Z-Wave JS. Let’s get more on board!

Our efforts to make Z-Wave a success go beyond making an open source Z-Wave driver and smart home platform. We also created the Z-Wave JS Firmware Update service to provide updates for Z-Wave devices. For this service we are currently working with 8 different manufacturers to provide firmware for 187 devices. In my keynote I told the audience that we want to help more manufacturers provide updates to their users.

<p class="img"><img src='/images/blog/2024-05-zwave-is-not-dead/firmware.png'/>The companies that contribute their firmware to the Z-Wave JS Firmware Update service.</p>

In the end, I wrapped up my talk pushing the Alliance to open up more: we all want Z-Wave to succeed. If it is more open, it will be easier for users to adopt. This will lead to more tooling, more apps, more everything. That will, in return, lead to a bigger Z-Wave ecosystem where we can all thrive. Some will do it for sales, or in our case, to drive forward products that value privacy, choice, and sustainability.

We are all in this Alliance to have our devices work together. Let’s not compete on who can best control a Z-Wave light bulb.

OPEN SOURCE!

## Range testing our Z-Wave stick prototype

One of our team's first stops at the Z-Wave Summit was attending [DrZWave](https://drzwave.blog/)’s range test down at the Colorado River. This was a perfect opportunity to see how well the prototype of our Z-Wave stick performs. While others tested with huge antennas on both sides to reach the longest range possible, we deliberately chose [end devices with tiny antennas](https://www.silabs.com/development-tools/wireless/efr32xg28-explorer-kit?tab=overview) to recreate a more real-world scenario. After all, many devices out in the wild don’t have room for big external antennas, and we want to have the best possible experience for our users with existing networks. Also, we tested both classic Z-Wave and Z-Wave Long Range because a majority of existing devices still use classic Z-Wave.

Bikes and scooters weren’t allowed on the bridges and near the water, so Uwe got some exercise that day, walking several miles up and down the river with the end devices in his pockets. Dominic performed the range test using [Z-Wave JS UI](https://github.com/zwave-js/zwave-js-ui) and a simple script that sent on/off commands to the end devices to make them blink. Due to encryption, even a single corrupted bit would be noticeable by an interruption of the blinking pattern and missing responses from the end device.

It is barely visible in the photo, but we reached the bridge behind the bridge all the way in the background. We used classic Z-Wave and Z-Wave Long Range, although classic Z-Wave was not as reliable at that distance. That is a 0.7-mile (1.13-km) **line of sight!** With a better antenna on the other side or using EU frequencies (which allow higher transmit power), even further ranges are definitely possible.

<p class="img"><img src='/images/blog/2024-05-zwave-is-not-dead/drzwave.jpeg'/>Left: Dominic, slightly jetlagged, with our stick prototype (green). Right: DrZWave with the controller reference design (purple). Background: Uwe, 0.7 miles away.</p>

## Unplug fest

Afterward, everyone headed inside for the unplug fest, where manufacturers of end devices and controllers/gateways could connect and test how well they interact with each other. Here’s an example of a HomeSeer prototype that already has great support in Z-Wave JS:

<p class="img"><img src='/images/blog/2024-05-zwave-is-not-dead/unplug.jpeg'/></p>

Since there was still some time left, we took the chance to perform more range tests with our prototype and the reference design, this time indoors going up through multiple layers of concrete. Depending on the end device, we were able to bridge between 2 and 8 floors.

## Z-Wave JS is EVERYWHERE

Besides powering the Z-Wave integration in Home Assistant, Z-Wave JS is a great tool for development. Built with diagnostics in mind, Z-Wave JS helps understand what the controller and devices are doing and whether they are behaving as expected.

Although we set out to tell people about Z-Wave JS, we learned that a lot of engineers from established companies already use it for development – and in their presentations!

<p class="img"><img src='/images/blog/2024-05-zwave-is-not-dead/slide.png'/></p>

They use it to reproduce issues, do load testing, write scripts to automate certain tasks, and run their own test suites. This includes using the CLI tools to update firmware, for example, to investigate changes between different Z-Wave SDK versions. The Javascript API makes it trivial to perform arbitrary actions and automate things that are hard or impossible to do using UI-based applications.

Another valuable development tool is the Zniffer, a special Z-Wave controller that can capture and decode all Z-Wave radio traffic. Like most of the existing tooling, this requires using Windows. Prior to the summit, Dominic had started working on adding support for Zniffer devices to Z-Wave JS. Although this was still a work in progress, people were already using it for development purposes and told us they were looking forward to it being officially released.

## Conclusion

Z-Wave is a powerful technology with a large install base, and in certain use cases, it provides real advantages over other connectivity standards. Meeting Alliance members, I can see they are enthusiastic about the future, but it's the community that will drive the next chapter of Z-Wave. Further opening Z-Wave will empower both the vendors and the community - and help build an open home that serves everyone in it, providing greater privacy, choice, and sustainability.