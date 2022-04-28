---
layout: post
title: "Celebrate the holidays with open standards"
description: "A lot of news dropped around open standards. Time for a quick round up."
date: 2019-12-20 0:43:02
date_formatted: "December 20, 2019"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Technology
---

It's been a busy week with a lot of announcements around IoT standards, so I thought I would do a quick round up of them, and how it might impact Home Assistant users.

## New IoT standard announced

As it's been a while, the industry has announced yet a new effort to create a new IoT standard called [Project Matter](https://buildwithmatter.com) (formally called: 'Connected Home over IP'). I think that there are a few interesting bits to this standard:

The standard will be royalty-free. This is big, as it means that it will be easy for companies to build products. Take, for example, Homekit, which is a great IP-based local standard. Homekit has strict licensing and royalties, which prevented it from widespread adoption.

The new standard specification will be written in conjunction with building an open source implementation of the standard. Once it's all finished, we'll be able to integrate this implementation into Home Assistant.

Finally, Apple, Google and Amazon are seriously involved, even contributing their own IoT standards to help bootstrap this specification. This significantly increases the odds of them also integrating it into their products. Since their products are everywhere, it means that more companies might incorporate the standard and it can get widespread adoption.

But don't hold your breath. Developing a standard takes time. They aim for a draft to be released at the end of 2020. And that's just the specification. Not any of the devices built with it. If (and that's a big IF) everything works out, expect this standard to get into your home in 2022.

<!--more-->

## Z-Wave to become an open standard

Silicon Labs and the Z-Wave Alliance have announced plans to [open up Z-Wave](https://news.silabs.com/2019-12-19-Silicon-Labs-and-Z-Wave-Alliance-Expand-Smart-Home-Ecosystem-by-Opening-Z-Wave-to-Silicon-and-Stack-Suppliers) in the second half of 2020. Among other things, this allows other companies to create Z-Wave radios, which could result in wider adoption and cheaper devices.

## Open Source HomeKit Accessory Development Kit

As part of the Connected Home over IP announcement, Apple has released an [open source version](https://github.com/apple/HomeKitADK) of their Accessory Development Kit (ADK). The ADK allows devices to be controlled by HomeKit controllers like Home Assistant (and ok, iOS devices). The spec was already open and Home Assistant implements it via the [Homekit integration](/integrations/homekit/). Opening up the ADK still helps because it gives a reference implementation to see how the spec should work.

## Bonus: deCONZ hass.io add-on gets Ingress support

It's not really related, but a little. deCONZ is Zigbee controller software that works with the Conbee Zigbee stick. It's a platinum Home Assistant integration and we've been working with [Phoscon](https://phoscon.de), the company behind deCONZ and Conbee, to add Ingress support to the Hass.io add-on.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Wait... did I just release the deCONZ add-on 4.0 for <a href="https://twitter.com/home_assistant?ref_src=twsrc%5Etfw">@home_assistant</a> with Ingress support? 🎉<br><br>Thanks to <a href="https://twitter.com/phosconde?ref_src=twsrc%5Etfw">@phosconde</a> for solving the last issues in deCONZ 2.05.72, that allows for this awesomeness! <a href="https://t.co/t9aVNdLJEg">pic.twitter.com/t9aVNdLJEg</a></p>&mdash; Franck Nijhof (@Frenck) <a href="https://twitter.com/Frenck/status/1207770759273353231?ref_src=twsrc%5Etfw">December 19, 2019</a>
</blockquote>
