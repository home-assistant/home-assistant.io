---
layout: post
title: "Security audits of Home Assistant"
description: "Home Assistant hired Cure53 to do a security audit as part of our regular security assessments. You are safe. No authentication bypasses have been found."
date: 2023-10-19 00:00:00
date_formatted: "October 19, 2023"
author: Paulus Schoutsen & Franck Nijhof
comments: true
categories:
  - Announcements
---

_Summary: Home Assistant had two security audits done as part of our regular security assessments. You are safe. No authentication bypasses have been found. We did fix issues related to attackers potentially tricking users to take over their instance. All fixes are included in Home Assistant 2023.9 (released on September 6, 2023) and the latest Home Assistant apps for iOS and Android. Please make sure you’re up-to-date._

Security is very important to us at Home Assistant and Nabu Casa. Being open source makes it easy to let anyone audit our code&mdash;and based on reported issues&mdash;people do. However, you also need to hire people to do an actual security audit to ensure that all the important code has been covered.

Subscribing to [Home Assistant Cloud](https://www.nabucasa.com/) provides funding for the ongoing development and maintenance of Home Assistant, including external security audits. To ensure that our security is top-notch, Nabu Casa hired Cure53 to perform a security audit of critical parts of Home Assistant. [Cure53](https://cure53.de/) is a well-known cybersecurity firm that in the past found vulnerabilities in [Mastodon](https://arstechnica.com/security/2023/07/mastodon-fixes-critical-tootroot-vulnerability-allowing-node-hijacking/) and [Ring products](https://foundation.mozilla.org/en/blog/mozilla-publishes-ring-doorbell-vulnerability-following-amazons-apathy/).

Cure53 found issues in Home Assistant, 3 of which were marked as “critical” severity. The critical issues would allow an attacker to trick users and steal login credentials. All reported issues have been addressed as part of Home Assistant 2023.9, released on September 6, 2023. No authentication bypass issues have been found. According to Cure53’s report:

> The quality of the codebase was impressive on the whole, whilst the architecture and frameworks deployed in all relevant application areas resilient design paradigms in general. Frontend security in particular exhibited ample opportunities for hardening, as compounded by the Critical associated risks identified. Nonetheless, once these have been mitigated, an exemplary security posture will certainly be attainable.

In August, the [GitHub Security Lab](https://securitylab.github.com/) also audited Home Assistant. They found six non-critical issues across Home Assistant Core and our iOS and Android apps. Two of the issues overlapped with Cure53. All reported issues have been fixed and released.

We want to thank both teams for their audits, reported issues, and keeping our users safe 🙏

All found issues have been added to [our security page](/security). This page has been updated to include an ongoing timeline of reported issues, who disclosed it, and a link to the issue report on GitHub.

_If you think you have found a security issue, check out [our security page](/security) on how to report this to Home Assistant._
