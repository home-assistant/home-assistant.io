---
title: "Oculus Quest Meet the Smart Home!"
description: "Automate your home based on how you use your Quest!"
date: 2022-01-07 00:00:00
date_formatted: "January 07, 2022"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2022-01-android-quest/Companion.png
---


![Screenshot of the Android app](/images/blog/2022-01-android/Companion.png)

Hey Everyone! We hope you all had a great new years and holidays spent with the family! This past holiday season had some pretty cool toys going around. Cool toys to us means more things to tinker with. One of the most popular gifts this year was no doubt the Oculus Quest and to be honest how could it not be right? Naturally, working on the Android app some of us wondered how does the app perform on such a device? Well it actually works pretty well and you can start building automations based on your usage today!

<a href="https://sidequestvr.com/app/6427/home-assistant" style="display:inline-block"><img width="200" class="download-badge" alt="Get it on SideQuest" src="https://sidequestvr.com/assets/images/branding/Get-it-on-SIDEQUEST.png" style='box-shadow:none;border:0'></a>


## Hello Sidequest!

Wait Sidequest? What is that? Why is this app not on the Oculus Quest Store or even App Lab!? Those are some good questions so lets address why we are on Sidequest first and not in App Lab or the Quest Store itself. To start with we are not a VR ready app, the app found on Sidequest is actually the minimal [version] of the Android app. Why the minimal version? Well the Quest does run Android however, its a pretty heavily modified fork with no Google services. There are no widgets, no shortcuts and does not even allow standard notifications. As some of you may be aware Meta had only recently started to approve of what we qualify as a 2D app. We have begun creating a new version of the app specifically to meet the Quest Store requirements but it will take some time for us to get things to pass inspection. So while we are waiting we didn't want to hold back on releasing something so we can get more feedback and start getting more data for everyone to automate things.

![Screenshot of App on Quest](/images/blog/2022-01-android/app_on_quest.png)

Now you may be asking yourself but do I really need this installed? What am I going to gain from this? Well thats not easy for us to answer for every user because we all have different needs, not everyone has the same room they play in or the same devices in their smart home. By having the android app installed on your Quest you gain access to the many sensors offered by the app. Some of them are actually pretty useful. For example, our [interactive sensor] updates as soon as the screen comes on which is pretty much when you are wearing the headset. By using this sensor you could make sure your lights are on bright enough to allow room tracking to be more consistent because it does indeed require [good lighting].

There are over 40 sensors to include in your automations, with plans to include more sensors as we find more data to send back to your Home Assistant server. Ever play on your headset until it dies and then sit around waiting for it to charge up? Using the battery sensors you can get notified when your headset is fully charged and ready to play that next round. Keep the music on in the background while you are playing? Automate your media player volume level based on your microphone being muted. Its not all about sensors either, you may be wondering who rang the doorbell and if its important enough to take off the headset. Just open up the app and you'll be able to see who is there and even talk back if your device supports it!

We are just getting started with things but as we have discovered our users are really good at finding more unique use cases that we didn't even consider. So get your device [setup with Sidequest], [install the app] and start automating today!

## 2022.1 Release

Well we can't just make a post like this and ignore the new release that just went out the other day without highlighting it right?! While the 2022.1 release may not be as jam packed as 2021.12 we do still have some neat features to cover.

*  A new sensor to determine if your devices [work profile] is active by [zmarties]. This sensor will update as soon as a state change is detected allowing you to make unique automations based on the profile being active.
*  [dshokouhi] has added a new sensor allowing you to see what the [Last Used App] was. Pair this new sensor with the Quest and you can make specific automations based on what game you are currently playing!

![Screenshot of Last Used App](/images/blog/2022-01-android/last_used_app.png)

*  [jpelgrom] has worked on our websocket implementation to finally bring in areas to the app. Device controls is the first feature to get area support so you can easily add entities from areas. The area will also be shown in the device control button itself. Be on the lookout for more area support in other parts of the app as it should make finding entities a lot easier.
*  [JBassett] has also made more progress on the websocket implementation by bringing in better error handling to prevent the application from crashing and producing a lot of unneccessary errors.
*  For the Wear OS app [SkechyWolf] has added support for the back button to properly function and exit the app.

A big thank you to all of our contributors and users for bringing in awesome features and great feedback/bugs. We look forward to improving the android app even further in 2022! As always please remember to add your feature requests and bugs to GitHub.

## Changelog

- 2022.1.1 - https://github.com/home-assistant/android/releases/tag/2022.1.1


[zmarties]: https://github.com/zmarties
[dshokouhi]: https://github.com/dshokouhi
[JBassett]: https://github.com/JBassett
[SkechyWolf]: https://github.com/SkechyWolf
[jpelgrom]: https://github.com/jpelgrom
[setup with Sidequest]: https://sidequestvr.com/setup-howto
[install the app]: https://sidequestvr.com/app/6427/home-assistant
[work profile]: https://companion.home-assistant.io/docs/core/sensors#work-profile-sensor
[Last Used App]: https://companion.home-assistant.io/docs/core/sensors#last-used-app-sensor
[version]: https://companion.home-assistant.io/docs/core/android-flavors
[interactive sensor]: https://companion.home-assistant.io/docs/core/sensors#interactive-sensor
[good lighting]: https://support.oculus.com/articles/headsets-and-accessories/using-your-headset/turn-off-tracking/
