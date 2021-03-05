---
title: "Home Assistant Companion Android App 2021 Q1 Releases"
description: "2021 Q1 Updates for the Home Assistant Companion Android App"
date: 2021-03-04 00:00:00
date_formatted: "March 4, 2021"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2021-03-06-android-q1-releases/Companion.png
---

Hey everyone! It has been quite some time since we last provided an update on all that is new with the Android app. You may have already noticed that we had changed our release versioning to match that of Home Assistant Core. In fact, we will be attempting to align our releases more closely to Core releases. This way we can start supporting brand new features quickly, like the recently released [My Home Assistant](https://my.home-assistant.io).

## Security Check

As of Home Assistant Core 2021.1.5 some [security vulnerabilities](https://www.home-assistant.io/blog/2021/01/23/security-disclosure2/) were fixed and it is very critical that all users update their instances to at least this version. The app will now do a check every 24 hours to ensure that the instance is at least on the release mentioned in the security alert. This check will be updated anytime a new security alert is issued.

## Location Disabled Check

Certain app features that depend on the connected WiFi network (SSID), require the location permission to not only be granted to the app, but also have it enabled on the device. Without this, the app is unable to read the connected SSID, impacting usage of the Internal URL and any WiFi based sensors. Previously, the application would continue to function and silently fail while showing bad data for the sensors. Although the application still worked, certain parts were found to be buggy as a result of the silent failure.

Starting in android-2021.1, the app was showing a prompt before a user was able to interact with the Home Assistant frontend. We received feedback that users found this pop-up to be too intrusive. Starting `android-2021.2`, this pop-up has been converted to a persistent Android notification with its own notification channel. This allows the user to fully control how it is displayed on the device, including turning the channel off. The new channel name for this notification is `Location disabled`.

<p class='img'>
<img src='/images/blog/2021-03-06-android-q1-releases/location_disabled.png' alt='Screenshot of the location disabled notification'></a>
Screenshot of the location disabled notification.
</p>

## High Accuracy Mode

High accuracy mode is a new feature in android-2021.2 to allow users to get much faster location updates at the cost of additional battery drain. Background location updates typically get reported every 30 seconds to a few minutes. This new feature allows the user to specify the update interval that defaults to every 5 seconds. When enabled, a persistent notification will be displayed containing some location data. This feature is an enhancement to the Background Location sensor and you can access it from the sensor settings screen. You can also control this feature via a new notification command to enable/disable it on the fly. You can learn more about this feature in the [documentation](https://companion.home-assistant.io/docs/core/location#high-accuracy-mode).

<p class='img'>
<img src='/images/blog/2021-03-06-android-q1-releases/high_accuracy.png' alt='Screenshot of the high accuracy mode notification'></a>
Screenshot of the high accuracy mode notification.
</p>

## New Sensors

We have several new sensors to welcome to the app, all of which are disabled by default:

- [Active Notifications](https://companion.home-assistant.io/docs/core/sensors#active-notification) - The total count of active notifications visible to the user. Attributes will include all notification data.

- [App Data Sensors](https://companion.home-assistant.io/docs/core/sensors#app-data-sensors) - Sensors to determine how much data the app has used since the last device reboot.

- [App Importance Sensor](https://companion.home-assistant.io/docs/core/sensors#app-importance-sensor) - A sensor to determine if the app is in the `foreground`, `background` or any other importance level.

- [App Memory Sensor](https://companion.home-assistant.io/docs/core/sensors#app-memory-sensor) - A sensor to determine how much memory is used by the app.

- [App Usage sensors](https://companion.home-assistant.io/docs/core/sensors#app-usage-sensors) - Sensors to help users troubleshoot if the app is considered inactive and the current app standby bucket.

- [BLE Transmitter Sensor](https://companion.home-assistant.io/docs/core/sensors#bluetooth-sensors) - A sensor to control whether or not the app is actively sending out a beacon to provide support for services like [Room Assistant](https://www.room-assistant.io/).

- [Sleep Sensors](https://companion.home-assistant.io/docs/core/sensors#activity-sensors) - Sensors based on a new API provided by Google for devices running the full version. These sensors can be used to determine if the user is sleeping or not. The sensors update when we get data from Google so don't expect them to update as soon as you fall asleep.


## Notification Enhancements

There have been several additions and improvements to notifications:

- Controlling Bluetooth
- Broadcast intent command has been updated to allow the user to send intent extras
- A command to launch activities, see [below](#intents-and-activities) for more details
- A new command to launch the application to any dashboard or view without needing to click on anything
- A new actionable notification type `REPLY` which will add a reply button to the notification and the response will be sent back in the `mobile_app_notification_action` event
- A command to control whether or not the BLE transmitter sensor is enabled

## Intents and Activities

We have made several enhancements to further integrate Home Assistant into the Android ecosystem. First and foremost, the [Last Update Trigger sensor](https://companion.home-assistant.io/docs/core/sensors#last-update-trigger-sensor) was updated in 2021.2 to allow users to register for any intent that they want. [Intents](https://developer.android.com/guide/components/intents-filters) are a way for applications to communicate with another so they can send data back and forth. In fact the app itself uses many intents provided by Android, which is why certain sensors update faster than others. This means that users can now get data from apps that have an Intent API. You will need to know the intent action string that you wish to register for. Once the intent is received the application will fire an event to Home Assistant as `android.intent_received` along with the intent action and any extra data provided by the intent. Personally, I am using my Mi Band 5 with the [Notify for Mi Band](https://play.google.com/store/apps/details?id=com.mc.miband1) application that sends out intents for when I have fallen asleep, my step count or even my heart rate.

A new notification command was added to allow the user to launch an activity on their android device. This command requires a new permission to be granted in order to launch activities from the background, Draw Over Other Apps. The first attempt to use this notification will take the user to the permission page so the user can grant proper access. It is important to note that if the app is not considered active then this permission page will not show up due to missing permissions. Try to test this with the app open or you can grant the permission manually in your device settings. There are lots of use cases for this feature such as being able to launch Google Maps driving mode or even setting an alarm on your device.

Unfortunately, it is not so straightforward to determine which intents and activities are supported by applications. You really need to know what to look for and there is not much in terms of documentation here from applications. Try reaching out to the developers of your favorite apps to see if they have any intents to consume. We have provided several live examples in the [companion documentation](https://companion.home-assistant.io/docs/notifications/notification-commands#activity). I have also started a new thread in the forums to maintain a list of all that we can find [here](https://community.home-assistant.io/t/android-intents-sending-receiving-list-starting-activities-too/276192). I will be trying to keep the first post as up to date as possible.

## Other Enhancements

We have also spent time making improvements to all other areas too:

- Support for links from [My Home Assistant](https://my.home-assistant.io)
- Power menu fixes and enhancements including support for vacuum entities
- Haptic feedback support in the frontend
- Overriding certain URL types to launch an application or an intent from the frontend
- 3 finger swipe down gesture to trigger the [Quick Bar](https://www.home-assistant.io/docs/tools/quick-bar/)

<p class='img'>
<img src='/images/blog/2021-03-06-android-q1-releases/3_finger_swipe_gesture.gif' alt='3 finger swipe gesture to trigger Quick Bar' height='550'></a>
3 finger swipe gesture to trigger Quick Bar
</p>

Big thank you to everyone involved. Please keep those bug reports and feature requests coming!

## Changelogs

- 2021.1.1 - https://github.com/home-assistant/android/releases/tag/2021.1.1
- 2021.1.2 - https://github.com/home-assistant/android/releases/tag/2021.1.2
- 2021.2.1 - https://github.com/home-assistant/android/releases/tag/2021.2.1
- 2021.2.2 - https://github.com/home-assistant/android/releases/tag/2021.2.2
- 2021.3.1 - https://github.com/home-assistant/android/releases/tag/2021.3.1
