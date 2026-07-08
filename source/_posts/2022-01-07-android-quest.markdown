---
title: "Oculus Quest Meet the Smart Home!"
description: "Automate your home based on how you use your Quest!"
date: 2022-01-07 00:00:00
date_formatted: "January 07, 2022"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2022-01-android-quest/quest_sensors.png
---


![Screenshot of the Android app](/images/blog/2022-01-android/quest_sensors.png)

Hey Everyone! We hope you all had a great new years and holidays spent with the family! This past holiday season had some pretty cool toys going around. Cool toys to us mean more things to tinker with. One of the most popular gifts this year was no doubt the Oculus Quest and to be honest, how could it not be right?

Naturally, working on the Android app some of us wondered how does the app perform on such a device? Well, it actually works pretty well and you can start building automations based on your usage today!

<a href="https://sidequestvr.com/app/6427/home-assistant" style="display:inline-block"><img width="200" class="download-badge" alt="Get it on SideQuest" src="https://sidequestvr.com/assets/images/branding/Get-it-on-SIDEQUEST.png" style='box-shadow:none;border:0'></a>


## Oculus Quest data in Home Assistant

Home Assistant Companion for Quest gives you access in Home Assistant to over 40 data points about your headset. For example, our [interactive sensor] updates as soon as the screen comes on, which means you're wearing the headset. This allows you to make sure your lights are bright enough to play VR.

Ever play on your headset until it dies and then sits around waiting for it to charge up? Using the battery sensors you can get notified when your headset is fully charged and ready to play that next round.

Keep the music on in the background while you are playing? Automate your media player volume level based on whether your Quest microphone is muted.

It is not all about automations either. You can open the Home Assistant interface on your Quest (in 2D) and see who rang the doorbell. You can even talk back if your doorbell supports it!

We are just getting started with things. As usual our users are really good at finding more unique use cases that we didn't even consider. So get your device [set up with Sidequest], [install the app] and start automating today!

![Screenshot of App on Quest](/images/blog/2022-01-android/app_on_quest.png)

<!--more-->

## Hello Sidequest!

Wait Sidequest, what is that? Sidequest is the alternative App Store for the Oculus Quest.

In VR terminology our app is a "2D app". The official Oculus Quest store only recently started allowing 2D apps and we are still working on a version that meets their requirements. So while we are waiting, we wanted to release something so we can get feedback how you are using it to automate things.

The app on Sidequest is the [minimal version] of the Home Assistant Companion Android app. While the Quest runs Android, it doesn't have the Google services. This means no widgets, no shortcuts, and no support for the standard notifications.

## 2022.1 Release for Android

We can't just make a post like this and ignore the new release for the Phone app that just went out the other day without highlighting it right?! While the 2022.1 release may not be as jam-packed as 2021.12 we do still have some neat features to cover.

-  A new sensor to determine if your devices [work profile] is active by [zmarties]. This sensor will update as soon as a state change is detected allowing you to make unique automations based on the profile being active.
-  [dshokouhi] has added a new sensor allowing you to see what the [Last Used App] was. Pair this new sensor with the Quest and you can make specific automations based on what game you are currently playing!

![Screenshot of Last Used App](/images/blog/2022-01-android/last_used_app.png)

-  [jpelgrom] has worked on our WebSocket implementation to finally bring in areas to the app. Device controls are the first feature to get area support so you can easily add entities from areas. The area will also be shown in the device control button itself. Be on the lookout for more area support in other parts of the app as it should make finding entities a lot easier.
-  [JBassett] has also made more progress on the WebSocket implementation by bringing in better error handling to prevent the application from crashing and producing a lot of unnecessary errors.
-  For the Wear OS app [SkechyWolf] has added support for the back button to properly function and exit the app.

A big thank you to all of our contributors and users for bringing in awesome features and great feedback/bugs. We look forward to improving the android app even further in 2022! As always please remember to add your feature requests and bugs to GitHub.

## Changelog

- 2022.1.1 - https://github.com/home-assistant/android/releases/tag/2022.1.1


[zmarties]: https://github.com/zmarties
[dshokouhi]: https://github.com/dshokouhi
[JBassett]: https://github.com/JBassett
[SkechyWolf]: https://github.com/SkechyWolf
[jpelgrom]: https://github.com/jpelgrom
[set up with Sidequest]: https://sidequestvr.com/setup-howto
[install the app]: https://sidequestvr.com/app/6427/home-assistant
[work profile]: https://companion.home-assistant.io/docs/core/sensors#work-profile-sensor
[Last Used App]: https://companion.home-assistant.io/docs/core/sensors#last-used-app-sensor
[minimal version]: https://companion.home-assistant.io/docs/core/android-flavors
[interactive sensor]: https://companion.home-assistant.io/docs/core/sensors#interactive-sensor
[good lighting]: https://support.oculus.com/articles/headsets-and-accessories/using-your-headset/turn-off-tracking/
