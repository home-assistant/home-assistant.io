---
layout: post
title: "Disabling new login page functionality"
description: "Why we are removing the redesigned login page introduced in release 2023.12 in patch 2023.12.3."
date: 2023-12-14 00:00:00
date_formatted: "December 14, 2023"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Public-Service-Announcement
---

In [release 2023.12](https://www.home-assistant.io/blog/2023/12/06/release-202312/) we added a redesigned login page to Home Assistant. It detects when you are accessing Home Assistant via your local home network, and if so, presents a redesigned login experience that shows your user profiles. If you access Home Assistant from outside your home network, the login page still asks for your username and password, like before.

We have heard the concerns from the community that this functionality can open up your Home Assistant instance to a user enumeration attack from within the local network. A malicious actor with access to your local network could get the names and pictures of all Home Assistant users. They could use this information to make attacking your Home Assistant instance easier.

A security issue was filed for this on December 10, we have accepted and published the corresponding [GitHub Security Advisory](https://github.com/home-assistant/core/security/advisories/GHSA-jqpc-rc7g-vf83), and have disabled the redesigned login page functionality in patch 2023.12.3 released on December 14.

While researching the feedback we received, we were troubled to discover that the users who experienced problems with the new login page often used misconfigured reverse proxies. When the reverse proxy is not configured correctly, Home Assistant is no longer able to discern between traffic from your local home network or a public network. These users would see the redesigned login page when accessing Home Assistant from outside their home network.

To improve the network security of these users, we are researching how we can use Home Assistant to detect more variations of misconfigured proxies and inform them about it.

We redesigned the login page because we believed the local home network is within the privacy of your own home and a trusted environment for showing the people in it. We assumed that users attempting to log in on the local network are also trusted and allowed to see other user profiles, similar to what Microsoft, Apple, Netflix, and other companies assume in their products.

That said, we do hear you and take your feedback, and the potential security risk to users with misconfigured reverse proxies, seriously. Thank you for bringing this to our attention and being open about your concerns.
