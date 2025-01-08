---
layout: post
title: "Companion app for iOS 2023.12: Let’s go!"
description: "Bruno Pantaleão has joined Nabu Casa as an iOS engineer and will work on improving the experience of the Companion App for iOS users. 2023.12 brings us Apple Thread credentials sharing, a new WatchOS icon, a **Select All** scene toggle, and a **What’s New** link."
date: 2023-12-27 00:00:02
date_formatted: "December 27, 2023"
author: Bruno Pantaleão
comments: true
categories: iOS Release-Notes
og_image: /images/blog/2023-12-ios-lets-go/ios-og.png
---

We have good news for those hoping for more features and faster development of the iOS Companion App! I, Bruno Pantaleão, have joined Nabu Casa as an iOS engineer (of course, also working on watchOS, iPadOS, and macOS apps), and am planning to continue the great work done by Robbie Trencheny, Zac West, and the community, giving the iOS app the attention that it deserves. So let’s talk about this month’s 2023.12 release of the app!

![Companion App for iOS 2023.12](/images/blog/2023-12-ios-lets-go/ios-og.png)

<!--more-->

## Apple Thread network credentials sharing

If you have HomePods or Apple TVs and you also have a Thread border router in Home Assistant, you may want to take advantage of Apple’s network to control devices in your home. You can now import your Apple Thread credentials into Home Assistant and then make Apple the preferred Thread network.

![Apple Thread network credentials sharing](/images/blog/2023-12-ios-lets-go/1.png)

## New watchOS App Icon

We updated the Apple Watch App Icon with the new Home Assistant logo.

![New watchOS App Icon](/images/blog/2023-12-ios-lets-go/2.png)

## Toggle all scenes for watchOS

Previously, you would have to disable scenes one by one to hide them on your Apple Watch. If you, like me, have a Philips Hue bridge, you would probably see several auto-generated scenes (like ‘Bathroom concentrate’ and ‘Bathroom Arctic aurora’ below :D ) that are not always relevant to see on your watch. We added a button to quickly toggle between all scenes now in the iOS companion app.

![Toggle all scenes for watchOS](/images/blog/2023-12-ios-lets-go/3.png)

## Keep up with “What’s new” in the App

We have added a **What’s new?** link in companion App settings so you can quickly access the latest App release notes.

![Keep up with Whats new in the App](/images/blog/2023-12-ios-lets-go/4.jpeg)

## Support for iOS 12, 13, and 14 in 2024.01

In the new year, we will do some housecleaning to make sure that the iOS Companion App is prepared for the future. To do so, we will stop supporting iOS 12, 13, and 14 in release 2024.01 of the Companion App. We know our users are repurposing older phones and tablets into dashboards and controls for their homes, which aligns with our focus on sustainability. It's why we try to keep our apps running on older devices for as long as we can.

Currently, less than 1% of our users (according to the App Store analytics provided by users who gave permission to share their data with Apple) are still on these three iOS versions. Supporting them makes the codebase hard to maintain and blocks us from using newer iOS features. This change will make it easier for new contributors to feel comfortable contributing to the iOS codebase, which is also one of my goals. With a more modern codebase, we can give more attention to PRs and help other contributors have everything they need to feel comfortable submitting PRs.

This does not mean your iOS 12, 13, or 14 devices have become unusable. You can still access your Home Assistant using the browser if you have a device that can't update past iOS 12, such as the 2014 iPhone 6 or iPad Mini 3. All other devices currently capable of running iOS 13 or 14 can be updated to iOS 15 or higher and use the new versions of the iOS Companion App. 

## On the roadmap

Wondering what we have on the roadmap for our Apple apps? We’re still working on it, but you can expect further developments to make Home Assistant on the Apple ecosystem more integrated, bringing shared features between iPhone, Apple Watch, iPad, and Mac - and I’m looking forward to getting my hands on Apple Vision Pro and seeing the possibilities it brings to the Open Home. We’re also planning on improvements to Siri shortcuts widgets and as many new sensors as possible. Another feature that is on our radar is Assist; in 2023, we completed the Year of the Voice. Android users benefitted from some extra functions compared to iOS users, and we want to make sure we catch up and bring these features to iPhones as well!