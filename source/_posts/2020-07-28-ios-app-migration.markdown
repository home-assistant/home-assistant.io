---
title: "Migrating the iOS Companion App to Nabu Casa"
description: "Overview of why we are changing the app's author and what you need to do"
date: 2020-07-28 00:00:00
date_formatted: "July 28, 2020"
comments: false
author: Robbie Trencheny
author_twitter: robbie
categories: Announcements
og_image: /images/blog/2020-07-28-ios-app-migration/social-update.png
---

Hi there, your friend and pal, Robbie the iOS developer here with an important update about a change to the Home Assistant Companion App for iOS and a few steps you, the user, will need to take.

## What's changing?

Recently, I transferred the Home Assistant app from my personal Apple Developer account to a new Apple Developer account owned by Nabu Casa, Inc. Why? Because Apple has silly limits on individual accounts that have made collaboration with others near impossible for the entire lifespan of the app (please don’t tell Tim or Craig I called their limits silly). This meant that during times when my work or personal life have been very busy, app updates have been far less frequent than I wanted. These limits also make it such that, if I were to be hit by a bus tomorrow, the app couldn't be easily updated on the App Store by others. The business account does not have these limits. Anyone on the account can update the app anytime without relying on me, Robbie, to push buttons. This will make collaboration easier and ensure the app will be available forever and ever, long after I’m gone.

## Why Nabu Casa?

Why did we transfer it to Nabu Casa, Inc.? Why not Home Assistant, Inc.? The short answer is there is no Home Assistant, Inc. Apple requires that business accounts are owned by… businesses. Real businesses. Which Home Assistant is not. Nabu Casa was the best option. To be very clear, Nabu Casa does not own the app now. The copyright and license has not changed. It’s still entirely open source. I am not stopping my work on the app, neither are others. Nabu Casa is simply the account under which the app is published. The same rock solid privacy guarantees apply just as before. The only change visible to you will be the name shown as the author in the App Store (Nabu Casa, Inc instead of Robert Trencheny).

## Does this mean there will be a charge for the app?

No.

## What do you need to do?

Right now, we are waiting for Apple to approve the entitlement to send [Critical Notifications](https://companion.home-assistant.io/docs/notifications/critical-notifications) for the new account. When that is done we will release an update (version 2020.5) from the new business account. Due to Apple limits, after updating you are going to need to re-authenticate one time to continue using the app. After that (assuming everything works) you are all done and the app will keep functioning as normal. No integration changes, no push notification changes, your actions are still there, etc etc. Remember that depending on your device settings, this update may well happen automatically, that's why we're telling you all about this in advance.

## When is this happening?

We're not quite sure about this sadly, currently we don't expect it to be before August 10th. As I mentioned, we are waiting for the new business account to be granted the critical notification entitlement. The time frame for this is entirely governed by Apple and beyond our control. We will be sure to keep you updated via [Twitter](https://twitter.com/home_assistant) and [Facebook](https://www.facebook.com/homeassistantio) so make sure you follow us! The current version of the app will also send a push notification closer to the time. We are currently working with our awesome team of translators to get this translated along with the in-app instructions that will be included in the 2020.5 update.

Thanks as always for being a Home Assistant Companion user. Please leave a review if you appreciate the app, it’s the fuel that keeps the fire burning.