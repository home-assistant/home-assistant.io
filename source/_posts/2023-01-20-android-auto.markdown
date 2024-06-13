---
title: "Home Assistant coming for your car!"
description: "Today we're launching Home Assistant for Android Auto allowing you to control your home and navigate to anything with a location."
date: 2023-01-20 00:00:00
date_formatted: "January 20, 2023"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2023-01-20-android-auto/Companion.png
---


![Screenshot of Companion](/images/blog/2023-01-20-android-auto/Companion.png)

Hey everyone today we would like to announce that development has begun on [Android Auto]. In December, Google has [released] an update to Android Auto and are finally accepting IoT apps into the Play Store. As you guessed the team wanted to get features added immediately. Check out the new upcoming features the team has already started to add!

<i>These features are currently available in [our beta channel] and will be released to stable in the next 2 weeks.</i>

<lite-youtube videoid="Ngnd6vHb2VU" videotitle="Home Assistant Android Auto"></lite-youtube>

![Screenshot inside car](/images/blog/2023-01-20-android-auto/android_auto_garage.jpg)

Once you launch the app from your head unit you will have easy access to devices like your garage door, lights, locks and even scenes.

![Screenshot of Domains](/images/blog/2023-01-20-android-auto/android_auto_domains.png)

Tapping on a category allows you to see its entities and their state (with instant updates!). There are also simple touch controls to do things like opening the garage door before heading out.

![Screenshot of Entity Control](/images/blog/2023-01-20-android-auto/android_auto_entity_control.png)

In addition to selecting a domain you can also navigate to anything in Home Assistant that has a location, like persons, devices or sensors.

![Screenshot of Navigation](/images/blog/2023-01-20-android-auto/android_auto_navigation.png)

We have also added a new [binary sensor] allowing you to automate when you are in the car and connected to the head unit. There is an additional attribute for the type of connection as well.

![Screenshot of Sensor](/images/blog/2023-01-20-android-auto/android_auto_sensor.png)


A big thank you to [Jbassett] and [jpelgrom] for their contributions to the new Android Auto app. We look forward to the continued improvements to this new experience.


[JBassett]: https://github.com/JBassett
[jpelgrom]: https://github.com/jpelgrom
[released]: https://developer.android.com/docs/quality-guidelines/car-app-quality?category=iot#dec-22
[Android Auto]: https://www.android.com/auto
[GitHub]: https://github.com/home-assistant/android
[binary sensor]: https://companion.home-assistant.io/docs/core/sensors#android-auto
[our beta channel]: https://play.google.com/apps/testing/io.homeassistant.companion.android
