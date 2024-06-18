---
layout: post
title: "Security Disclosure 2: vulnerabilities in custom integrations HACS, Font Awesome and others"
description: "Update your Home Assistant instance as soon as possible."
date: 2021-01-23 00:00:00
date_formatted: "January 23, 2021"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Public-Service-Announcement
og_image: /images/blog/2021-01-security-disclosure2/social.png
---

![Attention please read](/images/blog/2021-01-security-disclosure2/social.png)

This blog looks pretty much the same [as the security disclosure of yesterday](/blog/2021/01/22/security-disclosure/). However, **it is a new disclosure**, affecting a similar issue. We want to make sure the information is complete.

<em>This is a disclosure about security vulnerabilities found in <b>3rd party custom integrations</b>. Custom integrations are not created and/or maintained by Home Assistant. Users install them at their own risk. We want to inform you about these because the found vulnerabilities impact the security of your Home Assistant instance.</em>

<em>If you do not use custom integrations, your Home Assistant is not vulnerable. If you do use custom integrations, your instance might be vulnerable if you use one of the impacted integrations.</em>

TL;DR:

- Multiple custom integrations were found that allowed an attacker to steal any file without logging in. Previously implemented fixes were not sufficient.
- Upgrade Home Assistant as soon as possible. Home Assistant Core **2021.1.5** added mitigation to prevent the issue from happening.
- Upgrade the custom integrations to a fixed version or remove them from your installation.
- If you have used any of the custom integrations with a known vulnerability, we recommend that you update your credentials.

On the morning of Saturday, January 23 2021, the Home Assistant project was informed by security researcher Nathan Brady about a security vulnerability. It provided more insight on the implementation of the fixes done for the [previous security vulnerability](/blog/2021/01/22/security-disclosure/). We learned that not all custom integrations that implement security patches are sufficient to deflect the problem.

We verified all fixes made to custom integrations that were found to be vulnerable in the previous security disclosure. The conclusion is that some custom integrations are still vulnerable to a directory traversal attack while not being authenticated with Home Assistant. It allows an attacker to access any file without having to log in. This access includes any credentials that you might have stored to allow Home Assistant to access other services.

We have responsibly disclosed these issues to the authors of those custom integrations and worked with them on fixing their integrations.

The following have been found:

- [Home Assistant Community Store](https://github.com/hacs/integration) (HACS) -- fixed in **1.10.1**
- [Font Awesome](https://github.com/thomasloven/hass-fontawesome) -- fixed in **1.3.1**
- [BWAlarm (ak74 edition)](https://github.com/akasma74/Hass-Custom-Alarm) -- fixed in **1.12.9**
- [Simple Icons](https://github.com/vigonotion/hass-simpleicons) -- fixed in **1.11.0**

Please make sure to also read the [previous security disclosure](/blog/2021/01/22/security-disclosure/). While this specific security vulnerability might not impact them, you might be impacted by the previously found vulnerability.

Besides working with the custom integration authors, the following actions have been taken to help protect users:

- Home Assistant released Home Assistant Core **2021.1.5** with extra protection to stop directory traversal attacks before reaching the vulnerable code. This prevents the abuse of all found vulnerabilities.
- This security disclosure is shared widely and linked from banners on the Home Assistant website and forums.
- The Home Assistant Supervisor will notify the user when a possible insecure installation is found that uses custom integrations.
- The Android & iOS Apps are updated to notify the user if their Home Assistant instance is potentially insecure.
- Nabu Casa updated their feature to limit remote access via Home Assistant Cloud and block instances that run an insecure Home Assistant Core version.
- An alert has been placed at [alerts.home-assistant.io](https://alerts.home-assistant.io).

Alright, so here we are, a day after our first major security disclosure, disclosing a second one. Surely it is not fun, but we are thankful it got reported responsibly to us. This time we were able to move quickly and got everything updated pretty fast. Therefore, we decided to disclose all information immediately.

I want to emphasize that it's not allowed to personally harass/attack/insult the developers of these custom integrations. That would be a violation of our Code of Conduct and we will enforce this.

Paulus

## FAQ

---

### Has this vulnerability been abused?

We don't know.
