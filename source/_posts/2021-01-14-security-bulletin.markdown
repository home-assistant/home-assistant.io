---
layout: post
title: "Security Bulletin"
description: "Update your Home Assistant instance as soon as possible."
date: 2021-01-14 00:00:00
date_formatted: "January 14, 2021"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Public-Service-Announcement
og_image: /images/blog/2021-01-security-bulletin/social.png
---

![Attention please read](/images/blog/2021-01-security-bulletin/social.png)

It has come to our attention that certain custom integrations have security issues and could potentially leak sensitive information. Home Assistant is not responsible for custom integrations and you use custom integrations at your own risk.

The latest version of Home Assistant Core has extra protection to help secure your instance.

**Update your Home Assistant instance as soon as possible.**

To update Home Assistant, click on the Supervisor menu item to see if an update to 2021.1.3 (or newer) is available. If you don’t have the Supervisor menu item, follow the [update instructions](/docs/installation/updating/). Home Assistant 2021.1.3 is still compatible with Python 3.7 and an upgrade is possible.

**If you cannot update Home Assistant at this time, we strongly advise you to disable all custom integrations.** You can disable your custom integrations by renaming the `custom_components` folder inside your Home Assistant configuration folder to something else. Please be sure to restart Home Assistant after you’ve renamed it.

If you need additional help with upgrading, we are happy to help you out on our [Discord chat](/join-chat/) server.

We will provide more details about impacted custom integrations in the future.

Paulus

**Edit: 15 January 2021**: Blog post updated to state 2021.1.3, which added some additional checks.

**Edit: 16 January 2021**: Blog post updated to remove supervisor reload instructions, as latest version is now generally available. Added note that Python 3.7 is still supported.

**Edit: 22 January 2021**: More details are now available in the [disclosure post](/blog/2021/01/22/security-disclosure/).

**Edit: 23 January 2021**: Additional security vulnerabilities disclosed in this [second disclosure post](/blog/2021/01/23/security-disclosure2/).
