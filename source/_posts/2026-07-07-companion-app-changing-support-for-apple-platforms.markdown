---
layout: post
title: "Companion app: Changing support for Apple platforms"
description: "To build a stronger Companion app for everyone, we’re discontinuing support for iOS 15, watchOS 8, and macOS 11. Read on for all the details."
date: 2026-07-07 00:00:00
date_formatted: "July 7, 2026"
author: Bruno Pantaleão
categories: Announcements
og_image: /images/blog/2026-07-companion-app-changing-support-for-apple-platforms/art.webp
---

<img src="/images/blog/2026-07-companion-app-changing-support-for-apple-platforms/art.webp" alt="Companion app: Changing support for Apple platforms" style="border: 0;box-shadow: none;">

We’re updating which Apple platforms the <a href="https://apps.apple.com/us/app/home-assistant/id1099568401" target="_blank" rel="noopener noreferrer">Home Assistant Companion app</a> supports, and because transparency is core to how we work, we want to be upfront about what’s changing.

Starting with version 2026.8.0 of the Companion app, we will no longer support iOS 15, watchOS 8, or macOS 11. The last supported version for these platforms will be 2026.7.1.

<!--more-->

Here’s everything you need to know:

## Why we’re making the change

At Home Assistant, we’re committed to helping you use your devices for the long haul. We know your hardware is something you rely on every day, which is why we try to keep the Companion app running on older devices for as long as possible. However, supporting older OS versions indefinitely comes at a cost, limiting our ability to adapt to modern technology.

From September this year, <a href="https://developer.apple.com/xcode/system-requirements/" target="_blank" rel="noopener noreferrer">Apple’s developer tools</a> will officially stop supporting watchOS 8 and macOS 11, making it technically difficult for us to keep building for them. With less than 1% of our users currently running these older OS versions, this update allows us to future-proof the Companion app for the vast majority of our community.

By focusing our efforts on current operating system versions, we can keep our codebase maintainable for the long term. This shift removes some long-standing constraints, since older OS versions had been limiting our ability to make UX, stability, and performance improvements, including adding features such as Apple Watch complications and more advanced widgets.

## What this means for you

A recap of what’s changing:

- The last Companion app update for these platforms will be version 2026.7.1.
- After version 2026.7.1, the minimum supported versions for the Companion app will be iOS 16.4, watchOS 9, and macOS 12.

Importantly, this _doesn’t mean_ your older iOS devices will become unusable. You can still control your home using the Home Assistant frontend in your device’s web browser, which remains fully supported and receives regular monthly updates.

The last compatible Companion app version (2026.7.1) will also remain available on the App Store, and the <a href="https://github.com/home-assistant/iOS" target="_blank" rel="noopener noreferrer">source code</a> will stay accessible on GitHub for any users who want to compile the app themselves.

## Looking ahead

This update means a stronger, more capable Companion app for everyone going forward, and it’s part of how we keep Home Assistant evolving. We appreciate your understanding and support through this change, and are looking forward to building what’s next.
