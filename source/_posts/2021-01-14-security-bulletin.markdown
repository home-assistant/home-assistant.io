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

To update Home Assistant, click on the Supervisor menu item to see if an update to 2021.1.3 (or newer) is available. If you do not see such an update yet, in the Supervisor, click on the System tab and click the “Reload” button at the bottom of the Supervisor card. After reloading the update should become available.

If you don’t have the Supervisor menu item, follow the [update instructions](/docs/installation/updating/).

**If you cannot update Home Assistant at this time, we strongly advise you to disable all custom integrations.** You can disable your custom integrations by renaming the `custom_components` folder inside your Home Assistant configuration folder to something else. Please be sure to restart Home Assistant after you’ve renamed it.

If you need additional help with upgrading, we are happy to help you out on our [Discord chat](/join-chat/) server.

Paulus

**Edit: 15 January 2021**: Blog post updated to state 2021.1.3, which added some additional check.
