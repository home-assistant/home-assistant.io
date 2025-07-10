---
layout: post
title: "Deprecating Core and Supervised installation methods, and 32-bit systems"
description: "This deprecation will help focus support efforts and streamline development."
date: 2025-05-22 00:00:00
date_formatted: "May 22, 2025"
author: Franck Nijhof
author_twitter: frenck
comments: true
categories: Public-Service-Announcement
og_image: /images/blog/2025-05-deprecation/art.png
---

<img src='/images/blog/2025-05-deprecation/art.png' style='border: 0;box-shadow: none;' alt="Deprecating Core and Supervised installation methods, and 32-bit systems">

We are today officially deprecating two installation methods and three legacy CPU architectures. We always strive to have Home Assistant run on almost anything, but sometimes we must make difficult decisions to keep the project moving forward. Though these changes will only affect a small percentage of Home Assistant users, we want to do everything in our power to make this easy for those who may need to migrate.

Beginning with Home Assistant 2025.6, affected systems will display a notification after updating, indicating that **support will end in six months (with release 2025.12)** and include a recommendation to [migrate to a supported system](#how-to-migrate). In this post, we'll go into our thinking on these deprecations and our findings after consulting the community on these changes.

We have deprecated the following installation methods:

- **Home Assistant Core** installation method, where you run your system in a Python environment, not to be confused with Container (for example, running your system in Docker).
- **Home Assistant's Supervised** installation method, which involves running your own operating system, then installing the Supervisor and other requirements on top of that.

These are advanced installation methods, with only a small percentage of the community opting to use them. If you are using these methods, you can continue to do so (you can even continue to update your system), but in six months time, you will no longer be supported, which I'll explain the impacts of in the next section. References to these installation methods will be removed from our documentation after our next release (2025.6). Going forward [Home Assistant OS](https://github.com/home-assistant/operating-system) and [Home Assistant Container](https://hub.docker.com/r/homeassistant/home-assistant) will become the only supported installation methods.

In the future, only the currently supported 64-bit architectures (aarch64 and amd64) will be used. The following legacy architectures are being deprecated:

- **i386** (32-bit x86) is an architecture used by Intel and AMD predominantly before 2003, but some later processors still utilized it (e.g., early Intel Atom models).
- **armhf** (32-bit ARM hard-float) was used by very early single-board computers, notably the original Raspberry Pi.
- **armv7** (32-bit ARM) was used by a number of early single-board computers, most notably the Raspberry Pi 2.

If you are one of the few with a system using these architectures, you will receive a notification after updating to 2025.6, and it will describe how to migrate your system. In six months, your system will become unsupported and will no longer receive updates.

[Check our guide to see if your current Home Assistant installation is affected.](#check-if-youre-affected)<!--more-->

## What does deprecated and unsupported mean

In the simplest terms, deprecation is where you stop recommending a certain feature to users as you intend to remove it soon. As we deprecated the Core and Supervised installations methods today, that means we are now working to remove all references to them from our documentation. The goal is to guide new users towards installation methods we plan to support long term, and discourage the use of those that are being phased out.

Even though they are being deprecated, we are committing to support them for a further six months (until release 2025.12), giving existing users time to migrate to Home Assistant OS or Container. During this time we will ensure these installation types keep functioning as normal during the deprecation period. However, after those six months have elapsed, these methods will become unsupported, which means issue reports will no longer be accepted. As these installation methods are used for the development of Home Assistant, it will still be technically possible to update them. We still would recommend migrating to a supported method, but that's your choice.

As i386, armhf, and armv7 architectures have also been deprecated, we are currently removing references to them from our documentation. More importantly, they will also be subject to a six-month support window. After that support ends (from release 2025.12 onwards), we will no longer build or release distributions or containers targeting these platforms. This will mean that in six months' time, there will be no more updates for these systems, and if users encounter issues, they will no longer be able to ask for support from Home Assistant maintainers.

## Why we made this decision

### Core and Supervised

<p class='img'><img src='/images/blog/2025-05-deprecation/analytics.png' alt="OS and Container represent the vast majority of installation methods">From our <a href="https://analytics.home-assistant.io/">opt-in analytics</a></p>

The Core and Supervised installation methods are not only complex for users to install and maintain --- they're also challenging for the Home Assistant team to support. In the past, there were compelling reasons, outside Home Assistant development, to run these installation methods, but for most people those reasons are disappearing. Home Assistant OS is very capable with a rich ecosystem of add-ons, while also being easy to run in a virtual machine. Container adoption has become mainstream, now being widely available along with systems having more resources to run them. Steadily, we've seen year-on-year reductions in the percentage of Core and Supervised installations (currently standing at 2.5% and 3.3% respectively).

As Core and Supervised are more complex to maintain, they generate more issues that are more difficult to solve. This complexity places a disproportionate burden on our community-driven support system, where volunteers generously give their time to help others. It also takes time away from assisting the vast majority of users who are on the simpler to maintain installation methods. Along with this, new users could sometimes be swayed into running Core or Supervised, and have a bad experience that could cause them to give up on the best way to automate their home. By focusing our support and documentation on OS and Container methods, we can greatly improve the onboarding experience and ensure a smoother start for new users.

### Legacy 32-bit architectures

Though Home Assistant is very lean and can run great on older or low-spec hardware, the architectures we're deprecating are definitely on the leaner side of the spectrum. That probably explains why we see such low usage figures, with i386 and armhf architectures representing less than 0.5% of installations each, and armv7 at only 0.95% of installations. More than half of Home Assistant systems using armv7 have hardware that is capable of running 64-bit operating systems, like Raspberry Pi 3 and 4. This hardware can actually upgrade and migrate to a supported 64-bit version of our Home Assistant Operating System

The broader software and hardware industries have also shifted away from these older 32-bit systems. Most have adopted 64-bit architectures such as amd64 and aarch64, and we are seeing more projects we depend on no longer supporting these 32-bit architectures. There have already been several instances where keeping support for these architectures has held back the development of new features.

## Your feedback

For any major change, it is our goal to make sure the community guides this decision-making. When our maintainers initially proposed these deprecations, we shared this plan with the community (in our forum, GitHub, Discord, Reddit, and other social channels), using it to gather feedback. It was a constructive, civil discussion, and we learned a couple of interesting things that have helped us move this decision forward.

First, our current wording is confusing to the community. Core and Supervisor are components of Home Assistant OS, but are also similar---or the same---as the names of installation methods, which is not super clear for new users. We also found these installation methods being used in ways we never expected, and there are a good number of people who were already running Home Assistant in custom and unsupported ways, not even realizing they were unsupported.

Many of those impacted asked for better guidance on how to migrate. A good number were unaware of our expansion of backup and restore features to all installation methods, significantly smoothing their transition to a new platform.

## Check if you're affected

<p class='img'><img src='/images/blog/2025-05-deprecation/system-information.png' alt="what the system information dialog looks like">The blue arrow shows your installation type, and the red arrow displays the architecture.</p>

If you are unsure which **installation method** you are running:

- Select [this link](https://my.home-assistant.io/redirect/system_health/) OR Navigate to ***Settings > System > Repairs***, select the three-dotted menu in the top right corner, and select ***System information***.
- Check the Installation type field. If you are running Home Assistant OS, or Container, you are fine as the installation method deprecation doesn't apply to you.

In this [same window](https://my.home-assistant.io/redirect/system_health/), you can find the **architecture** as well:

- The CPU architecture field will tell you exactly which architecture you are using. If you are seeing aarch64 or x86_64 here, you are fine as the architecture deprecation doesn't apply to you.

## How to migrate

<p class='img'><img src='/images/blog/2025-05-deprecation/methods.png' alt="Installation methods and their functionality">Green are staying, and red are deprecated.</p>

If it's been a while since you've migrated Home Assistant systems, a lot has improved over the past several years. Switching systems is as easy as [making a backup](/common-tasks/general/#backups), downloading it, and [restoring](/common-tasks/general/#restoring-a-backup) it during the initialization of your new system (Home Assistant Cloud subscribers using off-site backups can restore [with just their password](/blog/2025/04/02/release-20254/#onboarding-with-a-home-assistant-cloud-backup)). Every Home Assistant installation method now has backups, and you can restore backups from any method onto another regardless of the differences in architecture. In many cases, very little needs to be done once the restore is successful ([to the dismay of tinkerers online](https://www.reddit.com/r/homeassistant/comments/1kdip17/are_you_kidding_me/)). Our documentation has a full list of guides on [how to install Home Assistant on different hardware](/installation/).

Before you think about migrating to a different installation method, you can always choose to stick with what you have. Just because it becomes unsupported by the Home Assistant project, it doesn't mean you can't keep running it like you do today. That choice is up to you.

| Need                                       | Currently using | Migrate to                                                                 |
| ------------------------------------------ | --------------- | -------------------------------------------------------------------------- |
| Home Assistant with add-ons                | Supervised      | Home Assistant OS                                                          |
| A system without Home Assistant OS support | Supervised      | Container (many add-ons can be run as containers alongside Home Assistant) |
| Full control of the host system            | Supervised      | Run Home Assistant OS in a VM, or Container (alongside add-on containers)  |
| Lightweight solution                       | Core            | Container |

For **Home Assistant Core** users, the closest alternative is Home Assistant Container, which is most commonly used with Docker. If you can dedicate a device exclusively to Home Assistant, the recommended installation method is Home Assistant OS, which gives an appliance-like setup.

For **Home Assistant Supervised** users, we recommend migrating to Home Assistant OS---it supports everything Supervised does, including add-ons. If you want more control over the OS, you can also run Home Assistant OS in a virtual machine, like with Proxmox, or go the Home Assistant Container path alternatively.

For **deprecated architectures**, there is generally no supported migration path using your existing hardware. You will therefore need to find alternative hardware compatible with Home Assistant OS or Container. Second-hand single-board computers and recycled small-form-factor office machines are affordable and sustainable options. In some cases, your system may be running a 32-bit operating system, but is capable of running a 64-bit one (Raspberry Pi 3 and 4 are examples of systems often running a 32-bit OS despite being capable of running 64-bit). In this case, you will need to install a 64-bit capable operating system and restore Home Assistant on that system.

## Frequently asked questions

- ***If Home Assistant Core is used for development, and part of the developer docs, why not just offer it to end-users?***\
  This is not just about technical viability, it is also about helping and supporting people with their issues, problems, and questions, in our forums and chat. Having these options available to less technical people leads to support queries, and if they have a bad first experience that reflects poorly on the project. Users are free to continue running their systems the way they would like.

- ***No support for Core or Supervised---can I still use them?***\
  You can still use them even if we no longer support them. There are many users running Home Assistant in all kinds of unofficial ways. This change just means we are removing it from our end-user documentation and will no longer recommend using these installation methods from an official standpoint.

- ***Will the developer documentation on these things remain?***\
  Yes, those will remain. The developer documentation for running Home Assistant's Core Python application directly in a Python virtual environment will remain. This is how we develop. This proposal is about removing end-user documentation and support.

- ***Can I start maintaining these installation methods?***\
  While maintaining these methods will require effort, the community is free to move documentation and code to new independent projects. Our maintainers will no longer accept issues or provide end-user documentation, but that shouldn't stop anyone passionate about them from continuing to run them, or helping others to do the same.

- ***Can I reproduce any of the installations you offer?***\
  Yes, of course! All our pipelines are open source and transparent, you can always recreate any of our pipelines and release artifacts; either automated or manual.

- ***Is this the first step towards making Home Assistant closed source/proprietary/commercial?***\
  No, that is impossible. Home Assistant will always remain open source. Home Assistant is owned by the [Open Home Foundation](https://www.openhomefoundation.org/), a Swiss non-profit foundation that is audited and governed, and---by law---bound by its mission. This means it will always be open source and cannot be bought or sold.
