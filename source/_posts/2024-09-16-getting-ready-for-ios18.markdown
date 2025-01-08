---
layout: post
title: "Companion App for iOS 2024.9: Getting ready for iOS 18"
description: "New control center widgets and Apple Watch configuration."
date: 2024-09-16 00:00:02
date_formatted: "Sep 16, 2024"
author: Bruno Pantaleão
comments: true
categories: iOS Release-Notes
og_image: /images/blog/2024-09-16/ios-og.jpg
---
![Companion App for iOS 2024.9](/images/blog/2024-09-16/ios-og.jpg)

Bruno here once again to bring you a bunch of news on your favorite iOS App 😉. In this release, we are introducing some new features to complement the release of iOS 18, along with a new way to configure your Home Assistant Apple Watch app.

<!--more-->

## Dark and tinted app icons

Within the iOS update rolling out today, Apple has introduced home screen customization for app icons. This includes a new dark mode variant and a tinted option where the user can choose an accent color for the icon. Of course Home Assistant joined the party.

<p class='img'><img src='/images/blog/2024-09-16/new-icons.png' style='border: 0;box-shadow: none;' alt="Dark and tinted variants are available for the main App Icon and some custom icons">Dark and tinted variants are available for the main App Icon and some custom icons</p>

## Control Center

The new iOS also brings a new level of customization to Control Center, for which we are introducing five new controls: Assist, Toggle light, Run script, Activate scene, and Open page.

![iOS 18 Control center options](/images/blog/2024-09-16/control-center.jpg)

With these options, you can use Home Assistant capabilities even faster, from asking Assist a question to running a complete script flow.

These controls are also available to be used with the Action button on iPhone 15 Pro and 16 series. In the [previous release blog](/blog/2024/05/22/companion-app-for-ios-20245-assist/), we discussed that this was a great way to access Assist, in a very similar way to how you trigger Siri with the power button. Well, this release speeds this up significantly by no longer using shortcuts. Just check out the difference.

<p class='img'><lite-youtube videoid="v7NXQJMUK2c" videotitle="Comparing Assist launch from Shortcuts and iOS 18 Control"></lite-youtube>Assist opening on iOS 18 control (right) compared to from shortcuts (left)</p>

## New Apple Watch configuration

For a long time, our Watch app was only able to display [Home Assistant’s built-in iOS Actions](https://companion.home-assistant.io/docs/core/actions/). With this release, you will be able to display scripts, scenes, iOS Actions, and more to come in the future. After updating, open the iOS App and go to companion app settings to find a new Apple Watch configuration screen where you can choose which items to display, their order, and customize the look.

A really useful customization is the **Require confirmation** option, which will prompt you with a confirmation popup before running the item. This will be very helpful if you, like me, have bad aim and accidentally open your garage door instead of turning on your TV.

![New Apple Watch configuration](/images/blog/2024-09-16/watch.png)

## Other noteworthy changes

- We’re introducing new sensors, including Apple Watch battery level and state, app version, and location permission category.
- A new Scripts home screen widget.
- We’re working on adding Assist to the Apple Watch, try it out today, but be aware it's still in beta.
- Several bug fixes are included in this version,
	- Preventing widgets not working on iOS 15/16.
	- Allowing Watch LTE to run actions while far away from your iPhone (requires location permissions being enabled).
	- Fixing the black status bar when running older versions of Core.
	- Addressing gauge and details lock screen widgets crashing.

## Need help? Join the community! 
Home Assistant has a great community of users who are all more than willing to help each other out. So, join us!

Our very active [Discord chat server](https://www.home-assistant.io/join-chat) is an excellent place to be at, and don’t forget to join our amazing [forums](https://community.home-assistant.io/).

Found a bug or issue? Please report it in our [issue tracker](https://github.com/home-assistant/iOS/issues), to get it fixed! Or, check[ our help page](https://www.home-assistant.io/help) for guidance for more places you can go.
