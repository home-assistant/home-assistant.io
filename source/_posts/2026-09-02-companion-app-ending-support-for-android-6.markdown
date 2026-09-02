---
layout: post
title: "Companion app: Ending support for Android 6.0"
description: "To keep building a stronger Companion app for Android, we’re ending support for Android 6.0. Read on for all the details."
date: 2026-09-02 00:00:00
date_formatted: "September 2, 2026"
author: Timothy Nibeaudeau
categories: Announcements
---

We’re updating which Android versions the [Home Assistant Companion app](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) supports, and because transparency is core to how we work, we want to be upfront about what’s changing.

Starting with version 2026.9.0 of the Companion app, we no longer support Android 6.0. The last supported version for Android 6.0 is 2026.8.4.

<!--more-->

Here’s everything you need to know:

## Why we’re making the change

At Home Assistant, we’re committed to helping you use your devices for the long haul. The phone or tablet you already own should keep working, which is why we try to keep the Companion app running on older Android versions for as long as we can. Every so often, though, the tools we build with move on without us.

The app is built on [AndroidX](https://developer.android.com/jetpack/androidx/versions/all-channel), Google’s collection of core Android libraries. Google is raising the minimum requirement for many of those libraries from Android 6.0 (API 23) to Android 7.0 (API 24). We depend on AndroidX heavily, so staying on Android 6.0 would mean freezing on older versions of those libraries and giving up the fixes, features, and security updates that come with them. This is the same reason we [ended support for Android 5.0 and 5.1](/blog/2025/07/23/companion-app-for-android/) last year.

Android 7.0 as our minimum still reaches 99.2% of active Android devices, according to Google’s device distribution data. Leaving Android 6.0 behind also lets us delete a layer of compatibility code that has been quietly holding back improvements to the app.

## What this means for you

A recap of what’s changing:

- The last Companion app update for Android 6.0 is version 2026.8.4.
- From version 2026.9.0 onward, the minimum supported version is Android 7.0, also known as Nougat.

Importantly, this _doesn’t mean_ your Android 6.0 device stops working. The app stays installed and keeps doing what it does today. It simply won’t receive new updates, and the Play Store will keep offering the last compatible version, 2026.8.4, to those devices.

The [source code](https://github.com/home-assistant/android) also stays available on GitHub for anyone who wants to build the app themselves.

## Looking ahead

Dropping an old Android version is never our favorite kind of announcement, but it clears the way for a faster, more capable Companion app for everyone going forward. We appreciate your understanding, and we’re looking forward to building what’s next.
