---
title: "[On hold] Deprecating Home Assistant Supervised on generic Linux"
description: "Home Assistant Supervised is no longer a supported installation option."
date: 2020-05-09 00:00:00
date_formatted: "May 9, 2020"
author: Paulus Schoutsen
author_twitter: balloob
categories: Announcements
---

**[Update May 26]**

[New blog post published with next steps.](/blog/2020/05/26/installation-methods-and-community-guides-wiki/)

**[Update May 10]**

We’ve been overwhelmed with the many reactions. We realize our communication has been poor on this subject, for which I want to apologize. We do not collect data and so can’t always judge the impact of our decisions.

We’re going to put the deprecation plan on hold for now. Anyone running this installation method today can continue running this. We will offer more clear information in the future.

We’re going to investigate how we can maintain the supervised installation on generic Linux.

Furthermore, we are going to make sure that supported installation guides are properly documented.

Paulus

---

TL;DR: Home Assistant Supervised (also known as Home Assistant on Generic Linux) installation method is no longer supported.

There are currently three different ways of installing Home Assistant:

- Home Assistant: our operating system running either directly on a supported device like the ODROID N2, Raspberry Pi 4, Intel NUC or a virtual machine.
- Home Assistant Supervised: an installation of core + supervisor that are hosted on a generic Linux installation.
- Home Assistant Core: our Python core application running in a Python virtual environment or a Docker container.

![Different installation methods](/images/blog/2020-05-09-deprecating-supervised/installation-options.png)

The benefit of running the Supervisor is that you are able to keep Home Assistant up to date from within Home Assistant, and easily install add-ons that are pre-configured to be able to integrate with Home Assistant.

The Supervisor is an extremely complicated program that interacts with a wide range of applications and components in the host operating system. Examples are Docker containers, DNS, sound and USB hardware sticks that users want to use with Home Assistant. The Supervisor is controlled from Home Assistant which allows us to create a full home automation hub experience.

The Home Assistant operating system is made with the bare minimum that the Supervisor needs to run and makes sure it does not get in the way of the Supervisor: the system is fully managed by the Supervisor.

Some users still wanted to be able to control the host operating system, and so a generic installer was introduced that could install Home Assistant Core and Supervisor on a generic Linux system, like Debian or Ubuntu.

However, when people run it on top of their own system, things can go wrong. And in fact, it’s quite complex to maintain it on generic Linux. Installing is fine, everyone can follow a tutorial, but after that when things break, people come to us, not the author of the tutorial. And this workload keeps growing, to a problematic extent.

Home Assistant OS and Supervisor are being maintained by Pascal. He started them 3,5 years ago and has been maintaining this first in his spare time, later as a full-time employee of Nabu Casa.

Building the operating system and the supervisor is a complex task that requires specific expertise. Sadly after 3,5 years, there are still no other contributors to help. This has resulted in his responsibilities outgrowing what one can expect from a full-time employee.

Nabu Casa was founded to make the development of Home Assistant sustainable. To be able to maintain a healthy work/life balance and to avoid developer burn-out that is, unfortunately, common in the open source world.

In an effort to reduce Pascal’s constraints we’re per direct no longer supporting the generic Linux installation method. It will no longer be mentioned in the documentation. We have archived the repository. If you are willing to maintain it, feel free to fork it. Issues that result from using this will be ignored or closed when reported to us.

## Open Source & Community

Just as with our [recent decision to limit the usage of YAML in some cases](https://www.home-assistant.io/blog/2020/04/14/the-future-of-yaml/), Home Assistant will keep choosing health over features. Open source is not about us having to support every feature anyone on the internet can think of. Open source means that anyone can do that themselves and choose to share this or not.

There are still tons of ways of installing Home Assistant, there are still tons of features and customizations possible.

## Frequently Asked Questions

### How do I run Home Assistant while still keeping control over the operating system?

We offer a virtual machine image of Home Assistant. These images can be used on e.g., VMWare, VirtualBox and Proxmox, and also on NAS systems that support running a VM as most modern NAS systems do. Using these provided images will give you the full supported Home Assistant experience.

[You can find virtual machine images here.](https://www.home-assistant.io/hassio/installation/)

### I run on a platform that doesn’t support VMs and I still want to keep control over the operating system.

To do this we recommend running Home Assistant Core in Docker. You will lose out on the easy updates, system management and pre-configured apps (add-ons) from the UI. However, you are still able to run the full beating heart of the Home Assistant home automation platform.

All applications that are available as Home Assistant add-ons are also available as third-party Docker containers. You will be responsible to configure them to work with Home Assistant Core yourself.

### I know what I am doing. Can I still use the generic Linux installer?

Yep, the archived repository is still there. You can also fork it and change things. But there is no official resource to visit when things break.

### I am currently running Home Assistant Supervised. Now what?

Everything will continue to work as-is. Bugs won’t be fixed and you should consider migrating to one of the other methods. If you are migrating to a virtual machine, you can make a snapshot in the Supervisor panel and restore that in your new installation.

[Edit May 9, 16:19] Removed paragraph from Open Source & Community as it was insinuating.
