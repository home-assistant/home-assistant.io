---
layout: page
title: "Multi-factor authentication"
description: "Guide on configuring different multi-factor authentication providers."
date: 2018-08-23 09:40
redirect_from: /components/auth/
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='note warning'>
This is an advanced feature. If misconfigured, you will not be able to access Home Assistant anymore!
</p>

Besides the normal authentication providers, it's also possible to configure multi-factor authentication providers. These authentication providers will require the user to solve a second challenge besides just logging in. The idea is that you ask the user for something they know, their username/password, and something they have, like a time-based authentication token from their phone.

This feature is currently a work in progress and no configurable multi-factor authentication providers are currently available.
