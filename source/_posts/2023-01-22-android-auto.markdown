---
title: "Home Assistant coming for your car!"
description: "Android Auto"
date: 2023-01-19 00:00:00
date_formatted: "January 19, 2023"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2023-01-22-android-auto/Companion.png
---


![Screenshot of Companion](/images/blog/2023-01-22-android-auto/Companion.png)

Hey everyone today we would like to announce that development has begun on [Android Auto]. In December, Google has [released] an update to Android Auto and are finally accepting IoT apps into the Play Store. As you guessed the team wanted to get features added immediately. Check out the new upcoming features the team has already started to add!

<lite-youtube videoid="Ngnd6vHb2VU" videotitle="Home Assistant Android Auto"></lite-youtube>

Once you launch the app from your head unit you will see a list of domains to choose from. The following domains will appear in the home screen allowing for simple controls such as on & off.

- `button`
- `cover`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`

![Screenshot of Domains](/images/blog/2023-01-22-android-auto/android_auto_domains.png)

After selecting the domain you will see all entities within that domain. From here you can view the state (with instant updates) and also have simple touch controls to open the garage door before you head out.

![Screenshot of Entity Control](/images/blog/2023-01-22-android-auto/android_auto_entity_control.png)

In addition to selecting a domain you can also navigate to any `person`, `device_tracker` or `sensor` that has GPS coordinates.

![Screenshot of Navigation](/images/blog/2023-01-22-android-auto/android_auto_navigation.png)

We have also added a new [binary sensor] allowing you to automate when you are in the car and connected to the headset. There is an additional attribute for the type of connection as well.

![Screenshot of Sensor](/images/blog/2023-01-22-android-auto/android_auto_sensor.png)


A big thank you to [Jbassett] and [jpelgrom] for their contributions to the new Android Auto app. We look forward to the continued improvements to this new experience. If you would like to checkout the features today make sure to join the [beta] and provide us with feedback on [GitHub].


[JBassett]: https://github.com/JBassett
[jpelgrom]: https://github.com/jpelgrom
[released]: https://developer.android.com/docs/quality-guidelines/car-app-quality?category=iot#dec-22
[Android Auto]: https://www.android.com/auto
[GitHub]: https://github.com/home-assistant/android
[binary sensor]: https://companion.home-assistant.io/docs/core/sensors#android-auto
[beta]: https://play.google.com/apps/testing/io.homeassistant.companion.android
