---
layout: post
title: "Disclosure: security vulnerabilities in custom integrations HACS, Dwains Dashboard, Font Awesome and others"
description: "Update your Home Assistant instance as soon as possible."
date: 2021-01-22 00:00:00
date_formatted: "January 22, 2021"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Public-Service-Announcement
og_image: /images/blog/2021-01-security-disclosure/social.png
---

![Attention please read](/images/blog/2021-01-security-disclosure/social.png)

<em>This is a disclosure about security vulnerabilities found in <b>3rd party custom integrations</b>. Custom integrations are not created and/or maintained by Home Assistant. Users install them at their own risk. We want to inform you about these because the found vulnerabilities impact the security of your Home Assistant instance.</em>

<em>If you do not use custom integrations, your Home Assistant is not vulnerable. If you do use custom integrations, your instance might be vulnerable if you use one of the impacted integrations.</em>

TL;DR:

- Multiple custom integrations were found that allowed an attacker to steal any file without logging in.
- Upgrade Home Assistant as soon as possible. Home Assistant Core 2021.1.3 added extra protections that stops attackers from reaching the vulnerable code in custom integrations.
- Upgrade the custom integrations to a fixed version or remove them from your installation.
- If you have used any of the custom integrations with a known vulnerability, we recommend that you update your credentials.

On the morning of Thursday, January 14 2021, the custom integration Home Assistant Community Store (HACS) project was informed by [security researcher Oriel Goel](https://www.linkedin.com/in/oriel-goel/) about a security vulnerability. It was vulnerable to a directory traversal attack via an unauthenticated webview, allowing an attacker to access any file that is accessible by the Home Assistant process. This access includes any credential that you might have stored to allow Home Assistant to access other services.

We started to research what other custom integrations could be impacted and found several more. We have responsibly disclosed these issues to the authors of those custom integrations and worked with them on fixing their integrations.

The following have been found:

- [Home Assistant Community Store](https://github.com/hacs/integration) (HACS) -- fixed in 1.10.0
- [Dwains Lovelace Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard) -- fixed in 2.0.1
- [Font Awesome](https://github.com/thomasloven/hass-fontawesome) -- fixed in 1.3.0
- [BWAlarm (ak74 edition)](https://github.com/akasma74/Hass-Custom-Alarm) -- fixed in 1.12.8
- [Simple Icons](https://github.com/vigonotion/hass-simpleicons) -- fixed in 1.10.0
- [Custom Updater](https://github.com/custom-components/custom_updater/) (deprecated) -- fixed in latest commit

We haven't been able to get in touch with the authors of the following integration. You should remove this custom integration as soon as possible:

- [Custom icons](https://github.com/Armaell/home-assistant-custom-icons-loader) -- not fixed

The following integration was discovered to be vulnerable to a variant of the above security vulnerability. It allows for a directory traversal attack but requires the attacker to be authenticated. We have been unable to reach the author:

- [Hass-album](https://github.com/yunsean/hass-album/) -- not fixed

If you have used any of these custom integrations, we recommend that you update your credentials.

Besides working with the custom integration authors, the following actions have been taken to help protect users:

- Home Assistant released Home Assistant Core 2021.1.3 with extra protection to stop directory traversal attacks before reaching the vulnerable code. This prevents the abuse of all found vulnerabilities.
- Home Assistant published a [security bulletin](https://www.home-assistant.io/blog/2021/01/14/security-bulletin/) strongly urging people to upgrade their Home Assistant instance. This bulletin has been shared widely and linked from banners on the Home Assistant website and forums.
- The Home Assistant Supervisor will notify the user when a possible insecure installation is found that uses custom integrations.
- The Home Assistant Companion apps for Android and iOS have been updated to notify the user if their Home Assistant instance is potentially insecure.
- Nabu Casa emailed the security bulletin to all Home Assistant Cloud subscribers and users on trial.
- Nabu Casa activated their feature to [limit remote access](https://www.nabucasa.com/config/remote/#insecure-versions) via Home Assistant Cloud and block instances that run an insecure version of Home Assistant.

Look. It sucks that this happened. The custom integrations we have listed are all open source, maintained by volunteers in their spare time. They often work alone on this and that's why it's more likely for a bug to go undetected. But more eyes doesn't guarantee bug-free software either. From time to time, such things will happen to every piece of software.

I want to emphasize that it's not allowed to personally harass/attack/insult the developers of these custom integrations. That would be a violation of our Code of Conduct and we will enforce this.

As Home Assistant, we could have done more to prepare for this scenario. We are currently exploring adding new opt-in features for users to be notified and allow Home Assistant to take action preemptively to patch vulnerabilities.

Paulus

**Edit: 23 January 2021**: Additional security vulnerabilities disclosed in this [second disclosure post](/blog/2021/01/23/security-disclosure2/).

## FAQ

---

### Why didn't you release the names of the custom integrations in the first security bulletin?

When we discovered the issues, we disclosed them to the authors of the affected custom integrations and gave them time to fix the problem and release a new version. This is a good and common practice when disclosing security vulnerabilities.

Since some of these custom integrations are quite popular, we also decided to publish a security bulletin to urge Home Assistant users to upgrade their instances. We made sure to include enough information for users to resolve the vulnerability.

### Has this vulnerability been abused?

We don't know.
