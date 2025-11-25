---
layout: post
title: "Disclosure: Supervisor security vulnerability"
description: "Disclosure of a security vulnerability found impacting installations using the Home Assistant Supervisor."
date: 2023-03-08 00:00:00
date_formatted: "March 08, 2023"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Public-Service-Announcement
og_image: /images/blog/2023-03-supervisor-security-disclosure/social.png
---

![Attention please read](/images/blog/2023-03-supervisor-security-disclosure/social.png)

We were made aware of a security issue impacting installations using
the Home Assistant Supervisor. A fix for this security issue has been rolled
out to all affected Home Assistant users via the Supervisor auto-update system
and this issue is no longer present.

You can verify that you received the update on the {% my info title="Home Assistant About page" %}
and verify that you are running Supervisor 2023.03.1 or later. If you do not
see a Supervisor version on your About page, you do not use one of the affected
installation types and have not been vulnerable.

The issue has also been mitigated in Home Assistant 2023.3.0. This version
was released on March 1 and has since been installed by [33% of our users][analytics].

[analytics]: https://analytics.home-assistant.io/

## Affected version

The security issue affected installation types Home Assistant OS and
Home Assistant Supervised. This includes installations running on the
Home Assistant Blue and Home Assistant Yellow.

The two other installation types, Home Assistant Container (Docker) and
Home Assistant Core (own Python environment), have not been affected.

## Credits

The security issue was found by [Joseph Surin] from [elttam]. Many thanks for bringing this to our attention.

[Joseph Surin]: https://jsur.in
[elttam]: https://www.elttam.com/

## About the issue

The Supervisor is an application that is part of Home Assistant OS
and Home Assistant Supervised installations and is responsible for
system management. The issue allowed an attacker to remotely bypass
authentication and interact directly with the Supervisor API. This gives
an attacker access to install Home Assistant updates and manage add-ons
and backups. Our analysis shows that this issue has been in Home Assistant
since the introduction of the Supervisor in 2017.

We have published [security advisory CVE-2023-27482 on GitHub][advisory].

[advisory]: https://github.com/home-assistant/core/security/advisories/GHSA-2j8f-h4mr-qr25

## FAQ

---

### Has this vulnerability been abused?

We don’t know. We have not heard any reports of people being hacked.

### Is there a workaround?

In case one is not able to upgrade the Home Assistant Supervisor or the
Home Assistant Core application at this time, it is advised to not expose
your Home Assistant instance to the internet.
