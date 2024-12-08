---
layout: post
title: "Home Assistant Connect ZBT-1 issue and replacement"
description: "Through extensive testing, we’ve found a fault, but we’re setting up a replacement program."
date: 2024-10-02 00:01:01
date_formatted: "October 2, 2024"
author: Andy Gill
comments: true
categories: Public-Service-Announcement
og_image: /images/blog/2024-10-zbt1-issue/art.jpg
---
<img src='/images/blog/2024-10-zbt1-issue/art.jpg' alt="Home Assistant Connect ZBT-1 issue and replacement">

{% note %}
The replacement program is now operational, please contact the retailer where you purchased your device to request a replacement. The replacement program only covers ZBT-1 branded devices purchased prior to October 2024, and not SkyConnect-branded devices (identify which device you have [with this graphic](#do-i-have-a-zbt-1)).
{% endnote %}

We've found an issue in Home Assistant Connect ZBT-1 that has affected a small number of customers, which appears to be the result of a faulty part incorporated in the first production run of ZBT-1 devices, causing the device to fail and become completely unresponsive. We want to make sure everyone can get a replacement ZBT-1 and ensure they are covered far into the future.

Though Home Assistant SkyConnect is identical to the ZBT-1 under the hood, **it is not affected**. The design is not what's at fault, but instead, a defective voltage regulator that was used in this specific production run that is causing the issue. When a ZBT-1 is inserted into certain USB-A ports, the voltage regulator can fail, fully bricking the device. We used high-quality manufacturing and quality control in this and previous production runs. We are undertaking an investigation to find out how this could happen and most importantly, to avoid a repeat of anything remotely similar in the future.

We're sorry for any inconvenience this may cause you. Below are details on our investigation, how devices are affected, and the replacement program.
- [Background](#background)
- [Do I have a ZBT-1?](#do-i-have-a-zbt-1)
- [Pausing sales](#pausing-sales)
- [Replacement Program](#replacement-program)
- [Conclusion](#conclusion)

<!--more-->

## Background

Around a month ago, we were contacted about one of our latest (and [recently rebranded](/blog/2024/06/13/zbt1-annoucement/)) Home Assistant Connect ZBT-1s not being detected and showing a deformation on the housing. A couple more similar issues were reported, and we began a dialogue with the small number of people who were affected, having them send us the devices to test.

<p class='img'><img src='/images/blog/2024-10-zbt1-issue/zbt1-issue.jpg' style='border: 0;box-shadow: none;' alt="ZBT-1 case deformation and faulty voltage regulator">Circled in red the deformation on the case and the board showing the failed chip</p>

Indeed, the device no longer worked at all, not being detected by any device it was connected to. When we opened them, we found a dead voltage regulator. Though SkyConnect devices can also develop a small discoloration on the outside casing after long-term use, and this is not a sign of failure, the deeper deformation in the outer casing pictured above is a sign that the ZBT-1 has overheated and failed. All of our devices are certified by CE and ROHS, and the plastic shell has been designed not to combust. This is a real-life demonstration of just how important this certification is and why we take that step.

We replaced the voltage regulator on the devices we tested, and the devices sprang back to life. We found our culprit, but why was it failing? As mentioned, the SkyConnect internal design and the manufacturing were effectively identical to the ZBT-1, and we received no reports of any such failures in the literally tens of thousands of them in the wild. In manufacturing runs there is always a little variance, and in this run, something went wrong with the voltage regulator that was sourced - again, we're looking into this.

It took us a couple of weeks to replicate the problem with our own units. We went down some wrong paths, but eventually found it was triggered only by certain devices, specifically certain desktop PCs (internally, we have only found one desktop that causes this failure). We have not observed the failure occur when the device has only been connected to a Home Assistant Green, Raspberry Pi, or even a Mac. If you have plugged your ZBT-1 into a different device, specifically a desktop PC, and it is not recognized by that system, inspect it for this deformation pictured above. Obviously, we want you to be able to use the device with any hardware, and even if only a small number of devices from this production run have reported issues, it is still unacceptable to us.

## Do I have a ZBT-1?

<img src='/images/blog/2024-10-zbt1-issue/skyconnect-zbt1.png' style='border: 0;box-shadow: none;' alt="SkyConnect (left) and ZBT-1 (right)">
<p style="text-align: center; font-size: 0.9rem;">SkyConnect (left) and ZBT-1 (right) branded devices, SkyConnect are unaffected by this issue.</p>

## Pausing sales

We have asked our distributors to pause sales and return all stock. For the next month, you will see "Out of Stock" banners, and if you are attempting to get a replacement device for a failed unit, this will not be possible until production is resumed.

We are working to have replacement ZBT-1s shipped by early November.

## Replacement Program

If you have purchased Home Assistant Connect ZBT-1, we are working on a replacement program. This program will see Nabu Casa provide a replacement device free of charge for a period of 60 months (5 years) for verified purchases. Regardless of whether the device has failed, we will provide a replacement upon request.

It is a core value of ours to do things as sustainably as possible, and that's why we've provided such a long coverage period. We want to give owners with working ZBT-1s, who do not expect to use the device in a different system for the foreseeable future, the ability to keep it operating with peace of mind.

{% note %}
All ZBT-1 branded devices produced, as of October 2024, are believed to have this fault. You can tell if your device is a ZBT-1 by checking the white label on the back for “ZBT-1” (identify which device you have [with this graphic](#do-i-have-a-zbt-1)). There is no need to test if your device is affected by this fault.
{% endnote %}

If it's working, keep it plugged into the device it's working with, and don't worry about a replacement until you need it. If you need or want a replacement, please contact the seller where you purchased your device, and they will arrange the return process and replacement. Replacement devices are expected by early November, and we will be prioritizing people with non-functioning devices.

## Conclusion

We're sorry for the inconvenience and any disruption to your smart home. As someone who uses Zigbee in their home, which many smart devices rely on, I would hate to have it out of commission.

Worse things can happen, but this has been a gut punch. All our work at Nabu Casa is to fund the development of Home Assistant and support the Open Home. Issues like this eat into our time, and rob our users of new and great things. Ultimately, we're going to take this setback as a chance to prove we stand by our values and do the right thing.
