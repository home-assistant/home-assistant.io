---
title: "Home Assistant Companion Apps: New and Upcoming Features"
description: "What's new and what's in the works with the companion apps"
date: 2020-08-05 00:00:00
date_formatted: "August 5, 2020"
comments: false
author: Robbie Trencheny
author_twitter: robbie
categories: Announcements
og_image: /images/blog/2020-08-05-mobile-apps-new-features/Companion-new-upcoming.png
---

Hi, it's been a while since we let you know about all the great things you can do with the Home Assistant Companion Apps for Android and iOS, so let's rectify that now as there are so many exciting updates. Before we get started on that though, iOS users should take a moment to read [this blog post](/blog/2020/07/28/ios-app-migration) which has some important information about a small change coming up.

## A note on privacy

Currently we use Google's Firebase notification service for sending notifications to your device and also for tracking crashes. We did this because of simplicity, due to how notifications work on iOS we can't use just any server to send notifications, in fact there is a pretty narrow choice. Using Firebase allowed use to provide notifications at no cost to you! However, many people were uncomfortable about this and would prefer an app that did not rely on Google's servers. Well we hear you and we are actively looking at moving to other providers. While we have not completed this work yet, we just wanted to let you know it is something that is being actively developed and hopefully we will have more news very soon. 

## Android minimal app

On a related note, we are delighted to say we now offer a way to install a minimal version of the Android app that is completely free of any reliance on Google. 
**MORE NEEDED FROM ANDROID TEAM**.

## What's New(ish)

The short answer is lots! The Android and iOS apps are developed by separate teams so while the features are similar, they are not identical and do not follow a common road map.

### iOS

Firstly, we should say a hello to Zac ([@zacwest](https://github.com/zacwest)) who has joined the iOS team and contributed a huge amount of code in the last couple of months. In fact, Zac has rewritten much of the underlying code of the app in that time, so while it may look much the same, behind the scenes it's almost a new app! Some features that are now in the iOS app are:

#### Improvements to location

Whether it is to turn on the lights when you get home at night, or send a someone a notification that you're leaving work and how long the journey should take, we know that this is what a lot of people use the app for the most and we also know the performance has not been 100 % and that changes in recent versions of iOS seem to have made this work. There have been a huge number of changes to work around these issues (unfortunately Apple's CoreLocation framework is something of a black box), we now sanity check the location data before sending it to Home Assistant, checking if the accuracy is acceptable or if an update from a minute ago has better accuracy. We also try and get a new update when accuracy is bad. While we still use significant location changes (such as changing cell tower) to wake the app up from the background, we now automatically discard the data they provide and attempt to get a higher accuracy GPS location.

#### More frequent sensor updates while using the app

A lot of people have asked for the sensors to be updated more frequently. The problem we have is while the app is in the background it is asleep as part of iOS's efforts to preserve battery. However, while you're using the app it should be able to send data frequently. You can now set a desired frequency of sensor updates while you have the app open. This can be as slow as every hour or as fast as every 20 seconds! Hopefully this will be a huge improvement for people using iPads as wall-mounted kiosks.

#### No more duplicate integrations

Previously when you removed and reinstalled the app you would get a new `..._2` integration in Home Assistant along with a new set of sensors like `sensor.freds_iphone_2`. This was a pain! Especially for our amazing beta testers who often went through the app's onboarding process several times in a day to check for bugs (THANK YOU!). Now the app registers its unique ID with Home Assistant, this means in most cases when you reinstall or reset up the app it should just pick and use the old integration and entities.

#### A new way to include live steams in notifications

You can now include a live HLS stream in your notifications.

#### Better theme and color matching

We now support themes that specify colors in formats other than hex. You can use rgb, hsl or even HTML color names. Also, there is no need to call the `frontend.set_theme` service any more. The app now actively checks the CSS of Home Assistant and updates itself to match in real time!

#### Pick up where you left off

When you open the app it will now remember where you were previously and open (and refresh) that same page.

#### Zoom pages

If you struggle to read Home Assistant on your phone, you can now manually set the text zoom level to anywhere between 50 and 200 % of the normal value.
