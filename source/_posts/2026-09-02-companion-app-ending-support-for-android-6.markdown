---
layout: post
title: "Companion app: Ending support for Android 6.0"
description: "To keep building a stronger Companion app for Android, we’re ending support for Android 6.0. Read on for all the details."
date: 2026-09-02 00:00:00
date_formatted: "September 2, 2026"
author: Timothy Nibeaudeau
categories: Announcements
---

To build a better [Home Assistant Companion app](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) for everyone, we’re updating which Android versions the app supports. Openness is core to how we operate, so we want to be clear about what’s changing and what it means for users.

Starting with version 2026.9.0 of the Companion app, we will no longer support Android 6.0. The last supported version for Android 6.0 will be 2026.8.4.
Here’s everything you need to know:

## Why we’re making the change

Helping you use your device for the long run is a commitment we take seriously. Home Assistant should continue to work on the phone or tablet you already own, which is why we try to keep the Companion app running on older Android versions for as long as we can. But every so often, the tools we build with change their requirements, and we have to change with them.

The Companion app is built on [Jetpack](https://developer.android.com/jetpack), Google’s collection of core Android libraries. Google is raising the minimum requirement for many of those libraries from Android 6.0 (API 23, released in 2015) to Android 7.0 (API 24, released in 2016). We depend heavily on Jetpack libraries, and continuing to support Android 6.0 would mean staying on older versions and missing out on the fixes, features, and security updates in newer versions. This is the same reason we [ended support for Android 5.0 and 5.1](/blog/2025/07/23/companion-app-for-android/) last year.

Using Android 7.0 as our minimum requirement still reaches 99.2% of active Android devices worldwide, according to Google's device distribution data. Among our Companion app users, approximately 650 of 1.6 million monthly active devices (0.04%) run Android 6.0. Making this change allows us to keep the app up to date for the vast majority of our user base.

## What this means for you

Here's an overview of what’s changing:

- The last Companion app update for Android 6.0 will be version 2026.8.4.
- From version 2026.9.0 onward, the minimum supported version will be Android 7.0.

This _doesn’t mean_ your Android 6.0 device will stop working. The Companion app will stay installed and continue functioning as usual – it simply won’t receive new updates.

The last compatible version (2026.8.4) will remain available on the Play Store, and the [source code](https://github.com/home-assistant/android) will stay accessible on GitHub for anyone who wants to build the app themselves.

## Looking ahead

Changes like this ensure the Companion app stays fast and capable for everyone going forward. None of this work would be possible without your support, and we appreciate your understanding as we continue to evolve Home Assistant together. We look forward to what’s ahead.
